#!/bin/bash
set -e

echo "Building Backend with Maven..."
cd Backend
mvn clean package -DskipTests
cd ..

echo "Backend build complete!"
