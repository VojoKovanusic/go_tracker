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
public class ProductController {
    private final TaskService taskService;

    @Autowired
    public ProductController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("/products")
    public List<Task> products() {
        return taskService.tasks();
    }

    @GetMapping("/product/{id}")
    public Task productById(@PathVariable Long id) {
        return taskService.get(id);
    }

    @PostMapping("/product")
    public void register(@RequestBody Task task) {
        taskService.add(task);
    }

    @PutMapping("/product")
    public Task edit(@RequestBody Task task) {
        return taskService.edit(task);
    }

    @DeleteMapping("/product/{id}")
    public void delete(@PathVariable long id) {
        taskService.delete(id);
    }
}
