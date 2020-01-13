package se.seqarc.samplersequencer.user;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import se.seqarc.samplersequencer.security.SecurityException;
import se.seqarc.samplersequencer.security.JwtTokenProvider;
import se.seqarc.samplersequencer.storage.StorageService;
import se.seqarc.samplersequencer.storage.UploadLocation;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final StorageService storageService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final  AuthenticationManager authenticationManager;

    public UserServiceImpl(StorageService storageService, UserRepository userRepository, PasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider, AuthenticationManager authenticationManager) {
        this.storageService = storageService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
        this.authenticationManager = authenticationManager;
    }

    @Override
    public ReducedUserDTO uploadProfilePicture(MultipartFile multipartFile, Long id) throws UserNotFoundException {
        String filename = storageService.store(multipartFile, UploadLocation.PROFILEPIC);
        Optional<User> result = userRepository.findById(id);
        User user = result.orElseThrow(UserNotFoundException::new);
        user.setProfilePicture(filename);
        userRepository.save(user);
        return new ReducedUserDTO(user);
    }

    @Override
    public ReducedUserDTO downloadProfilePicture(MultipartFile multipartFile, String name) {
        return null;
    }

    @Override
    public ReducedUserDTO uploadProfileDescription(String description, Long id) throws UserNotFoundException {
        Optional<User> result = userRepository.findById(id);
        User user = result.orElseThrow(UserNotFoundException::new);
        user.setProfileDescription(description);
        userRepository.save(user);
        return new ReducedUserDTO(user);
    }

    @Override
    public UserDTO getUserById(Long id) throws Exception {
        Optional<User> result = userRepository.findById(id);
        User user = result.orElseThrow(UserNotFoundException::new);
        return null;
    }

    @Override
    public void createUser(UserDTO userDTO) throws UsernameTakenException {
        if(userRepository.existsUserByUsername(userDTO.getUsername())) {
            throw new UsernameTakenException(userDTO.getUsername());
        } else {
            User user = new User();
            user.setUsername(userDTO.getUsername());
            user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
            user.setRoles(userDTO.getRoles());
            user.setProfileDescription(userDTO.getProfileDescription());
            userRepository.save(user);
        }
    }

    @Override
    public String login(LoginFormDTO loginFormDTO) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginFormDTO.getUsername(), loginFormDTO.getPassword()));
            User user = userRepository.findByUsername(loginFormDTO.getUsername());
            return jwtTokenProvider.createToken(user.getUsername(), user.getRoles(), user.getId());
        } catch (Exception e) {
            throw new SecurityException("Invalid username/password supplied", HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }
}
