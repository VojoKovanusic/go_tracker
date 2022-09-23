package com.project.controllers;

import com.project.util.SmsValidator;
import com.project.constants.ErrorMsg;
import com.project.error_advice.MsisdnNotValidEception;
import com.project.error_advice.UserNotFoundException;
import com.project.model.Role;
import com.project.model.User;
import com.project.model.AuthenticationResponse;
import com.project.securityService.AuthenticateService;
import com.project.service.UserService;
import com.project.service.SmsService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Set;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "*")
@Slf4j
public class AuthController {

    private final UserService userService;
    private final SmsService sendSms;
    private final AuthenticateService authenticateService;

    @PostMapping("/add-user")
    public User register(@RequestBody User user) {
        if (!SmsValidator.isValid(user.getUsername())) {
            log.info("Radnik nije unjeo validan broj: {}", user.getUsername());
            throw new MsisdnNotValidEception(ErrorMsg.MSISDN_NOT_VALID);
        }
        log.info("User registered {} {} {}", user.getUsername(), user.getFirstName(), user.getLastName());
        return userService.register(user);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody User user) throws Exception {
        final String token = authenticateService.getToken(user);
        Set<Role> roles = userService.getUser(user.getUsername()).getRoles();
        final String role = roles.iterator().next().getName();
        AuthenticationResponse authenticationResponse = new AuthenticationResponse(token, role);
        log.info("User:{} finisher with registration  and login.", authenticationResponse);
        return ResponseEntity.ok(authenticationResponse);
    }

    @PostMapping("/send-pin")
    public void generatePin(@RequestBody String msisdn) throws UserNotFoundException, IOException {
         sendSms.send(msisdn);
    }

}
