package se.seqarc.samplersequencer.user;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import se.seqarc.samplersequencer.storage.StorageService;
import se.seqarc.samplersequencer.storage.UploadLocation;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final StorageService storageService;
    private final UserRepository userRepository;

    public UserServiceImpl(StorageService storageService, UserRepository userRepository) {
        this.storageService = storageService;
        this.userRepository = userRepository;
    }

    @Override
    public UserDTO uploadProfilePicture(MultipartFile multipartFile) {
        storageService.store(multipartFile, UploadLocation.PROFILEPIC);
        return null;
    }

    @Override
    public UserDTO uploadProfileDescription(String description, Long id) throws UserNotFoundException {
        Optional<User> result = userRepository.findById(id);
        User user = result.orElseThrow(UserNotFoundException::new);
        user.setProfileDescription(description);
        userRepository.save(user);
        return new UserDTO(user);
    }

    @Override
    public UserDTO getUserById(Long id) throws Exception {
        Optional<User> result = userRepository.findById(id);
        User user = result.orElseThrow(UserNotFoundException::new);
        return null;
    }

    @Override
    public UserDTO createUser(UserDTO userDTO) throws UsernameTakenException {
        if(userRepository.existsUserByUserName(userDTO.getUserName())) {
            throw new UsernameTakenException(userDTO.getUserName());
        } else {
            User user = new User(userDTO);
            return new UserDTO(userRepository.save(user));
        }
    }
}
