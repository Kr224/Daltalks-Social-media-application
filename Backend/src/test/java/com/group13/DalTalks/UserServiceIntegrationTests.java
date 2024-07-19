package com.group13.DalTalks;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Optional;

import com.group13.DalTalks.model.User;
import com.group13.DalTalks.repository.UserRepository;
import com.group13.DalTalks.service.Implementations.UserServiceImpl; // Import concrete implementation
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.junit.jupiter.api.extension.ExtendWith;

@ExtendWith(MockitoExtension.class)
public class UserServiceIntegrationTests {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserServiceImpl userService; // Use concrete implementation

    private User validUser;

    @BeforeEach
    public void setUp() {
        validUser = new User();
        validUser.setEmail("valid@example.com");
        validUser.setPassword("validPassword");
    }

    @Test
    public void testSuccessfulLogin() {
        when(userRepository.findByEmail("valid@example.com")).thenReturn(Optional.of(validUser));
        User user = userService.login("valid@example.com", "validPassword");
        assertEquals(validUser, user);
    }

    @Test
    public void testLoginWithInvalidEmail() {
        when(userRepository.findByEmail("invalid@example.com")).thenReturn(Optional.empty());
        IllegalArgumentException thrown = assertThrows(IllegalArgumentException.class, () -> {
            userService.login("invalid@example.com", "anyPassword");
        });
        assertEquals("Invalid email address!", thrown.getMessage());
    }

    @Test
    public void testLoginWithInvalidPassword() {
        when(userRepository.findByEmail("valid@example.com")).thenReturn(Optional.of(validUser));
        IllegalArgumentException thrown = assertThrows(IllegalArgumentException.class, () -> {
            userService.login("valid@example.com", "invalidPassword");
        });
        assertEquals("Invalid password!", thrown.getMessage());
    }

    @Test
    public void testLoginWithNullEmail() {
        IllegalArgumentException thrown = assertThrows(IllegalArgumentException.class, () -> {
            userService.login(null, "anyPassword");
        });
        assertEquals("Invalid email address!", thrown.getMessage());
    }

    @Test
    public void testLoginWithNullPassword() {
        when(userRepository.findByEmail("valid@example.com")).thenReturn(Optional.of(validUser));
        IllegalArgumentException thrown = assertThrows(IllegalArgumentException.class, () -> {
            userService.login("valid@example.com", null);
        });
        assertEquals("Invalid password!", thrown.getMessage());
    }

    @Test
    public void testLoginWithEmptyEmail() {
        IllegalArgumentException thrown = assertThrows(IllegalArgumentException.class, () -> {
            userService.login("", "anyPassword");
        });
        assertEquals("Invalid email address!", thrown.getMessage());
    }

    @Test
    public void testLoginWithEmptyPassword() {
        when(userRepository.findByEmail("valid@example.com")).thenReturn(Optional.of(validUser));
        IllegalArgumentException thrown = assertThrows(IllegalArgumentException.class, () -> {
            userService.login("valid@example.com", "");
        });
        assertEquals("Invalid password!", thrown.getMessage());
    }
}
