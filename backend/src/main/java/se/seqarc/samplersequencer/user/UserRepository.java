package se.seqarc.samplersequencer.user;

import org.springframework.data.repository.CrudRepository;


public interface UserRepository extends CrudRepository<User, Long> {

    boolean existsUserByUserName(String userName);


}
