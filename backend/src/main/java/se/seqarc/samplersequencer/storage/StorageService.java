package se.seqarc.samplersequencer.storage;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Path;

public interface StorageService {

    void moveAndRenameSample(File file, String checksum);

    void delete(File file, UploadLocation uploadLocation);

    File load(String filename, UploadLocation type);

    String store(MultipartFile file, UploadLocation type);

    String getFileNameFromFile(File file);

    String getFileNameFromMultipartFile(MultipartFile file);

    String getFileExtension(String filename, UploadLocation uploadLocation);

    Path getRootLocation(UploadLocation uploadLocation);
}
