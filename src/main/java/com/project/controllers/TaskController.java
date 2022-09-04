package com.project.controllers;

import com.project.model.Task;
import com.project.service.TaskService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "*")
public class TaskController {
    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("/tasks")
    public List<Task> tasks() {
        return taskService.tasks();
    }

    @GetMapping("/task/{id}")
    public Task taskById(@PathVariable Long id) {
        return taskService.get(id);
    }

    @PostMapping("/task")
    public void register(@RequestBody Task task) {
        taskService.add(task);
    }

    @PutMapping("/task")
    public Task edit(@RequestBody Task task) {
        return taskService.edit(task);
    }

    @DeleteMapping("/task/{id}")
    public void delete(@PathVariable long id) {
        taskService.delete(id);
    }
}
