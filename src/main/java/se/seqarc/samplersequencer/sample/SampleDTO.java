package se.seqarc.samplersequencer.sample;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SampleDTO {

    private Long id;
    private String name;
    private double length;
    private String format;
    private String category;
    private String subCategory;

    public SampleDTO(Sample sample) {
        this.id = sample.getId();
        this.name = sample.getName();
        this.length = sample.getLength();
        this.format = sample.getFormat();
        this.category = sample.getCategory();
        this.subCategory = sample.getSubCategory();
    }
}