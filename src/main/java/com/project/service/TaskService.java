package com.project.service;

import com.project.model.Status;
import com.project.model.Task;
import com.project.repository.TaskRepository;
import com.project.util.MyUtil;
 import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class TaskService {
    private TaskRepository taskRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> tasks() {
        if(MyUtil.isUser()){
            String msisdn = MyUtil.getUsernameCurrentlyLoggedInUser();
            log.info(msisdn);
            return taskRepository.findByUsername(msisdn);
        }
        return  this.taskRepository.findAll();
    }

    public void add(Task task) {
        log.info("Added task: {}", task);
        task.setStatus(Status.CREATED);
        this.taskRepository.save(task);
    }

    public void delete(Long id) {
        Optional<Task> task = taskRepository.findById(id);
        task.ifPresent(p -> {
            this.taskRepository.delete(p);
            log.info("Delete task: {}", p);
        });
    }

    public Task get(Long id) {
        return taskRepository.findById(id).get();
    }

    public Task edit(Task newTask) {
        Long id = newTask.getId();
        Optional<Task> oldProduct = taskRepository.findById(id);
        taskRepository.deleteById(id);
        newTask.setId(null);
        log.info("Edit task: {} --> {}", oldProduct, newTask);
        return this.taskRepository.save(newTask);
     }

}

