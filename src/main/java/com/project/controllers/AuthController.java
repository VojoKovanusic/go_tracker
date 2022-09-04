package com.project.controllers;

import com.project.model.Role;
import com.project.model.User;
import com.project.model.AuthenticationResponse;
import com.project.securityService.AuthenticateService;
import com.project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@CrossOrigin(origins = "*")
public class AuthController {
	@Autowired
	UserService userService;
	@Autowired
	private AuthenticateService authenticateService;
	
	@PostMapping("/register")
	public User register(@RequestBody User user) {
		System.out.println("user = " + user);
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
