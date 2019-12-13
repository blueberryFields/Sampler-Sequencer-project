package se.seqarc.samplersequencer.sample;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import se.seqarc.samplersequencer.category.CategoryDTO;
import se.seqarc.samplersequencer.user.ReducedUserDTO;
import se.seqarc.samplersequencer.user.UserDTO;

@Getter
@Setter
@NoArgsConstructor
public class SampleDTO {

    private Long id;
    private String name;
    private double duration;
    @JsonIgnore
    private CategoryDTO categoryDTO;
    private String checksum;
    private ReducedUserDTO user;

    public SampleDTO(Sample sample) {
        this.id = sample.getId();
        this.name = sample.getName();
        this.duration = sample.getDuration();
        this.categoryDTO = new CategoryDTO(sample.getCategory());
        this.checksum = sample.getChecksum();
        this.user = new ReducedUserDTO(sample.getUser());
    }

}
