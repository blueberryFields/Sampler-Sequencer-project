package se.seqarc.samplersequencer.user;

import org.springframework.data.repository.CrudRepository;

import java.util.Optional;


public interface UserRepository extends CrudRepository<User, Long> {

    boolean existsUserByUsername(String userName);

    User findByUsername(String userName);

    Optional<User> findOneByUsername(String userName);
}
