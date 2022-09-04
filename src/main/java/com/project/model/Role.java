package com.project.model;

import lombok.Getter;
import lombok.ToString;

import javax.persistence.*;

@Table(name = "roles", schema = "tracker")
@Entity
@Getter
@ToString
public class Role {
    @Id
    @Column(name = "role_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
