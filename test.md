# 🚀 Deploying a Node.js Backend on AWS EC2 (Ubuntu 22.04)

A complete, step-by-step guide for deploying any Node.js backend on an Amazon EC2 instance.  
Production-friendly, beginner-safe, and fully repeatable.

---

## 📦 1. Launch an EC2 Instance

**AMI:** Ubuntu 22.04 LTS (Jammy)  
**Instance Type:** t2.micro (Free-tier eligible)  
**Storage:** 8 GB gp2  
**Auto-assign Public IP:** Enabled  

### Security Group Rules
| Type  | Port | Source          | Purpose |
|-------|------|-----------------|---------|
| SSH   | 22   | My IP           | Connect via terminal |
| HTTP  | 80   | 0.0.0.0/0       | Web traffic |
| HTTPS | 443  | 0.0.0.0/0       | SSL traffic |
| Custom TCP | 3001 | 0.0.0.0/0 | Temporary — backend testing |

Launch and wait for **2/2 status checks**.

---

## 🔐 2. Connect to the Instance

In AWS Console:

**Instances → Select Instance → Connect → EC2 Instance Connect → Connect**

You should see:

ubuntu@ip-xx-xx-xx-xx:~$


---

## 🔧 3. Update Packages

```bash
sudo apt update && sudo apt upgrade -y

🟩 4. Install Node.js (LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node -v
npm -v

📁 5. Create or Clone Your Backend
Option A — Create manually
mkdir backend
cd backend
nano server.js


Paste your code, then:

CTRL + O → ENTER → CTRL + X

Option B — Clone from GitHub
git clone https://github.com/your-username/your-repo.git
cd your-repo

📦 6. Install Dependencies
npm install

▶️ 7. Test the Backend
node server.js


Backend should run on:

http://YOUR_PUBLIC_IP:3001/

🔥 8. Keep the App Running with PM2
sudo npm install -g pm2
pm2 start server.js
pm2 save
pm2 startup


This keeps your backend alive forever.

🌐 9. Install and Configure NGINX (Reverse Proxy)
sudo apt install nginx -y
sudo nano /etc/nginx/sites-available/default


Replace contents with:

server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}


Save and restart:

sudo nginx -t
sudo systemctl restart nginx


Your backend is now live at:

http://YOUR_PUBLIC_IP/

🔒 10. (Optional) Remove Port 3001 From Security Group

Once NGINX is working:

Remove the inbound rule for port 3001.

Your backend will ONLY be accessible through port 80 (clean and secure).

🔐 11. (Optional) Add Free HTTPS with Certbot
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx


Follow the prompts.

🎉 Deployment Complete!

Your Node.js backend is now:

Running continuously

Behind NGINX

Publicly accessible

Ready for production upgrades

🧹 Useful PM2 Commands
pm2 list
pm2 logs
pm2 restart server
pm2 stop server
pm2 delete server

🛑 To Reboot the Instance
sudo reboot


PM2 will auto-start your backend after reboot.