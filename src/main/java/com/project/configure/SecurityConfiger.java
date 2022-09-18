package com.project.configure;

import com.project.filter.JwtRequestFilter;
import com.project.securityService.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
public class SecurityConfiger extends WebSecurityConfigurerAdapter {
	@Autowired
	private UserDetailsServiceImpl myUserDetailsService;
	@Autowired
	private JwtRequestFilter jwtRequestFilter;

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(myUserDetailsService);
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return NoOpPasswordEncoder.getInstance();
	}

	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.cors().and()
				.csrf().disable().authorizeRequests()
				.antMatchers("/login").permitAll()
				.antMatchers("/register").permitAll()
				.antMatchers("/send-pin").permitAll()
				.antMatchers("/admin*").hasAnyAuthority("ADMIN_ROLE")
				.antMatchers("/users*").hasAnyAuthority("ADMIN_ROLE","USER_ROLE")
				.antMatchers("/clients").hasAnyAuthority("ADMIN_ROLE","USER_ROLE", "CLIENT_ROLE")
				.anyRequest()
				.authenticated().and()
				.sessionManagement().sessionCreationPolicy((SessionCreationPolicy.STATELESS));
		// da ne ide authorisation po Sessiji većš po pozivu
		http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
	}

}
