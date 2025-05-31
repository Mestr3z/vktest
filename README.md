# Менеджер записей (React + TypeScript)

Небольшое демо-приложение для управления записями:  
- Таблица с «бесконечным» скроллом (Infinite Loader + React Window).  
- Форма создания новой записи (минимум 5 полей) с валидацией (Zod + React Hook Form).  
- Данные хранятся в mock-API на основе JSON Server.  
- React Query используется для загрузки, кэширования и «invalidate» запросов.  
- Тесты покрывают сетевые запросы и асинхронные операции (Jest + Testing Library).

---

## Технологии

- **React 19 + TypeScript**  
- **React Query (@tanstack/react-query)** — загрузка/кэширование async-запросов, инвалидация после создания  
- **React Hook Form + Zod** — удобная форма с валидацией «на лету»  
- **Material-UI (MUI v5)** — готовые стилизованные компоненты для быстрого UI  
- **react-window + react-window-infinite-loader** — виртуализация строк таблицы и динамическая подгрузка  
- **json-server** — простое mock-API на основе `db.json`  
- **Jest + @testing-library/react** — написаны тесты для хука и формы, включая сетевые запросы  

---

##  Быстрый старт

```bash
git clone https://github.com/Mestr3z/vktest.git
cd vktest
npm install
npm run serve-api
npm start
npm test