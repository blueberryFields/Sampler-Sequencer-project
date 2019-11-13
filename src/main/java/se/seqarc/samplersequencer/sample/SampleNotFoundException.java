package se.seqarc.samplersequencer.sample;

public class SampleNotFoundException extends Exception {

    public SampleNotFoundException() {
        super("Sample was not found");
    }
}
