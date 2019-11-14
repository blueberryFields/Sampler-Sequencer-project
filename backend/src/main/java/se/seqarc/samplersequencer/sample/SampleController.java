package se.seqarc.samplersequencer.sample;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import se.seqarc.samplersequencer.samplestorage.SampleStorageService;

@RestController
public class SampleController {

    private final SampleService sampleService;
    private final SampleStorageService sampleStorageService;

    public SampleController(SampleService sampleService, SampleStorageService sampleStorageService) {
        this.sampleService = sampleService;
        this.sampleStorageService = sampleStorageService;
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

    @PostMapping("/")
    public String handleFileUpload(@RequestParam("file") MultipartFile file,
                                   RedirectAttributes redirectAttributes) {

        sampleStorageService.store(file);
        redirectAttributes.addFlashAttribute("message",
                "You successfully uploaded " + file.getOriginalFilename() + "!");

        return "redirect:/";
    }



}
