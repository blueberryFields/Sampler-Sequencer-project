package se.seqarc.samplersequencer.user;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;


@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/create")
    public ResponseEntity<UserDTO> handleCreateUser(@RequestBody UserDTO userDTO) {
        try {
            return new ResponseEntity<>(userService.createUser(userDTO), HttpStatus.CREATED);
        } catch(Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.CONFLICT, e.getMessage());
        }

    }

    @PostMapping("/upload")
    public ResponseEntity<UserDTO> handleProfilePictureUpload(@RequestParam("file")MultipartFile multipartFile) {
        try {
            return new ResponseEntity<>(userService.uploadProfilePicture(multipartFile), HttpStatus.CREATED);
        } catch(Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error uploading profile picture");
        }
    }
}
