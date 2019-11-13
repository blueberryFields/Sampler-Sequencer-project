package se.seqarc.samplersequencer.sample;

import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SampleServiceImpl implements SampleService{

    private final SampleRepository sampleRepository;

    public SampleServiceImpl(SampleRepository sampleRepository) {
        this.sampleRepository = sampleRepository;
    }

    @Override
    public SampleDTO getSample(Long id) throws Exception {
        Optional<Sample> result = sampleRepository.findById(id);
        Sample sample = result.orElseThrow(SampleNotFoundException::new);
        SampleDTO sdto = new SampleDTO(sample);
        return sdto;
    }
}
