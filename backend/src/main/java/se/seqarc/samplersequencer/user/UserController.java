package se.seqarc.samplersequencer.user;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;


@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());


    public UserController(UserService userService) {
        this.userService = userService;
    }

    // TODO: Maybe it would be better to use a signupFormDTO rather than UserDTO here?
    @PostMapping("/create")
    public ResponseEntity<Void> handleCreateUser(@RequestBody UserDTO userDTO) {
        try {
            userService.createUser(userDTO);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (UsernameTakenException e) {
            LOGGER.error("Username already taken", e);
            throw new ResponseStatusException(HttpStatus.CONFLICT, e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginFormDTO loginFormDTO) {
        return new ResponseEntity<>(userService.login(loginFormDTO), HttpStatus.OK);
    }

    @PostMapping("/upload")
    public ResponseEntity<ReducedUserDTO> handleProfilePictureUpload(@RequestParam("file") MultipartFile multipartFile) {
        try {
            return new ResponseEntity<>(userService.uploadProfilePicture(multipartFile), HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error uploading profile picture");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReducedUserDTO> handleProfileDescriptionUpdate(@RequestBody ReducedUserDTO reducedUserDTO, @PathVariable Long id) {
        try {
            String description = reducedUserDTO.getProfileDescription();
            LOGGER.info("Updating description for user " + id + ", description follows: " + description);
            return new ResponseEntity<>(userService.uploadProfileDescription(description, id), HttpStatus.OK);
        } catch(Exception e) {
            LOGGER.error("Error updating description, full stacktrace follows: ", e);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Error updating profile description");
        }
    }

}
