package se.seqarc.samplersequencer.categoryTests;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;
import se.seqarc.samplersequencer.category.Category;
import se.seqarc.samplersequencer.category.CategoryNotFoundException;
import se.seqarc.samplersequencer.category.CategoryRepository;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@DataJpaTest
public class CategoryRepoTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private CategoryRepository categoryRepository;


    @Test
    public void whenFindByCategory_thenReturnCategory() throws Throwable {
        // given
        Category bassdrum = new Category();
        bassdrum.setCategory("Bass Drum");
        entityManager.persist(bassdrum);
        entityManager.flush();

        // when
        Optional<Category> result = categoryRepository.findCategoryByCategory("Bass Drum");
        Category found = result.orElseThrow(CategoryNotFoundException::new);

        // then
        assertThat(found.getCategory())
                .isEqualTo(bassdrum.getCategory());
    }

    @Test
    public void whenFindAll_thenReturnAllCategories() {
        // given
        Category bassdrum = new Category();
        bassdrum.setCategory("Bass Drum");
        entityManager.persist(bassdrum);
        Category snare= new Category();
        snare.setCategory("Snare");
        entityManager.persist(snare);
        Category clap = new Category();
        clap.setCategory("Clap");
        entityManager.persist(clap);
        entityManager.flush();

        // when
        List<Category> found = (List<Category>) categoryRepository.findAll();
        assertThat(found.get(0).getCategory()).isEqualTo(bassdrum.getCategory());
        assertThat(found.get(1).getCategory()).isEqualTo(snare.getCategory());
        assertThat(found.get(2).getCategory()).isEqualTo(clap.getCategory());
    }
}
