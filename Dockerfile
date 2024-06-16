# Stage 1: Build Stage
# Используем официальный образ Node.js на базе Ubuntu для сборки проекта
FROM node:14 AS build

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

# Добавляем тестовый HTML файл
COPY index.html /app/dist/index.html

# Stage 2: Production Stage
# Используем официальный образ Nginx для размещения приложения
FROM nginx:alpine

# Удаляем дефолтный конфигурационный файл Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Копируем наш конфигурационный файл Nginx в контейнер
COPY nginx.conf /etc/nginx/conf.d

# Копируем собранное приложение из первой стадии в корневую директорию Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Открываем порт 80 для доступа к приложению
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
