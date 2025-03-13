# Онлайн-магазин с админ-панелью и чатом

Это проект онлайн-магазина с функциональностью админ-панели и чатом между клиентом и администратором. Он состоит из двух серверов (клиентский и админский), а также реализует WebSocket-связь для чата.

## Описание

### **Клиентская панель**
- Отображает карточки товаров, получаемые из JSON-файла.
- Реализована фильтрация карточек товаров.
- Реализован чат для общения с администратором.

### **Админская панель**
- Возможность добавлять, редактировать и удалять товары.
- Возможность общаться с клиентами через чат.

### **Технологии**
- Node.js
- WebSocket
- HTML, CSS
- JavaScript

## Установка

### Шаги для локального запуска

1. **Клонируйте репозиторий:**

    Откройте терминал и выполните следующую команду:
    
    git clone https://github.com/Soffffan/Practice3_4.git


3. **Перейдите в папку проекта:**

    
    cd Practice3_4
   

3. **Установите зависимости для серверов:**

    Внутри каждой из папок (`client`, `admin`, и `websocket`) нужно установить зависимости. Для этого выполните команды:

    Для клиента:
    
```bash
    cd client
    npm install
    cd ..
```   

#### Для админской панели:
    
```bash
    cd admin
    npm install
    cd ..
```

    Для WebSocket-сервера:
    

    cd websocket
    npm install
    cd .. 

4. **Запустите сервер WebSocket:**

    Для работы WebSocket-сервера (чата) нужно запустить сервер, который будет слушать на порту 4000:
    

    cd websocket
    node server.js
   

5. **Запустите сервер клиента:**

    Для клиента (пользователя магазина):
    

    cd client
    node server.js

   
7. **Запустите сервер админа:**

    Для админской панели:
    
    cd admin
    node server.js
   

7. **Откройте браузер и перейдите по следующим ссылкам:**

    - [Клиентская панель](http://localhost:3000)
    - [Админская панель](http://localhost:8080)

### Использование

1. **Клиентская панель:**
    - На главной странице клиента отображаются карточки товаров.
    - Пользователь может выбрать, какие поля показывать (например, название, описание или цену).
    - Есть возможность отправить сообщение через чат с администратором.

2. **Админская панель:**
    - Админ может добавлять товары, редактировать их и удалять.
    - При добавлении товара автоматически генерируется уникальный ID, который увеличивается с каждым новым товаром.
    - Админ может общаться с клиентом через чат.

### Чат
- Клиенты и администраторы могут отправлять сообщения друг другу через WebSocket-сервер, который работает на порту 4000.
