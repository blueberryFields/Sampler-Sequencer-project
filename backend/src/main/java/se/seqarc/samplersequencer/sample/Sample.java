package se.seqarc.samplersequencer.sample;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import se.seqarc.samplersequencer.category.Category;
import se.seqarc.samplersequencer.user.User;

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
    @NotNull
    private String name;
    private double duration;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    @JsonIgnore
    private Category category;
    @NotNull
    @Length(max = 32)
    private String checksum;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Sample(SampleDTO sampleDTO) {
        this.id = sampleDTO.getId();
        this.name = sampleDTO.getName();
        this.duration = sampleDTO.getDuration();
        this.category = new Category(sampleDTO.getCategoryDTO());
        this.checksum = sampleDTO.getChecksum();
        this.user = new User(sampleDTO.getUser());
    }

}
