# 1. Yandex praktikum diploma-front 
Andrey Korlyakov  

## 2. Актуальная версия  
V 1.0.0  

## 3. Описание спринта  
NewsExplorer - небольшой проект, который позволяет искать актуальные новости и сохранять их.  
На данный момент реализовано:
 - Сверстан макет  
 - Макет адаптирован под популярные разрешения
 - Реализована авторизация
 - Реализована возможность сохранять статьи
 - Реазизована возможность удалять статьи

## 4. Установка  
`git clone https://github.com/yletfull/news-explorer-frontend news-explorer-frontend`  
`npm i`  

## 5. Подключенные библиотеки  
Для работы с кодом:  

    babel-loader,  
    babel-cli,  
    babel-core,  
    babel-preset-env,  
    core-js,  
    mini-css-extract-plugin,  
    optimize-css-assets-webpack-plugin,  
    css-loader,  
    html-webpack-plugin,  
    postcss-loader,  
    autoprefixer,  
    cssnano.  


Для работы вебпака:  

    gh-pages,  
    webpack-md5-hash,  
    webpack,  
    webpack-cli,  
    webpack-dev-server,  
    path.  


Для работы с изображениями:  

    file-loader,  
    image-webpack-loader.  

## 6. Github pages  
[gh-pages](https://yletfull.github.io/news-explorer-frontend/)  
[Облачный сервер](https://diploma.gq/)


## 7. Docker-compose
``` 
version: '3.8'

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "80:80"
    depends_on:
      - backend
    env_file:
      - .env

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    environment:
      - NODE_ENV=production
      - DB_URL=mongodb://mongodb:27017/mestodb
    ports:
      - "3000:3000"
    depends_on:
      - mongodb

  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```