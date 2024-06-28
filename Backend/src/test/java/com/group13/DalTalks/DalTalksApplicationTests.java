package com.group13.DalTalks;

import com.group13.DalTalks.model.User;
import com.group13.DalTalks.repository.UserRepository;
import com.group13.DalTalks.service.UserService;
import com.group13.DalTalks.service.implementations.UserServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class DalTalksApplicationTests {

	@Mock
	private UserRepository userRepository;

	@Autowired
	private UserServiceImpl userServiceImpl;

	@BeforeEach
	void setUp() {
		userServiceImpl = new UserServiceImpl();
	}

	@Test
	void contextLoads() {
	}

	@Test
	void testResetPasswordValidEmailAndInvalidNewPassword() {
		assertThrows(IllegalArgumentException.class, () -> {
			userServiceImpl.resetPassword("test@example.com", "short");
		});
	}

	@Test
	void testResetPasswordInvalidEmail() {
		Mockito.when(userRepository.findByEmail("invalid@example.com")).thenReturn(Optional.empty());

		assertThrows(IllegalArgumentException.class, () -> {
			userServiceImpl.resetPassword("invalid@example.com", "ValidPass123");
		});
	}
}
