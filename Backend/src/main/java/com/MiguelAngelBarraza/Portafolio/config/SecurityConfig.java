package com.MiguelAngelBarraza.Portafolio.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/", "/about", "/proyecto/**", "/css/**", "/js/**", "/images/**", "/login", "/api/**", "/health", "/db-connection-test").permitAll()
                .anyRequest().authenticated()
            )
            .formLogin(form -> form
                .loginPage("/login")
                .permitAll()
            )
            .logout(logout -> logout.permitAll())
            .csrf(csrf -> csrf
                .ignoringRequestMatchers("/api/**", "/login")
            )
            .sessionManagement(session -> session
                .sessionFixationProtection(org.springframework.security.config.Customizer.withDefaults())
            );

        return http.build();
    }
}

