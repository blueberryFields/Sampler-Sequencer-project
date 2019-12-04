package se.seqarc.samplersequencer.storage;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class StorageServiceImpl implements StorageService {

   private final Path SampleRootLocation = Paths.get("src/main/resources/samples");
   private final Path ProfilePicRootLoc = Paths.get("src/main/resources/profilepictures");

    @Override
    public void store(MultipartFile file, String type) {
        Path rootLocation;
        switch (type){
            case "sample":
                rootLocation = SampleRootLocation;
                break;
            case "profilepicture":
                rootLocation = ProfilePicRootLoc;
                break;
            default:
                throw new IllegalStateException("Unexpected value: " + type);
        }
        String filename = StringUtils.cleanPath(file.getOriginalFilename());
        try {
            if (file.isEmpty()) {
                throw new StorageException("Failed to store empty file " + filename);
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
            }
        }
        catch (IOException e) {
            throw new StorageException("Failed to store file " + filename, e);
        }
    }
}
