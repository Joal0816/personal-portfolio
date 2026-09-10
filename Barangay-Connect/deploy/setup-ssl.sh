#!/bin/bash
# ============================================
# SSL Setup with Certbot (Let's Encrypt)
# Run after nginx is configured and DNS is pointing to this server
# ============================================

set -e

echo "=== SSL Setup ==="

# Install certbot
apt-get update && apt-get install -y certbot python3-certbot-nginx

# Get SSL certificate
certbot --nginx -d barangay-connect.joalvergs.tech --non-interactive --agree-tos --email admin@joalvergs.tech

# Auto-renewal cron job
echo "0 0,12 * * * root certbot renew --quiet" > /etc/cron.d/certbot-renew

echo "=== SSL Setup Complete ==="
echo "Site is now available at https://barangay-connect.joalvergs.tech"
