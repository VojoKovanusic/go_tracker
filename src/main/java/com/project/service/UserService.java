package com.project.service;

import com.project.mapper.UserMapper;
import com.project.model.Role;
import com.project.model.User;
import com.project.model.response.UserResponse;
import com.project.repository.RoleRepository;
import com.project.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository repository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    public User getUserById(long id) {
        return repository.findById(id).orElse(null);
    }

    //@Cacheable("users")
    public List<User> getAll() {
        ArrayList<User> users = (ArrayList<User>) repository.findAll();
        users.forEach(us -> {
            Optional<Role> first = us.getRoles().stream().findFirst();
            us.setRole(first.get().getName());
        });
        return users.stream()
                .filter(User::isEnabled)
                .collect(Collectors.toList());
    }

    public List<UserResponse> getAllUserResponse() {
        return userMapper.toResponseList(repository.findAll());
    }

    //@CacheEvict(value = "users", allEntries = true)
    public User register(User user) {
        System.out.println("user reg = " + user.getUsername());
        prepareUserForDatabase(user);
        User savedUser = repository.save(user);
        System.out.println("User {} is saved in DB" + savedUser);
        return savedUser;
    }

    private void prepareUserForDatabase(User user) {
        setupPassword(user);
        enable(user);
        setupRole(user);
    }

    private void enable(User user) {
        user.setEnabled(true);
    }

    private void setupPassword(User user) {
        String pass = this.passwordEncoder.encode(user.getPassword());
        user.setPassword(pass);
    }

    private void setupRole(User user) {
        Role role = roleRepository.findByName(user.getRole());
        user.getRoles().add(role);
    }

    public User getUser(String username) {
        return repository.findByUsername(username);
    }

    //@CacheEvict(value = "users", allEntries = true)
    public void deleteById(long id) {
        int admins = numberOfAdmins();
        log.info("Number of admins in DB - {}", admins);
        Optional<User> admin = repository.findById(id);
        if (admin.isPresent())
            if (admins > 1 || !admin.get().isAdmin()) {
                repository.deleteById(id);
                log.info("User deleted by id, with id {}", id);
            } else {
                log.info("Can't deleted all user, user with id {} is last admin in DB", id);
            }
    }

    private int numberOfAdmins() {
        Iterable<User> users = repository.findAll();
        int counter = 0;
        for (User user : users) {
            if (user.isAdmin()) {
                counter++;
            }
        }
        return counter;
    }

    //@CacheEvict(value = "users", allEntries = true)
    public User edit(User user) {
        log.info("EDIT USER {}", user);
        repository.deleteById(user.getId());
        prepareUserForDatabase(user);
        return repository.save(user);
    }
}

