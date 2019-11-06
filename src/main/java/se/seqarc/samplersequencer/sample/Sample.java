package se.seqarc.samplersequencer.sample;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Entity
@Getter
@Setter
@NoArgsConstructor
public class Sample {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    private String name;
    private double length;
    private String format;
    private String category;
    private String subCategory;

    public Sample(SampleDTO sampleDTO) {
        this.id = sampleDTO.getId();
        this.name = sampleDTO.getName();
        this.length = sampleDTO.getLength();
        this.format = sampleDTO.getFormat();
        this.category = sampleDTO.getCategory();
        this.subCategory = sampleDTO.getSubCategory();
    }

}
