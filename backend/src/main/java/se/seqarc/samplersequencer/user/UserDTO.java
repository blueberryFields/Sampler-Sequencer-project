package se.seqarc.samplersequencer.user;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserDTO {

    private Long id;
    private String profilePicture;
    private String profileDescription;
    private String userName;
    private String password;

    public UserDTO(User user) {
        this.id = user.getId();
        this.profilePicture = user.getProfilePicture();
        this.profileDescription = user.getProfileDescription();
        this.userName = user.getUserName();
        this.password = user.getPassword();
    }
}
