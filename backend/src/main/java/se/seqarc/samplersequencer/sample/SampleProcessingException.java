package se.seqarc.samplersequencer.sample;

public class SampleProcessingException extends Exception {

    public SampleProcessingException(String message) {
        super(message);
    }

    public SampleProcessingException(String message, Throwable e) {
        super(message, e);
    }

}
