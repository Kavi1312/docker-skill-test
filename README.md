# docker-skill-test
docker-skill-test on 19th jan


# Deploying and Running Microservices on EC2 Using Docker and Docker Compose

This document provides step-by-step instructions for setting up, deploying, and troubleshooting a Node.js microservices application using Docker and Docker Compose on an AWS EC2 instance.

---

## Prerequisites
- AWS EC2 instance with Ubuntu.
- SSH key to access the EC2 instance.
- Security Group configured to allow inbound SSH (port 22) and the necessary application ports (3000–3003).
- Git and Docker installed.

---

## Step 1: Connect to Your EC2 Instance
1. Connect to the EC2 instance via SSH:
   ```bash
   ssh -i <your-key.pem> ubuntu@<your-ec2-public-ip>
   ```

2. Update the system:
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

---

## Step 2: Install Necessary Tools

### Install Git
```bash
sudo apt install git -y
```

### Install Node.js and npm
```bash
sudo apt install nodejs -y
sudo apt install npm -y
```

### Verify Installations
```bash
node -v
npm -v
git --version
```

---

## Step 3: Install Docker and Docker Compose

### Install Docker
```bash
sudo apt install docker.io -y
sudo systemctl start docker
sudo systemctl enable docker
```

### Install Docker Compose
```bash
sudo apt install docker-compose -y
```

### Add Current User to the Docker Group
```bash
sudo usermod -aG docker $USER
```

**Note:** You need to log out and log back in for this to take effect.

---

## Step 4: Clone the Repository
1. Clone your repository:
   ```bash
   git clone https://github.com/Kavi1312/docker-skill-test.git
   ```

2. Navigate to the project directory:
   ```bash
   cd docker-skill-test
   ```

3. Verify the directory structure:
   ```bash
   ls -R
   ```
   You should see:
   ```
   docker-skill-test/
   ├── docker-compose.yml
   ├── microservices-app/
   │   ├── user-service/
   │   ├── product-service/
   │   ├── order-service/
   │   └── gateway-service/
   ```

---

## Step 5: Build and Run Microservices

### Build Each Service
```bash
docker build -t user-service ./microservices-app/user-service
docker build -t product-service ./microservices-app/product-service
docker build -t order-service ./microservices-app/order-service
docker build -t gateway-service ./microservices-app/gateway-service
```

### Run Each Service
```bash
docker run -d -p 3000:3000 --name user-service user-service
docker run -d -p 3001:3001 --name product-service product-service
docker run -d -p 3002:3002 --name order-service order-service
docker run -d -p 3003:3003 --name gateway-service gateway-service
```

### Verify Running Containers
```bash
docker ps
```

---

## Step 6: Troubleshooting

### 1. Cannot Access Application (Ports Blocked)
- Update the Security Group of your EC2 instance to allow inbound traffic to ports 3000–3003:
  - **Type**: Custom TCP Rule
  - **Protocol**: TCP
  - **Port Range**: 3000-3003
  - **Source**: `0.0.0.0/0` (for testing) or your IP address for more security.

### 2. Check Docker Logs
If any container fails to start, inspect the logs:
```bash
docker logs user-service
docker logs product-service
docker logs order-service
docker logs gateway-service
```

### 3. Check Firewall on EC2 Instance
Ensure the firewall (`ufw`) is not blocking the ports:
```bash
sudo ufw status
sudo ufw allow 3000
sudo ufw allow 3001
sudo ufw allow 3002
sudo ufw allow 3003
```

### 4. Rebuild Containers
If changes were made to the code or Dockerfiles:
```bash
docker-compose down
docker-compose up --build
```

---

## Step 7: Test Services
Test each service using the public IP of your EC2 instance:

- **User Service**: `http://<EC2_PUBLIC_IP>:3000`
- **Product Service**: `http://<EC2_PUBLIC_IP>:3001`
- **Order Service**: `http://<EC2_PUBLIC_IP>:3002`
- **Gateway Service**: `http://<EC2_PUBLIC_IP>:3003`

Or use `curl`:
```bash
curl http://<EC2_PUBLIC_IP>:3000
curl http://<EC2_PUBLIC_IP>:3001
curl http://<EC2_PUBLIC_IP>:3002
curl http://<EC2_PUBLIC_IP>:3003
```

---

## Step 8: Automate with Docker Compose

### Edit `docker-compose.yml`
Ensure `docker-compose.yml` is correctly configured:
```yaml
version: "3.8"

services:
  user-service:
    build:
      context: ./microservices-app/user-service
    ports:
      - "3000:3000"
    networks:
      - app-network

  product-service:
    build:
      context: ./microservices-app/product-service
    ports:
      - "3001:3001"
    networks:
      - app-network

  order-service:
    build:
      context: ./microservices-app/order-service
    ports:
      - "3002:3002"
    networks:
      - app-network

  gateway-service:
    build:
      context: ./microservices-app/gateway-service
    ports:
      - "3003:3003"
    depends_on:
      - user-service
      - product-service
      - order-service
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
```

### Run All Services with Docker Compose
```bash
docker-compose up --build
```

### Stop All Services
```bash
docker-compose down
```

---

## Step 9: Final Verification
1. Confirm all containers are running:
   ```bash
   docker ps
   ```

2. Test the services using their respective URLs or `curl`.

---

## Appendix: Useful Commands

### Remove All Containers
```bash
docker rm -f $(docker ps -aq)
```

### Remove All Images
```bash
docker rmi -f $(docker images -q)
```

### List Running Containers
```bash
docker ps
```

---
-- ![image](https://github.com/user-attachments/assets/6c5a46e7-bd8b-42ae-b08e-ed7d37b90d49)

This document provides all necessary steps to deploy and troubleshoot your microservices setup. Let me know if you need further assistance!

--   ![image](https://github.com/user-attachments/assets/a02838fe-68cf-493d-9d4b-63f916929c6e)

-- ![image](https://github.com/user-attachments/assets/9859c1b9-b728-405f-b689-ae799a29c585)

-- ![image](https://github.com/user-attachments/assets/750248a3-8ce7-4c9c-b69c-9673b59feee2)
-- ![image](https://github.com/user-attachments/assets/fe4ab056-facf-433d-971e-95cc495fe266)



 

 

 


 

 

 


