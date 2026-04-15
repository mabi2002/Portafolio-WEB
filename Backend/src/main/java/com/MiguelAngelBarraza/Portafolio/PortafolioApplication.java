package com.MiguelAngelBarraza.Portafolio;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PortafolioApplication {

	public static void main(String[] args) {
		// Force IPv4 before Spring Boot initializes
		System.setProperty("java.net.preferIPv4Stack", "true");
		System.setProperty("java.net.preferIPv6Addresses", "false");
		System.out.println("✓ IPv4 preference enforced at JVM startup");
		
		SpringApplication.run(PortafolioApplication.class, args);
	}

}
