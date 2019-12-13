package se.seqarc.samplersequencer;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import se.seqarc.samplersequencer.user.Role;
import se.seqarc.samplersequencer.user.User;
import se.seqarc.samplersequencer.user.UserDTO;
import se.seqarc.samplersequencer.user.UserService;

import java.util.ArrayList;
import java.util.Collections;


@SpringBootApplication
public class SamplersequencerApplication {

    public static void main(String[] args) {
        SpringApplication.run(SamplersequencerApplication.class, args);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**");
            }
        };
    }
}
