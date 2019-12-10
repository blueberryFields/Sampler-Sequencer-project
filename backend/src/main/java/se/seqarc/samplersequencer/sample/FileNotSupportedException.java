package se.seqarc.samplersequencer.sample;

public class FileNotSupportedException extends Exception {
    public FileNotSupportedException(String message) {
        super("File not supported: " + message);
    }

    public FileNotSupportedException(String message, Throwable cause) {
        super("File not supported: " + message, cause);
    }
}
