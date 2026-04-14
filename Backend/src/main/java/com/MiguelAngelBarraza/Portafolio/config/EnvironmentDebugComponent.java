package com.MiguelAngelBarraza.Portafolio.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class EnvironmentDebugComponent {

	@Value("${spring.datasource.url}")
	private String datasourceUrl;

	@Value("${spring.datasource.username}")
	private String username;

	@Value("${DB_HOST:NOT_SET}")
	private String dbHost;

	@Value("${DB_PORT:NOT_SET}")
	private String dbPort;

	@Value("${DB_NAME:NOT_SET}")
	private String dbName;

	@Value("${DB_USER:NOT_SET}")
	private String dbUser;

	@Value("${DB_PASSWORD:NOT_SET}")
	private String dbPassword;

	@EventListener(ApplicationReadyEvent.class)
	public void logEnvironmentVariables() {
		log.info("=".repeat(80));
		log.info("DATABASE CONFIGURATION DEBUG");
		log.info("=".repeat(80));
		log.info("DB_HOST: {}", dbHost);
		log.info("DB_PORT: {}", dbPort);
		log.info("DB_NAME: {}", dbName);
		log.info("DB_USER: {}", dbUser);
		log.info("DB_PASSWORD: {}***", dbPassword.length() > 0 ? dbPassword.substring(0, 1) : "empty");
		log.info("Resolved JDBC URL: {}", datasourceUrl);
		log.info("Resolved Username: {}", username);
		log.info("=".repeat(80));
	}
}
