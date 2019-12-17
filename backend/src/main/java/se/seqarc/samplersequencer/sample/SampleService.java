package se.seqarc.samplersequencer.sample;

import org.springframework.web.multipart.MultipartFile;
import se.seqarc.samplersequencer.category.CategoryNotFoundException;
import se.seqarc.samplersequencer.user.UserNotFoundException;

import javax.sound.sampled.UnsupportedAudioFileException;
import java.io.File;
import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.List;

public interface SampleService {

    SampleDTO uploadSample(MultipartFile file, String name, String category, String username) throws NoSuchAlgorithmException, IOException, CategoryNotFoundException, UnsupportedAudioFileException, FileNotSupportedException, SampleProcessingException, UserNotFoundException;

    SampleDTO create(String name, String category, String checksum, double duration, String username) throws CategoryNotFoundException, UserNotFoundException;

    SampleDTO getSampleById(Long id) throws Exception;

    List<SampleDTO> getSamplesByCategory(String category) throws Exception;

    List<SampleDTO> search(String searchword) throws SampleNotFoundException;

    List<SampleDTO> searchAndFilterByCategory(String searchphrase, String category) throws SampleNotFoundException, CategoryNotFoundException;

    double calculateWaveDurationInSeconds(File audioFile) throws IOException, UnsupportedAudioFileException;
}
