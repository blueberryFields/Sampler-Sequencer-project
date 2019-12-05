package se.seqarc.samplersequencer.sample;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import se.seqarc.samplersequencer.category.Category;

import javax.persistence.*;
import javax.validation.constraints.NotNull;


@Entity
@Getter
@Setter
@NoArgsConstructor
public class Sample {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private double length;
    private String format;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    @JsonIgnore
    private Category category;
    @NotNull
    @Length(max = 32)
    private String checksum;

    public Sample(SampleDTO sampleDTO) {
        this.id = sampleDTO.getId();
        this.name = sampleDTO.getName();
        this.length = sampleDTO.getLength();
        this.format = sampleDTO.getFormat();
        this.category = new Category(sampleDTO.getCategoryDTO());
        this.checksum = sampleDTO.getChecksum();
    }

}
