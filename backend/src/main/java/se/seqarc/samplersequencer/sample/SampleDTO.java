package se.seqarc.samplersequencer.sample;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import se.seqarc.samplersequencer.category.CategoryDTO;

@Getter
@Setter
@NoArgsConstructor
public class SampleDTO {

    private Long id;
    private String name;
    private double duration;
    private String fileExtension;
    @JsonIgnore
    private CategoryDTO categoryDTO;
    private String checksum;

    public SampleDTO(Sample sample) {
        this.id = sample.getId();
        this.name = sample.getName();
        this.duration = sample.getDuration();
        this.fileExtension = sample.getFileExtension();
        this.categoryDTO =  new CategoryDTO(sample.getCategory());
        this.checksum = sample.getChecksum();
    }

}
