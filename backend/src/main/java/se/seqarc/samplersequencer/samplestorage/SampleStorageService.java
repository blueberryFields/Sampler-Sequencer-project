package se.seqarc.samplersequencer.samplestorage;

import org.springframework.web.multipart.MultipartFile;

public interface SampleStorageService {

    void store(MultipartFile file);

}
