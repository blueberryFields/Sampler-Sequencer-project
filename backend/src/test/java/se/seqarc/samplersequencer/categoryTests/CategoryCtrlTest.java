package se.seqarc.samplersequencer.categoryTests;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.json.JacksonTester;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import se.seqarc.samplersequencer.category.CategoryController;
import se.seqarc.samplersequencer.category.CategoryDTO;
import se.seqarc.samplersequencer.category.CategoryServiceImpl;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

@RunWith(MockitoJUnitRunner.class)
@WebMvcTest(CategoryController.class)
public class CategoryCtrlTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private CategoryServiceImpl categoryService;

    private JacksonTester<List<CategoryDTO>> jsonCategories;

    @Test
    public void getAllCategoriesTest() throws Exception {
        // GIVEN
        CategoryDTO bassDrum = new CategoryDTO();
        bassDrum.setCategory("Bass Drum");
        bassDrum.setId(1L);
        CategoryDTO snare= new CategoryDTO();
        snare.setCategory("Snare");
        snare.setId(2L);
        CategoryDTO clap = new CategoryDTO();
        clap.setCategory("Clap");
        clap.setId(3L);
        List<CategoryDTO> categoryList = new ArrayList<>();
        categoryList.add(bassDrum);
        categoryList.add(snare);
        categoryList.add(clap);
        given(categoryService.getAllCategories())
                .willReturn(categoryList);

        // WHEN
        MockHttpServletResponse response = mvc.perform(
                get("/category/findall")
                        .accept(MediaType.APPLICATION_JSON))
                .andReturn().getResponse();

        // THEN
        JacksonTester.initFields(this, new ObjectMapper());
        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(response.getContentAsString()).isEqualTo(
                jsonCategories.write(categoryList).getJson());
    }
}
