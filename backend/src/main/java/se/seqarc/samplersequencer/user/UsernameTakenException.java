package se.seqarc.samplersequencer.user;

public class UsernameTakenException extends Exception {

    public UsernameTakenException(String username) {
        super("Username: " + "\"" + username + "\" was already taken. Please select another username.");
    }
}
