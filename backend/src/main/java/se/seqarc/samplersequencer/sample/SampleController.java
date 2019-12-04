package se.seqarc.samplersequencer.sample;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import se.seqarc.samplersequencer.storage.StorageService;

import java.util.List;

@RestController
@RequestMapping("/sample")
public class SampleController {

    private final SampleService sampleService;
    private final StorageService sampleStorageService;

    public SampleController(SampleService sampleService, StorageService sampleStorageService) {
        this.sampleService = sampleService;
        this.sampleStorageService = sampleStorageService;
    }

    @GetMapping("/findbyid/{id}")
    public ResponseEntity<SampleDTO> getSampleById(@PathVariable Long id) {
        try {
            return new ResponseEntity<>(sampleService.getSampleById(id), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Sample not found");
        }
    }

    @GetMapping("/findbycategory/{category}")
    public ResponseEntity<List<SampleDTO>> getSampleByCategory(@PathVariable String category) {
        try {
            return new ResponseEntity<>(sampleService.getSamplesByCategory(category), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @GetMapping("/search/{searchphrase}")
    public ResponseEntity<List<SampleDTO>> searchForSample(@PathVariable String searchphrase) {
        try {
            return new ResponseEntity<>(sampleService.search(searchphrase), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No samples found with searchphrase: " + searchphrase);
        }
    }

    @PostMapping("/upload")
    public ResponseEntity<SampleDTO> handleFileUpload(@RequestParam("file") MultipartFile file, @RequestParam("name") String name, @RequestParam("category") String category) {
        try {
            return new ResponseEntity<>(sampleService.uploadSample(file, name, category), HttpStatus.CREATED);
        } catch(Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error uploading file");
        }
    }


}
