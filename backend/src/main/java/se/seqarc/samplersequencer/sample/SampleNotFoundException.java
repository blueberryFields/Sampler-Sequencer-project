package se.seqarc.samplersequencer.sample;

public class SampleNotFoundException extends Exception {

    public SampleNotFoundException() {
        super("Sample was not found");
    }

    public SampleNotFoundException(String missingSample) {
        super("Sample was not found: " + missingSample);
    }
}
