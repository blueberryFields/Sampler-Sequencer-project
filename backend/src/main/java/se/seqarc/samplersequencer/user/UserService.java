package se.seqarc.samplersequencer.user;

import org.springframework.web.multipart.MultipartFile;

public interface UserService {

    public UserDTO uploadProfilePicture (MultipartFile multipartFile);

    public UserDTO uploadProfileDescription (String string, Long id) throws UserNotFoundException;

    public UserDTO getUserById(Long id) throws Exception;

    public UserDTO createUser(UserDTO userDTO) throws UsernameTakenException;


}
