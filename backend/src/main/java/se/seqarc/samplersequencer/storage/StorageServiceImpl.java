package se.seqarc.samplersequencer.storage;

import org.apache.commons.io.FilenameUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class StorageServiceImpl implements StorageService {

    private final Path tempSampleRootLoc = Paths.get("src/main/resources/temp-samples");
    private final Path sampleRootLoc = Paths.get("src/main/resources/samples");
    private final Path ProfilePicRootLoc = Paths.get("src/main/resources/profilepictures");


    @Override
    public File load(String filename, UploadLocation uploadLocation) {
        Path rootLocation = getRootLocation(uploadLocation);
        return new File(String.valueOf(rootLocation.resolve(filename)));
    }

    @Override
    public void moveAndRenameSample(File file, String checksum, String fileExtension) {
        String filename = getFileNameFromFile(file);
        try {
            Files.move(tempSampleRootLoc.resolve(filename), sampleRootLoc.resolve(checksum + "." + fileExtension), StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            e.printStackTrace();
            throw new StorageException("Failed to move sample: " + filename, e);
        }
    }

    @Override
    public String getFileExtension(String filename, UploadLocation uploadLocation) {
        Path rootLocation = getRootLocation(uploadLocation);
        return FilenameUtils.getExtension(String.valueOf(rootLocation.resolve(filename)));
    }

    @Override
    public String getFileNameFromFile(File file) {
        return StringUtils.cleanPath(file.getName());
    }

    @Override
    public String getFileNameFromMultipartFile(MultipartFile file) {
        return StringUtils.cleanPath(file.getOriginalFilename());
    }

    @Override
    public void delete(File file, UploadLocation uploadLocation) {
        String filename = getFileNameFromFile(file);
        Path rootLocation = getRootLocation(uploadLocation);
        try {
            Files.delete(tempSampleRootLoc.resolve(filename));
        } catch (IOException e) {
            throw new StorageException("Failed to delete temporary sample: " + filename, e);
        }
    }

    @Override
    public String store(MultipartFile file, UploadLocation uploadLocation) {
        Path rootLocation = getRootLocation(uploadLocation);
        String filename = getFileNameFromMultipartFile(file);
        try {
            if (file.isEmpty()) {
                throw new StorageException("Failed to store empty file: " + filename);
            }
            if (filename.contains("..")) {
                // This is a security check
                throw new StorageException(
                        "Cannot store file with relative path outside current directory "
                                + filename);
            }
            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, rootLocation.resolve(filename),
                        StandardCopyOption.REPLACE_EXISTING);
                return filename;
            }
        } catch (IOException e) {
            throw new StorageException("Failed to store file: " + filename, e);
        }
    }

    @Override
    public Path getRootLocation(UploadLocation uploadLocation) {
        Path rootLocation;
        switch (uploadLocation) {
            case TEMPSAMPLE:
                rootLocation = tempSampleRootLoc;
                break;
            case PROFILEPIC:
                rootLocation = ProfilePicRootLoc;
                break;
            default:
                throw new IllegalStateException("Unexpected value: " + uploadLocation);
        }
        return rootLocation;
    }
}
