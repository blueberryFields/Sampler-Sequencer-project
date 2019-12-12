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

    @PostMapping("/create")
    public ResponseEntity<UserDTO> handleCreateUser(@RequestBody UserDTO userDTO) {
        try {
            return new ResponseEntity<>(userService.createUser(userDTO), HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.CONFLICT, e.getMessage());
        }
    }

    @PostMapping("/login")
    // TODO: change to requestbody
    public ResponseEntity<String> login(@RequestParam String username, @RequestParam String password) {
        return new ResponseEntity<>(userService.login(username, password), HttpStatus.OK);
    }

    @PostMapping("/upload")
    public ResponseEntity<UserDTO> handleProfilePictureUpload(@RequestParam("file") MultipartFile multipartFile) {
        try {
            return new ResponseEntity<>(userService.uploadProfilePicture(multipartFile), HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error uploading profile picture");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> handleProfileDescriptionUpdate(@RequestParam String description, @PathVariable String id) {
        try {
            LOGGER.info("Updating description for user " + id + ", description follows: " + description);
            return new ResponseEntity<>(userService.uploadProfileDescription(description), HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("Error updating description, full stacktrace follows: ", e);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Error updating profile description");
        }
    }

}
