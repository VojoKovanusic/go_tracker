package com.project;

import com.project.model.Role;
import com.project.model.User;
import com.project.repository.RoleRepository;
import com.project.repository.UserRepository;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.project.*", "com.project.controllers"})
public class Main {
	@Autowired
	UserRepository userRepository;
	@Autowired
	RoleRepository roleRepository;
	public static void main(String[] args) {
		SpringApplication.run(Main.class, args);

	}

	@Bean
	InitializingBean sendDatabase() {
		return
				() -> {
					Role role = new Role();
					role.setName("ADMIN_ROLE");
					Role role2 = new Role();
					role2.setName("USER_ROLE");
					Role role4 = new Role();
					role4.setName("CLIENT_ROLE");


				User user = new User();
					user.setAdmin(true);
					user.setFirstName("Snjeza");
					user.setLastName("Kovanusic");
					user.setUsername("65123123");
					user.setPassword("s");
					user.setEnabled(true);
					user.getRoles().add(role);
				 	roleRepository.save(role);
					roleRepository.save(role2);
					roleRepository.save(role4);
					userRepository.save(user);
					User user2 = new User();
					user2.setAdmin(true);
					user2.setFirstName("Vojo");
					user2.setLastName("Kovanusic");
					user2.setUsername("66860053");
					user2.setPassword("s");
					user2.setEnabled(true);
					user2.getRoles().add(role);
					userRepository.save(user2);

					System.out.println("Inicializacija---***********");
				};
	}
}


