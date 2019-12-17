package se.seqarc.samplersequencer.sample;

import org.apache.commons.math3.util.Precision;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import se.seqarc.samplersequencer.category.Category;
import se.seqarc.samplersequencer.category.CategoryNotFoundException;
import se.seqarc.samplersequencer.category.CategoryRepository;
import se.seqarc.samplersequencer.storage.StorageService;
import se.seqarc.samplersequencer.storage.UploadLocation;
import se.seqarc.samplersequencer.user.User;
import se.seqarc.samplersequencer.user.UserNotFoundException;
import se.seqarc.samplersequencer.user.UserRepository;

import javax.sound.sampled.AudioFormat;
import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.UnsupportedAudioFileException;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Paths;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SampleServiceImpl implements SampleService {

    private final SampleRepository sampleRepository;
    private final CategoryRepository categoryRepository;
    private final StorageService storageService;
    private final UserRepository userRepository;

    public SampleServiceImpl(SampleRepository sampleRepository, CategoryRepository categoryRepository, StorageService sampleStorageService, UserRepository userRepository) {
        this.sampleRepository = sampleRepository;
        this.categoryRepository = categoryRepository;
        this.storageService = sampleStorageService;
        this.userRepository = userRepository;
    }

    @Override
    public SampleDTO uploadSample(MultipartFile multipartFile, String name, String category, String username) throws NoSuchAlgorithmException, IOException, CategoryNotFoundException, UnsupportedAudioFileException, FileNotSupportedException, SampleProcessingException, UserNotFoundException {
        // Store file temporarily
        String filename = storageService.store(multipartFile, UploadLocation.TEMPSAMPLE);
        // Check fileExtension to see if format is supported
        String fileExtension = storageService.getFileExtension(filename, UploadLocation.TEMPSAMPLE);
        // Load file
        File file = storageService.load(filename, UploadLocation.TEMPSAMPLE);
        if (!fileExtension.equals("wav") && !fileExtension.equals("mp3")) {
            storageService.delete(file, UploadLocation.TEMPSAMPLE);
            throw new FileNotSupportedException(fileExtension);
        }
        // Process sample, convert to mono Wave with low bitrate, and delete the old file
        File processedFile = processSample(file);
        storageService.delete(file, UploadLocation.TEMPSAMPLE);
        //  generate checksum
        String checksum = getFileChecksum(MessageDigest.getInstance("MD5"), processedFile);
        // Check if file already exists, and if not add it and rename to checksum, also get duration of sample
        Optional<Sample> result = sampleRepository.findFirstByChecksum(checksum);
        double duration = 0;
        if (result.isPresent()) {
            storageService.delete(processedFile, UploadLocation.TEMPSAMPLE);
            duration = result.get().getDuration();
        } else {
            duration = Precision.round(calculateWaveDurationInSeconds(processedFile), 2);
            storageService.moveAndRenameSample(processedFile, checksum);
        }
        return create(name, category, checksum, duration, username);
    }

    public File processSample(File file) throws SampleProcessingException {
        File outputFile = Paths.get(String.valueOf(storageService.getRootLocation(UploadLocation.TEMPSAMPLE).resolve("temp.wav"))).toFile();
        try {
            // create the ffmpeg process command to run.
            Process ffmpeg = new ProcessBuilder(
                    "/usr/bin/ffmpeg",
                    "-i", file.getAbsolutePath(),
                    "-acodec", "pcm_s16le",
                    "-ar", "22050",
                    "-ac", "1",
                    outputFile.toString())
                    .start();
            // this blocks until the execute is complete.
            ffmpeg.waitFor();
            if (0 != ffmpeg.exitValue()) {
                // a non-zero exit value means something blew up
//                log.error("ffmpeg failed! Exit value: {}", ffmpeg.exitValue());
                System.out.println("ffmpeg failed! Exit value: {}" + ffmpeg.exitValue());
                throw new SampleProcessingException("ffmpeg failed! Exit value: " + ffmpeg.exitValue());
            }
        } catch (IOException e) {
//            log.error("Unable to run ffmpeg", e);
            throw new SampleProcessingException("Unable to run ffmpeg", e);
        } catch (InterruptedException e) {
            // you could potentially get this thrown from the waitFor() call.
//            log.error("Interupted!", e);
            System.out.println("Interupted!!!");
            throw new SampleProcessingException("ffmpeg was interupted!", e);
        }
        return outputFile;
    }

    private static String getFileChecksum(MessageDigest digest, File file) throws IOException {
        //Get file input stream for reading the file content
        FileInputStream fis = new FileInputStream(file);
        //Create byte array to read data in chunks
        byte[] byteArray = new byte[1024];
        int bytesCount = 0;
        //Read file data and update in message digest
        while ((bytesCount = fis.read(byteArray)) != -1) {
            digest.update(byteArray, 0, bytesCount);
        }
        //close the stream; We don't need it now.
        fis.close();
        //Get the hash's bytes
        byte[] bytes = digest.digest();
        //This bytes[] has bytes in decimal format;
        //Convert it to hexadecimal format
        StringBuilder sb = new StringBuilder();
        for (byte aByte : bytes) {
            sb.append(Integer.toString((aByte & 0xff) + 0x100, 16).substring(1));
        }
        //return complete hash
        return sb.toString();
    }

    @Override
    public double calculateWaveDurationInSeconds(File file) throws IOException, UnsupportedAudioFileException {
        AudioInputStream audioInputStream = null;
        audioInputStream = AudioSystem.getAudioInputStream(file);
        AudioFormat format = audioInputStream.getFormat();
        long audioFileLength = file.length();
        int frameSize = format.getFrameSize();
        float frameRate = format.getFrameRate();
        return (audioFileLength / (frameSize * frameRate));
    }

    @Override
    public SampleDTO create(String name, String category, String checksum, double duration, String username) throws CategoryNotFoundException, UserNotFoundException {
        Sample sample = new Sample();
        sample.setName(name);
        // Check if category exists, else throw exception
        Optional<Category> result = categoryRepository.findCategoryByCategory(category);
        sample.setCategory(result.orElseThrow(() -> new CategoryNotFoundException(category)));
        sample.setDuration(duration);
        sample.setChecksum(checksum);
        Optional<User> userResult = userRepository.findOneByUsername(username);
        sample.setUser(userResult.orElseThrow(() -> new UserNotFoundException(username)));
        return new SampleDTO(sampleRepository.save(sample));
    }


    @Override
    public SampleDTO getSampleById(Long id) throws Exception {
        Optional<Sample> result = sampleRepository.findById(id);
        Sample sample = result.orElseThrow(SampleNotFoundException::new);
        return new SampleDTO(sample);
    }

    @Override
    public List<SampleDTO> getSamplesByCategory(String category) throws Exception {
        //Check if category exists, else throw exception
        Optional<Category> result = categoryRepository.findCategoryByCategory(category);
        Optional<List<Sample>> resultList = sampleRepository.findSamplesByCategory(result.orElseThrow(() -> new CategoryNotFoundException(category)));
        return convertSampleListToSampleDTOList(resultList.orElseThrow(() -> new SampleNotFoundException("No samples in that category: " + category)));
    }

    @Override
    public List<SampleDTO> search(String searchphrase) throws SampleNotFoundException {
        Optional<List<Sample>> resultList = sampleRepository.findByNameContainingIgnoreCase(searchphrase);
        return convertSampleListToSampleDTOList(resultList.orElseThrow(SampleNotFoundException::new));
    }

    @Override
    public List<SampleDTO> searchAndFilterByCategory(String searchphrase, String category) throws SampleNotFoundException, CategoryNotFoundException {
        Optional<Category> result = categoryRepository.findCategoryByCategory(category);
        Optional<List<Sample>> resultList = sampleRepository.findByNameContainingIgnoreCaseAndCategory(searchphrase, result.orElseThrow(() -> new CategoryNotFoundException(category)));
        return convertSampleListToSampleDTOList(resultList.orElseThrow(SampleNotFoundException::new));
    }

    private List<SampleDTO> convertSampleListToSampleDTOList(List<Sample> sampleList) {
        List<SampleDTO> sampleDTOList = new ArrayList<>();
        for (Sample sample : sampleList) {
            sampleDTOList.add(new SampleDTO(sample));
        }
        return sampleDTOList;
    }
}
