package se.seqarc.samplersequencer;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import se.seqarc.samplersequencer.category.CategoryController;
import se.seqarc.samplersequencer.category.CategoryRepository;
import se.seqarc.samplersequencer.category.CategoryService;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
public class SmokeTest {


    @Autowired
    private CategoryController categoryController;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private CategoryRepository categoryRepository;

    @Test
    public void contextLoads() throws Exception {
        assertThat(categoryController).isNotNull();
        assertThat(categoryService).isNotNull();
        assertThat(categoryRepository).isNotNull();
    }
}