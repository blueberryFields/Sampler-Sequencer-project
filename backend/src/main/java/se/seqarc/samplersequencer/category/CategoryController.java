package se.seqarc.samplersequencer.category;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import se.seqarc.samplersequencer.SamplersequencerApplication;

import java.util.List;

@RestController
@RequestMapping("/category")
public class CategoryController {

    private final Logger LOGGER= LoggerFactory.getLogger(this.getClass());

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping("/create")
    public ResponseEntity<CategoryDTO> createCategory(@RequestParam(name = "category") String category) {
        try {
            CategoryDTO categoryDTO = categoryService.createCategory(category);
            LOGGER.info("Category created: " + category);
            return new ResponseEntity<>(categoryDTO, HttpStatus.CREATED);
        } catch (Exception e) {
            LOGGER.error("Error creating category, full stacktrace follows: ", e);
            throw new ResponseStatusException(HttpStatus.CONFLICT, "There is already a category called: " + category);
        }
    }

    @GetMapping("/findall")
    public ResponseEntity<List<CategoryDTO>> getAllCategories() {
        return new ResponseEntity<>(categoryService.getAllCategories(),  HttpStatus.OK);
    }
}
