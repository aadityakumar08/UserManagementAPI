package org.usermanag.UserManagementAPI;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.usermanag.UserManagementAPI.model.User;
import org.usermanag.UserManagementAPI.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
//import static org.junit.jupiter.api.Assertions.*;
import org.springframework.context.annotation.Import;

@Import(TestPasswordEncoderConfig.class)
@DataJpaTest
// @dataJpaTest loads only a slice of the Spring context relevant to JPA.
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TestEntityManager entityManager;
    private User user1;
    private User user2;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @BeforeEach
    void setUp() {
        userRepository.deleteAll();
        user1 = new User("John Doe", "john@example.com", "password123");
        user2 = new User("Charlie Smith", "charlie@example.com", "password123");
        entityManager.persist(user1);
        entityManager.persist(user2);
        entityManager.flush();
        entityManager.clear();
    }

    @Test
    void testFindByEmailFound() {
        Optional<User> foundUser = userRepository.findByEmail(user1.getEmail());
        assertThat(foundUser).isPresent();
        assertThat(foundUser.get().getName()).isEqualTo(user1.getName());
        assertThat(foundUser.get().getEmail()).isEqualTo(user1.getEmail());
        assertThat(foundUser.get().getId()).isEqualTo(user1.getId());


    }
    @Test
    void testSavedUser() {
        String rawPassword = "password123";
        String encodedPassword = passwordEncoder.encode(rawPassword);
        User user = new User("Unique Name", "unique.email@example.com", encodedPassword);
        User savedUser = userRepository.save(user);

        // Assert
        assertThat(savedUser).isNotNull();
        assertThat(savedUser.getId()).isNotNull();
        assertThat(savedUser.getName()).isEqualTo("Unique Name");
        assertThat(savedUser.getEmail()).isEqualTo("unique.email@example.com");
        assertThat(passwordEncoder.matches(rawPassword, savedUser.getPassword())).isTrue();
    }
    @Test
    void testUpdateUser() {
        // Save original user first
        User userToUpdate = new User("Real Name", "realName@example.com", "password123");
        User savedUser = userRepository.save(userToUpdate);

        // Change the values now to match the assertion
        savedUser.setName("Updated Name");
        savedUser.setEmail("updated@example.com");

        // Save again
        User updatedUser = userRepository.save(savedUser);

        // Now verify it
        assertThat(updatedUser.getName()).isEqualTo("Updated Name");
        assertThat(updatedUser.getEmail()).isEqualTo("updated@example.com");
    }
    @Test
    void testDeleteUser() {
        userRepository.delete(user1);
        Optional<User> foundUser = userRepository.findByEmail(user1.getEmail());
        assertThat(foundUser).isNotPresent();
    }
}




