# Используем официальный образ Node.js на базе Ubuntu
FROM node:18

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json (если есть)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь остальной исходный код в рабочую директорию
COPY . .

# Сборка проекта
RUN npm run build

# Указываем порт, который будет использоваться приложением
EXPOSE 8080

# Команда для запуска приложения
CMD ["npm", "run", "dev"]
