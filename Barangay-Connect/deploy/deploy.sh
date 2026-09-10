#!/bin/bash
# ============================================
# Barangay Connect - VPS Deployment Script
# ============================================
# Run this on your VPS as root or with sudo
# ============================================

set -e

echo "=== Barangay Connect Deployment ==="

# 1. Install Docker if not present
if ! command -v docker &> /dev/null; then
    echo "Installing Docker..."
    curl -fsSL https://get.docker.com | sh
    systemctl enable docker
    systemctl start docker
fi

# 2. Install Docker Compose if not present
if ! command -v docker compose &> /dev/null; then
    echo "Installing Docker Compose plugin..."
    apt-get update && apt-get install -y docker-compose-plugin
fi

# 3. Install nginx if not present
if ! command -v nginx &> /dev/null; then
    echo "Installing nginx..."
    apt-get update && apt-get install -y nginx
fi

# 4. Clone or copy project
PROJECT_DIR="/opt/barangay-connect"
if [ ! -d "$PROJECT_DIR" ]; then
    echo "Project directory not found at $PROJECT_DIR"
    echo "Please copy the project to $PROJECT_DIR or update this script."
    exit 1
fi

# 5. Setup nginx config
echo "Configuring nginx..."
cp "$PROJECT_DIR/deploy/nginx-barangay-connect.conf" /etc/nginx/sites-available/barangay-connect
ln -sf /etc/nginx/sites-available/barangay-connect /etc/nginx/sites-enabled/barangay-connect
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

# 6. Start services
echo "Starting Docker containers..."
cd "$PROJECT_DIR"
docker compose up -d --build

# 7. Verify
echo ""
echo "=== Deployment Complete ==="
echo "Frontend: https://barangay-connect.joalvergs.tech"
echo "Backend API: https://barangay-connect.joalvergs.tech/api"
echo ""
echo "Check status: docker compose ps"
echo "View logs: docker compose logs -f"
