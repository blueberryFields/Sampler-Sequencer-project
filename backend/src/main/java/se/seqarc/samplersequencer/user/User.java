package se.seqarc.samplersequencer.user;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

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
    private String username;
    private String password;
    @ElementCollection(fetch = FetchType.EAGER)
    List<Role> roles;

    public User(UserDTO userDTO) {
        this.profilePicture = userDTO.getProfilePicture();
        this.profileDescription = userDTO.getProfileDescription();
        this.username = userDTO.getUsername();
        this.password = userDTO.getPassword();
        this.roles = userDTO.getRoles();
    }

    public User(ReducedUserDTO userDTO) {
        this.id = userDTO.getId();
        this.username = userDTO.getUsername();
    }
}
