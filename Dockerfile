# ใช้ Node image
FROM node:20

# สร้างโฟลเดอร์ทำงานใน container
WORKDIR /app

# ก๊อปไฟล์ package.json + lock มาติดตั้ง
COPY package*.json ./
RUN npm install

# ก๊อปโค้ดทั้งหมด
COPY . .

# Build TypeScript → JS
RUN npm run build

# รัน Nest app
CMD ["node", "dist/main"]
