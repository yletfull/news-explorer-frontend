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

# Проверяем наличие директории dist и копируем ее внутрь контейнера
RUN ls -la
RUN ls -la dist
RUN ls -la dist/*
COPY ./dist /app/dist

# Команда для запуска приложения
CMD ["npm", "run", "start"]

