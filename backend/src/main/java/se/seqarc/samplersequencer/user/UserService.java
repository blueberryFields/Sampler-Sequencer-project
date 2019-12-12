package se.seqarc.samplersequencer.user;

import org.springframework.web.multipart.MultipartFile;

public interface UserService {

    public UserDTO uploadProfilePicture (MultipartFile multipartFile);

    public UserDTO uploadProfileDescription (String string);

    public UserDTO getUserById(Long id) throws Exception;

    public void createUser(UserDTO userDTO) throws UsernameTakenException;

    public String login(LoginFormDTO loginFormDTO);
}
