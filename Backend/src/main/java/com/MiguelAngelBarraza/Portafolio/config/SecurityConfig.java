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
                // Permitir acceso público a rutas estáticas, API y health check
                .requestMatchers(
                    "/",
                    "/about",
                    "/proyecto/**",
                    "/css/**",
                    "/js/**",
                    "/images/**",
                    "/assets/**",
                    "/api/**",
                    "/health",
                    "/db-connection-test",
                    "/login",
                    "/error"
                ).permitAll()
                .anyRequest().authenticated()
            )
            .formLogin(form -> form
                .loginPage("/login")
                .permitAll()
            )
            .logout(logout -> logout.permitAll())
            .csrf(csrf -> csrf
                .disable() // Deshabilitar CSRF para APIs
            )
            .cors(cors -> cors.disable()); // Ya configurado en CorsConfig

        return http.build();
    }
}

