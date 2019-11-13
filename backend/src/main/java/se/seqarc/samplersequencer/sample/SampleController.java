package se.seqarc.samplersequencer.sample;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class SampleController {

    private final SampleService sampleService;


    public SampleController(SampleService sampleService) {
        this.sampleService = sampleService;
    }

    @GetMapping("/getsamplebyid/{id}")
    public ResponseEntity<SampleDTO> getSampleById(@PathVariable Long id) {
        try {
            return new ResponseEntity<>(sampleService.getSample(id), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Sample not found");
        }
    }
}
