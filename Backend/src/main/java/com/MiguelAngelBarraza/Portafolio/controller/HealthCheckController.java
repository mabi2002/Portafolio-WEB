package com.MiguelAngelBarraza.Portafolio.controller;

import java.sql.Connection;
import java.sql.DriverManager;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthCheckController {

	@Value("${spring.datasource.url}")
	private String datasourceUrl;

	@Value("${spring.datasource.username}")
	private String username;

	@Value("${spring.datasource.password}")
	private String password;

	@GetMapping("/api/health")
	public ResponseEntity<Map<String, Object>> health() {
		Map<String, Object> response = new HashMap<>();
		response.put("status", "UP");
		response.put("timestamp", System.currentTimeMillis());
		return ResponseEntity.ok(response);
	}

	@GetMapping("/api/db-connection-test")
	public ResponseEntity<Map<String, Object>> testDatabaseConnection() {
		Map<String, Object> response = new HashMap<>();

		try {
			response.put("datasource_url", datasourceUrl);
			response.put("datasource_username", username);
			response.put("attempting_connection", true);

			// Attempt direct connection
			Class.forName("org.postgresql.Driver");
			try (Connection conn = DriverManager.getConnection(datasourceUrl, username, password)) {
				response.put("connection_status", "SUCCESS");
				response.put("database_version", conn.getMetaData().getDatabaseVersion());
				response.put("jdbc_url", conn.getMetaData().getURL());
			} catch (Exception connEx) {
				response.put("connection_status", "FAILED");
				response.put("error", connEx.getMessage());
				response.put("error_class", connEx.getClass().getSimpleName());
				response.put("root_cause", connEx.getCause() != null ? connEx.getCause().getMessage() : null);
				return ResponseEntity.status(500).body(response);
			}

			return ResponseEntity.ok(response);
		} catch (Exception e) {
			response.put("status", "ERROR");
			response.put("error", e.getMessage());
			return ResponseEntity.status(500).body(response);
		}
	}
}
