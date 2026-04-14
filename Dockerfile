# Stage 1: Build
FROM maven:3.9-eclipse-temurin-21 AS builder
WORKDIR /app
COPY Backend/pom.xml ./Backend/
COPY Backend/src ./Backend/src
WORKDIR /app/Backend
RUN mvn dependency:go-offline
RUN mvn clean package -DskipTests

# Stage 2: Runtime
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=builder /app/Backend/target/Portafolio-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8081
CMD ["java", "-jar", "app.jar", "--spring.profiles.active=prod"]
