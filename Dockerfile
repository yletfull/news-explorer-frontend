# Используем официальный образ Node.js на базе Ubuntu
FROM node:14

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json (если есть)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь остальной исходный код в рабочую директорию
COPY . .

# Собираем проект
RUN npm run build

# Копируем содержимое папки dist внутрь контейнера
COPY dist /app/dist

# Экспонируем порт, если это необходимо (для dev-сервера)
# EXPOSE 8080

# Команда для запуска приложения
CMD ["npm", "run", "start"]
