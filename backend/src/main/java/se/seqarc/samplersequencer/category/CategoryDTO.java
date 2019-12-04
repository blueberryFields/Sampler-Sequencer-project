package se.seqarc.samplersequencer.category;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CategoryDTO {

    private long id;

    private String category;

    public CategoryDTO(Category category) {
        this.id = category.getId();
        this.category = category.getCategory();
    }

}
