package se.seqarc.samplersequencer.storage;

import org.springframework.web.multipart.MultipartFile;

public interface StorageService {

    void store(MultipartFile file, String type);

}
