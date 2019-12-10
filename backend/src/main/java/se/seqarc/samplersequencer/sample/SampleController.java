package se.seqarc.samplersequencer.sample;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import se.seqarc.samplersequencer.category.CategoryNotFoundException;
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

//    @GetMapping("/findbycategory/{category}")
//    public ResponseEntity<List<SampleDTO>> findSampleByCategory(@PathVariable String category) {
//        try {
//            return new ResponseEntity<>(sampleService.getSamplesByCategory(category), HttpStatus.OK);
//        } catch (Exception e) {
//            e.printStackTrace();
//            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
//        }
//    }

//    @GetMapping("/search/{searchphrase}")
//    public ResponseEntity<List<SampleDTO>> searchForSample(@PathVariable String searchphrase, @RequestParam String category) {
//        if (category.isEmpty()) {
//            try {
//                return new ResponseEntity<>(sampleService.search(searchphrase), HttpStatus.OK);
//            } catch (Exception e) {
//                e.printStackTrace();
//                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No samples found with searchphrase: " + searchphrase);
//            }
//        } else {
//            try {
//                return new ResponseEntity<>(sampleService.searchAndFilterByCategory(searchphrase, category), HttpStatus.OK);
//            } catch (SampleNotFoundException e) {
//                e.printStackTrace();
//                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No samples found with searchphrase: " + searchphrase);
//            } catch (CategoryNotFoundException e) {
//                e.printStackTrace();
//                throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
//            }
//        }
//    }

    @GetMapping("/filteredsearch")
    public ResponseEntity<List<SampleDTO>> filteredSearch(@RequestParam String searchphrase, @RequestParam String category) {
        if (searchphrase.isEmpty() && category.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You must supply at least on off these params: searchprase or category");
        } else if (!searchphrase.isEmpty() && category.isEmpty()) {
            return searchSample(searchphrase);
        } else if (searchphrase.isEmpty()) {
            return findSampleByCategory(category);
        } else {
            return findSampleByCategoryAndSearchphrase(searchphrase, category);
        }
    }

    private ResponseEntity<List<SampleDTO>> findSampleByCategoryAndSearchphrase(@RequestParam String searchphrase, @RequestParam String category) {
        try {
            return new ResponseEntity<>(sampleService.searchAndFilterByCategory(searchphrase, category), HttpStatus.OK);
        } catch (SampleNotFoundException e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No samples found with in category: " + category + ", with searchphrase: " + searchphrase);
        } catch (CategoryNotFoundException e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    private ResponseEntity<List<SampleDTO>> findSampleByCategory(@RequestParam String category) {
        try {
            return new ResponseEntity<>(sampleService.getSamplesByCategory(category), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    private ResponseEntity<List<SampleDTO>> searchSample(@RequestParam String searchphrase) {
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
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error uploading file: " + e.getMessage());
        }
    }


}
