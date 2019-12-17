package se.seqarc.samplersequencer.categoryTests;

import org.junit.Assert;
import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.*;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.test.context.junit4.SpringRunner;
import se.seqarc.samplersequencer.category.*;

import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
//@SpringBootTest
public class CategoryServiceImplTest {

    @Mock
    private CategoryRepository categoryRepository;


    private CategoryServiceImpl categoryService;

    @Before
    public void setup() {
        categoryService = new CategoryServiceImpl(categoryRepository);
        MockitoAnnotations.initMocks(this);
    }


   /* @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }*/

    /*@Test
    public void testCategory() {
        String result = categoryService.testCategory();

        assertThat(result).isEqualTo("test-category");
    }*/

   /* @Before
    public void setUp() {
        categoryRepository = Mockito.mock(CategoryRepository.class);
        categoryService = new CategoryServiceImpl(categoryRepository);
    }*/

    @Test
    public void testGetCategoryByCategory() throws CategoryNotFoundException {
        // GIVEN
        Category bassDrum = new Category();
        bassDrum.setCategory("Bass Drum");
        when(categoryRepository.findCategoryByCategory("Bass Drum"))
                .thenReturn(java.util.Optional.of(bassDrum));

        // WHEN
        CategoryDTO categoryDTO = categoryService.getCategoryByCategory("Bass Drum");

        // THEN
        Assert.assertEquals(categoryDTO.getCategory(), bassDrum.getCategory());
    }

    /*@Test
    public void testFindAllCategories() {
        // GIVEN
        Category bassDrum = new Category();
        bassDrum.setCategory("Bass Drum");
        Category snare= new Category();
        snare.setCategory("Snare");
        Category clap = new Category();
        clap.setCategory("Clap");
        List<Category> categoryList = new ArrayList<>();
        categoryList.add(bassDrum);
        categoryList.add(snare);
        categoryList.add(clap);
        Mockito.when(categoryRepository.findAll()).thenReturn(categoryList);

        // WHEN
        List<CategoryDTO> found = categoryService.getAllCategories();

        // THEN
        assertThat(found.get(0)).isEqualTo(categoryList.get(0));
        assertThat(found.get(1)).isEqualTo(categoryList.get(1));
        assertThat(found.get(2)).isEqualTo(categoryList.get(2));
    }*/
}


