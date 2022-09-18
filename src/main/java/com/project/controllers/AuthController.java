package com.project.controllers;

import com.project.model.Role;
import com.project.model.User;
import com.project.model.AuthenticationResponse;
import com.project.securityService.AuthenticateService;
import com.project.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;
@AllArgsConstructor
@RestController
@CrossOrigin(origins = "*")
@Slf4j
public class AuthController {

	private final UserService userService;
	private final  AuthenticateService authenticateService;
	
	@PostMapping("/register")
	public User register(@RequestBody User user) {
		log.info("User registered {} {} {}", user.getUsername(), user.getFirstName(), user.getLastName());
		return userService.register(user);
	}

	@PostMapping("/login")
 	public ResponseEntity<AuthenticationResponse> login(@RequestBody User user) throws Exception {
		final String token = authenticateService.getToken(user);
		Set<Role> roles = userService.getUser(user.getUsername()).getRoles();
		final String role = roles.iterator().next().getName();
 		AuthenticationResponse authenticationResponse = new AuthenticationResponse(token, role);
		System.out.println(authenticationResponse);
		return ResponseEntity.ok(authenticationResponse) ;
	}

}
