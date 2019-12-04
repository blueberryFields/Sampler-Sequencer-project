package se.seqarc.samplersequencer.sample;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import se.seqarc.samplersequencer.category.Category;
import se.seqarc.samplersequencer.category.CategoryNotFoundException;
import se.seqarc.samplersequencer.category.CategoryRepository;
import se.seqarc.samplersequencer.storage.StorageService;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SampleServiceImpl implements SampleService {

    private final SampleRepository sampleRepository;
    private final CategoryRepository categoryRepository;
    private final StorageService sampleStorageService;

    public SampleServiceImpl(SampleRepository sampleRepository, CategoryRepository categoryRepository, StorageService sampleStorageService) {
        this.sampleRepository = sampleRepository;
        this.categoryRepository = categoryRepository;
        this.sampleStorageService = sampleStorageService;
    }


    @Override
    public SampleDTO uploadSample(MultipartFile file, String name, String category) throws NoSuchAlgorithmException, IOException, CategoryNotFoundException {
//        String checksum = getFileChecksum(MessageDigest.getInstance("MD5"), (File) file);
        // Temporary
        String checksum = "test";
        System.out.println(checksum);
        sampleStorageService.store(file, "sample");
        return create(name, category, checksum);
    }

    @Override
    public SampleDTO create(String name, String category, String checksum) throws CategoryNotFoundException {
        Sample sample = new Sample();
        sample.setName(name);
        //Check if category exists, else throw exception
        Optional<Category> result = categoryRepository.findCategoryByCategory(category);
        sample.setCategory(result.orElseThrow(CategoryNotFoundException::new));
        sample.setLength(0.5);
        sample.setFormat("wav");
        sample.setChecksum(checksum);
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
        Optional<List<Sample>> resultList = sampleRepository.getSamplesByCategory(result.orElseThrow(CategoryNotFoundException::new));
        return convertSampleListToSampleDTOList(resultList.orElseThrow(SampleNotFoundException::new));
    }

    @Override
    public List<SampleDTO> search(String searchphrase) throws SampleNotFoundException {
        Optional<List<Sample>> resultList = sampleRepository.findByNameContainingIgnoreCase(searchphrase);
        return convertSampleListToSampleDTOList(resultList.orElseThrow(SampleNotFoundException::new));
    }

    private List<SampleDTO> convertSampleListToSampleDTOList(List<Sample> sampleList) {
        List<SampleDTO> sampleDTOList = new ArrayList<>();
        for (Sample sample : sampleList) {
            sampleDTOList.add(new SampleDTO(sample));
        }
        return sampleDTOList;
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
        ;

        //close the stream; We don't need it now.
        fis.close();

        //Get the hash's bytes
        byte[] bytes = digest.digest();

        //This bytes[] has bytes in decimal format;
        //Convert it to hexadecimal format
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < bytes.length; i++) {
            sb.append(Integer.toString((bytes[i] & 0xff) + 0x100, 16).substring(1));
        }

        //return complete hash
        return sb.toString();
    }

}
