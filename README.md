## Описание

Данный проект является учебным проектом курса ЯП по созданию мессенджера.

Проект находится в разработке.

Макет проекта - https://www.figma.com/file/qXB4wvQbVQBd8SHELCv7hP/Chat_YP_ruslan?node-id=0%3A1&t=7nxdwAuIlsLqtlA5-0

Демо проекта на netlify - https://monumental-youtiao-673ea7.netlify.app

Демо проекта в докер образе - https://chat.baiso.ru

## Установка:


- `npm run start` — собирает проект при помощи webpack и раздет его через express. По умолчанию проект запускается на 3000 порту, другой порт пожно установаить через `process.env.PORT`
- `npm run build` — собирает проект при помощи webpack в папку dist
- `npm run dev` — собирает проект и запускает локально в runtime при помощи webpack
- `npm run stylelint` - проверяет проект линтером "stylelint"
- `npm run eslint` - проверяет проект линтером "eslint"
- `npm run test` - запускает тесты mocha

В проекте используется REST сервис API Yandex https://ya-praktikum.tech/api/v2/swagger и Websockets https://ya-praktikum.tech/api/v2/openapi/ws

Проект можно собрать в docker образ через команду `docker build -t mychat .`, затем запустить контейнер командой `docker run -d --name mychat --restart=always -p 8030:3000 mychat`

