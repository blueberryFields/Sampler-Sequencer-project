package se.seqarc.samplersequencer.user;

import org.springframework.web.multipart.MultipartFile;

public interface UserService {

    public ReducedUserDTO uploadProfilePicture (MultipartFile multipartFile);

    public ReducedUserDTO uploadProfileDescription (String string, Long id) throws UserNotFoundException;

    public UserDTO getUserById(Long id) throws Exception;

    public void createUser(UserDTO userDTO) throws UsernameTakenException;

    public String login(LoginFormDTO loginFormDTO);
}
