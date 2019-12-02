package se.seqarc.samplersequencer.sample;

import org.springframework.web.multipart.MultipartFile;
import se.seqarc.samplersequencer.category.CategoryNotFoundException;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.List;

public interface SampleService {

    public SampleDTO uploadSample(MultipartFile file, String name, String category) throws NoSuchAlgorithmException, IOException, CategoryNotFoundException;

    public SampleDTO create(String name, String category, String checksum) throws CategoryNotFoundException;

    public abstract SampleDTO getSampleById(Long id) throws Exception;

    public abstract List<SampleDTO> getSamplesByCategory(String category) throws Exception;

    public abstract List<SampleDTO> search(String searchword) throws SampleNotFoundException;
}
