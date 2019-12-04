package se.seqarc.samplersequencer.category;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/category")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping("/create")
    public ResponseEntity<CategoryDTO> createCategory(@RequestParam(name = "category") String category) {
        try {
            return new ResponseEntity<>(categoryService.createCategory(category), HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.CONFLICT, "There is already a category called: " + category);
        }
    }

    @GetMapping("/findall")
    public ResponseEntity<List<CategoryDTO>> getSampleByCategory() {
        return new ResponseEntity<>(categoryService.getAllCategories(),  HttpStatus.OK);
    }
}
