package se.seqarc.samplersequencer.category;

import org.springframework.data.repository.CrudRepository;
import se.seqarc.samplersequencer.sample.Sample;

import java.util.Optional;

public interface CategoryRepository extends CrudRepository<Category, Long> {

    Optional<Category> findCategoryByCategory(String Category);
}
