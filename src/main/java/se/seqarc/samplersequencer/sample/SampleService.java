package se.seqarc.samplersequencer.sample;

public interface SampleService {
    public abstract SampleDTO getSample(Long id) throws Exception;
}
