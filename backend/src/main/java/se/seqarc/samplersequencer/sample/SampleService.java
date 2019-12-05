package se.seqarc.samplersequencer.sample;

import org.springframework.web.multipart.MultipartFile;
import se.seqarc.samplersequencer.category.CategoryNotFoundException;

import javax.sound.sampled.UnsupportedAudioFileException;
import java.io.File;
import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.List;

public interface SampleService {

    SampleDTO uploadSample(MultipartFile file, String name, String category) throws NoSuchAlgorithmException, IOException, CategoryNotFoundException, UnsupportedAudioFileException, FileNotSupportedException;

    SampleDTO create(String name, String category, String checksum, double duration, String fileExtension) throws CategoryNotFoundException;

    SampleDTO getSampleById(Long id) throws Exception;

    List<SampleDTO> getSamplesByCategory(String category) throws Exception;

    List<SampleDTO> search(String searchword) throws SampleNotFoundException;

    double calculateWaveDurationInSeconds(File audioFile) throws IOException, UnsupportedAudioFileException;
}
