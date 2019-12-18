package se.seqarc.samplersequencer.category;

import org.springframework.stereotype.Service;

import java.util.List;

public interface CategoryService {

    public abstract CategoryDTO createCategory(String category) throws CategoryAlreadyExistsException;

    public abstract List<CategoryDTO> getAllCategories();

    public abstract CategoryDTO getCategoryByCategory(String category) throws CategoryNotFoundException;

}
