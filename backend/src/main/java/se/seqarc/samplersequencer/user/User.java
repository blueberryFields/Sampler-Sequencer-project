package se.seqarc.samplersequencer.user;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String profilePicture;
    private String profileDescription;
    @Column(unique = true)
    private String userName;
    private String password;

    public User(UserDTO userDTO) {
        this.profilePicture = userDTO.getProfilePicture();
        this.profileDescription = userDTO.getProfileDescription();
        this.userName = userDTO.getUserName();
        this.password = userDTO.getPassword();
    }
}
