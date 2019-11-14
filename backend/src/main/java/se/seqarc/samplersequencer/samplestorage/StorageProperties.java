package se.seqarc.samplersequencer.samplestorage;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("storage")
public class StorageProperties {

    // Location for storing files

    private String location = "resources/samples";


}
