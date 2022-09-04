package com.project.controllers;

import com.project.model.User;
import com.project.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@Slf4j
@RestController
@CrossOrigin(origins = "*")
public class UserController {
    private final UserService userService;
@Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/user/hello")
    public String hello() {
        return "hello user";
    }

    @GetMapping("/users")
    public List<User> users() {
        return userService.getAll();
    }

    @GetMapping("/users/{username}")
    public User userByUsername(@PathVariable String username) {
        System.out.println("username => " + username);
        return userService.getUser(username);
    }

    @PostMapping("/user")
    public User register(@RequestBody User user) {
        log.info("register user {} ", user);
        return userService.register(user);
    }

    @PutMapping("/user")
    public User edit(@RequestBody User user) {
      log.info("edit user {}", user);
        return userService.edit(user);
    }

    @DeleteMapping("/user/{id}")
    public void delete(@PathVariable long id) {
        userService.deleteById(id);
    }
}
