package com.MiguelAngelBarraza.Portafolio.config;

import org.springframework.stereotype.Component;
import jakarta.annotation.PostConstruct;

@Component
public class IPv4PreferenceConfig {
    
    @PostConstruct
    public void preferIPv4() {
        System.setProperty("java.net.preferIPv4Stack", "true");
        System.out.println("✓ IPv4 preference enabled: java.net.preferIPv4Stack=true");
    }
}
