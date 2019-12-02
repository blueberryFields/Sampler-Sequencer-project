package se.seqarc.samplersequencer.category;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Category {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    @Column(unique=true)
    private String category;

    public Category(CategoryDTO categoryDTO) {
        this.id = categoryDTO.getId();
        this.category = categoryDTO.getCategory();
    }
}
