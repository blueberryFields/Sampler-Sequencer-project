package se.seqarc.samplersequencer.user;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class ReducedUserDTO {

    private Long id;
    private String username;
    private String profilePicture;
    private String profileDescription;

    public ReducedUserDTO(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.profilePicture = user.getProfilePicture();
        this.profileDescription = user.getProfileDescription();
    }
}
