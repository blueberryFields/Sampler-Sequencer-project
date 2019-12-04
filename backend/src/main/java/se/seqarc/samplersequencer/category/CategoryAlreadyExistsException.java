package se.seqarc.samplersequencer.category;

public class CategoryAlreadyExistsException extends Exception {

    public CategoryAlreadyExistsException() {
        super("Category already exists");
    }

    public CategoryAlreadyExistsException(String alreadyExistingCategory) {
        super("Category already exists: " + alreadyExistingCategory);
    }
}
