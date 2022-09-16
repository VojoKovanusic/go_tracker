package com.project.mapper;

import com.project.model.User;
import com.project.model.response.UserResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;


import java.util.ArrayList;
import java.util.List;

@Slf4j
@Component
public class UserMapper {
    public List<UserResponse> toResponseList(List<User> users) {
        if (users == null) {
            return null;
        }
        List<UserResponse> response = new ArrayList<>();
        users.forEach(user -> response.add(toResponse(user)));
        return response;
    }

    public UserResponse toResponse(User user) {
        if (user == null) {
            return null;
        }
        UserResponse userResponse = new UserResponse();
        userResponse.setId(user.getId());
        userResponse.setUsername(user.getUsername());
        userResponse.setFirstName(user.getFirstName());
        userResponse.setLastName(user.getLastName());
        return userResponse;

    }
}
