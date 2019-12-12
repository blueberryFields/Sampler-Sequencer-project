package se.seqarc.samplersequencer.user;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import se.seqarc.samplersequencer.security.CustomException;
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
    public UserDTO uploadProfilePicture(MultipartFile multipartFile) {
        storageService.store(multipartFile, UploadLocation.PROFILEPIC);
        return null;
    }

    @Override
    public UserDTO uploadProfileDescription(String string) {

        return null;
    }

    @Override
    public UserDTO getUserById(Long id) throws Exception {
        Optional<User> result = userRepository.findById(id);
        User user = result.orElseThrow(UserNotFoundException::new);
        return null;
    }

    @Override
    public UserDTO createUser(UserDTO userDTO) throws UsernameTakenException {
        if(userRepository.existsUserByUsername(userDTO.getUsername())) {
            throw new UsernameTakenException(userDTO.getUsername());
        } else {
            User user = new User();
            user.setUsername(userDTO.getUsername());
            user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
            user.setRoles(userDTO.getRoles());
            return new UserDTO(userRepository.save(user));
        }
    }

    @Override
    public String login(String username, String password) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
            return jwtTokenProvider.createToken(username, userRepository.findByUsername(username).getRoles());
        } catch (Exception e) {
            throw new CustomException("Invalid username/password supplied", HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }
}
