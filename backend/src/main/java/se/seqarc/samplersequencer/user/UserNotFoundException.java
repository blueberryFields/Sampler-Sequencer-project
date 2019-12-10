package se.seqarc.samplersequencer.user;

public class UserNotFoundException extends Exception {

    public UserNotFoundException() {
        super("User was not found");
    }
}
