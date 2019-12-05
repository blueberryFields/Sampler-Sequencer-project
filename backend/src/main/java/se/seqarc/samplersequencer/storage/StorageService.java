package se.seqarc.samplersequencer.storage;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Path;

public interface StorageService {

    void moveAndRenameSample(File file, String checksum);

    void delete(File file, UploadType uploadType);

    File load(String filename, UploadType type);

    String store(MultipartFile file, UploadType type);

    String getFileNameFromFile(File file);

    String getFileNameFromMultipartFile(MultipartFile file);

}
