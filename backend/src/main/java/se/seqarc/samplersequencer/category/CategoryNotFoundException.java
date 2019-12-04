package se.seqarc.samplersequencer.category;

public class CategoryNotFoundException extends Exception {

    public CategoryNotFoundException() {
        super("Category was not found");
    }

    public CategoryNotFoundException(String missingCategory) {
        super("Category was not found: " + missingCategory);
    }
}
