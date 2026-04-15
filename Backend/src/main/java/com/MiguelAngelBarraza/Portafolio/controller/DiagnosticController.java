package com.MiguelAngelBarraza.Portafolio.controller;

import java.net.InetAddress;
import java.net.Socket;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/diagnostic")
public class DiagnosticController {

    @GetMapping("/network-test")
    public String testNetworkConnectivity() {
        StringBuilder result = new StringBuilder();
        
        // Test 1: DNS Resolution
        try {
            InetAddress address = InetAddress.getByName("db.sfxypsmjlyqqiwobgpdt.supabase.co");
            result.append("✓ DNS Resolution: SUCCESS - ").append(address.getHostAddress()).append("\n");
        } catch (Exception e) {
            result.append("✗ DNS Resolution: FAILED - ").append(e.getMessage()).append("\n");
        }
        
        // Test 2: Socket connection to port 6543
        try (Socket socket = new Socket()) {
            socket.connect(new java.net.InetSocketAddress("db.sfxypsmjlyqqiwobgpdt.supabase.co", 6543), 5000);
            result.append("✓ Socket Connection (6543): SUCCESS\n");
        } catch (Exception e) {
            result.append("✗ Socket Connection (6543): FAILED - ").append(e.getMessage()).append("\n");
        }
        
        // Test 3: Socket connection to port 5432 (for comparison)
        try (Socket socket = new Socket()) {
            socket.connect(new java.net.InetSocketAddress("db.sfxypsmjlyqqiwobgpdt.supabase.co", 5432), 5000);
            result.append("✓ Socket Connection (5432): SUCCESS\n");
        } catch (Exception e) {
            result.append("✗ Socket Connection (5432): FAILED - ").append(e.getMessage()).append("\n");
        }
        
        return result.toString();
    }
}
