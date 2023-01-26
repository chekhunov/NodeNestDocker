sблагодаря глобальному nest cli

nest generate module users - создание модуля

nest generate controller users

nest generate service users

nest generate module roles

nest generate controller roles

nest generate service roles

nest generate module auth

nest generate controller auth

nest generate service auth

nest generate module posts

nest generate controller posts

nest generate service posts

//controler не понадобиться потому что будет использоваться внутри других контроллеров

nest generate module files

nest generate service files

---

npm i @nestjs/config - чтоб настройки конфигурации вынести за пределы app.module

cross-env - при запуске задавать системные переменные package.json

---

swagger - для документирования

swagger-ui-express - для представления

npm i @nestjs/swagger swagger-ui-express

npm i @nestjs/jwt bcryptjs - jwt токенов и шифрование паролей

jwt.io decoder test

npm i class-validator class-transformer

чтоб генерировать случайные названия айлов для теста - npm i uuid
