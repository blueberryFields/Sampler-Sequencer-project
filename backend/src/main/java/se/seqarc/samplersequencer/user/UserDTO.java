package se.seqarc.samplersequencer.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class UserDTO {

    private Long id;
    private String profilePicture;
    private String profileDescription;
    private String username;
    private String password;
    List<Role> roles;

    public UserDTO(User user) {
        this.id = user.getId();
        this.profilePicture = user.getProfilePicture();
        this.profileDescription = user.getProfileDescription();
        this.username = user.getUsername();
        this.password = user.getPassword();
        this.roles = user.getRoles();
    }

}
