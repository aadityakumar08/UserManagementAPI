package org.usermanag.UserManagementAPI;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.usermanag.UserManagementAPI.model.User;
import org.usermanag.UserManagementAPI.repository.UserRepository;
import org.springframework.security.test.context.support.WithMockUser;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    private User user1;
    private User user2;

    @BeforeEach
    void setUp() {
        userRepository.deleteAll();
        objectMapper.registerModule(new JavaTimeModule());

        user1 = new User("John Doe", "john@example.com", "password123");
        user2 = new User("Charlie Smith", "charlie@example.com", "password123");

        List<User> savedInitialUsers = userRepository.saveAll(Arrays.asList(user1, user2));
        this.user1 = savedInitialUsers.get(0);
        this.user2 = savedInitialUsers.get(1);

        // Adding 25 more users
        List<User> manyUsers = IntStream.rangeClosed(1, 25)
                .mapToObj(i -> new User("User " + i, "user" + i + "@example.com", "password123"))
                .collect(Collectors.toList());

        userRepository.saveAll(manyUsers);
    }

    @Test
    @WithMockUser(username="admin",roles={"ADMIN"})
    void testGetUserByIdFound() throws Exception {
        mockMvc.perform(get("/api/users/{id}", user1.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(user1.getId().intValue())))
                .andExpect(jsonPath("$.name", is(user1.getName())))
                .andExpect(jsonPath("$.email", is(user1.getEmail())));
    }

    @Test
    @WithMockUser(username="admin",roles={"ADMIN"})
    void testCreateUser() throws Exception {
        User newUser1 = new User("Alice Wonder", "alice1@example.com", "password123");


        mockMvc.perform(
                post("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(newUser1))
        )
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.name", is(newUser1.getName())))
                .andExpect(jsonPath("$.email", is(newUser1.getEmail())));
    }

    @Test
    @WithMockUser(username="admin",roles={"ADMIN"})
    void testCreateMultipleUsers() throws Exception {
        List<User> newUsers = Arrays.asList(
                new User("Alice Brown", "alice.brown@example.com", "password123"),
                new User("Rohan Gray", "rohan.gray@example.com", "password123")
        );

        mockMvc.perform(post("/api/users/bulk")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(newUsers)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$[0].name", is("Alice Brown")))
                .andExpect(jsonPath("$[1].email", is("rohan.gray@example.com")));
    }

    @Test
    @WithMockUser(username="admin",roles={"ADMIN"})
    void testDeleteUserFound() throws Exception {
        mockMvc.perform(delete("/api/users/{id}", user1.getId())
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());
    }

    @Test
    @WithMockUser(username="admin",roles={"ADMIN"})
    void testDeleteUserNotFound() throws Exception {
        mockMvc.perform(delete("/api/users/{id}", 999L)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }
}