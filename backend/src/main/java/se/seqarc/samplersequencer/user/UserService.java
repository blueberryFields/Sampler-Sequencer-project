package se.seqarc.samplersequencer.user;

import org.springframework.web.multipart.MultipartFile;

public interface UserService {

    public ReducedUserDTO uploadProfilePicture (MultipartFile multipartFile, Long id) throws UserNotFoundException;

    public ReducedUserDTO downloadProfilePicture (MultipartFile multipartFile, String name);

    public ReducedUserDTO uploadProfileDescription (String string, Long id) throws UserNotFoundException;

    public ReducedUserDTO getUserById(Long id) throws Exception;

    public void createUser(UserDTO userDTO) throws UsernameTakenException;

    public String login(LoginFormDTO loginFormDTO);
}
