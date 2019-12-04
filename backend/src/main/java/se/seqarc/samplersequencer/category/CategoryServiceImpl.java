package se.seqarc.samplersequencer.category;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public CategoryDTO createCategory(String category) throws CategoryAlreadyExistsException {
        Optional<Category> result = categoryRepository.findCategoryByCategory(category);
        if (result.isPresent()) {
            throw new CategoryAlreadyExistsException();
        } else {
            Category newCategory = new Category();
            newCategory.setCategory(category);
            return new CategoryDTO(categoryRepository.save(newCategory));
        }
    }

    @Override
    public List<CategoryDTO> getAllCategories() {
        List<Category> resultList = (List<Category>) categoryRepository.findAll();
        return convertCategoryListToCategoryDTOList(resultList);
    }

    private List<CategoryDTO> convertCategoryListToCategoryDTOList(List<Category> categoryList) {
        List<CategoryDTO> categoryDTOList = new ArrayList<>();
        for (Category category : categoryList) {
            categoryDTOList.add(new CategoryDTO(category));
        }
        return categoryDTOList;
    }
}
