## Доступные скрипты

В директории проекта запустить скрипт:

### `npm start`

## Текст задания

Необходимо реализовать фронтенд часть для системы авторизации/регистрации

1. Страницу авторизации
2. Страницу восстановления пароля
3. Страницу регистрации
4. Страницу «Личный кабинет»

### 1. Страница авторизации

Содержит форму с полями:
• Телефон
• Пароль
• Запомнить меня – галочка
• Ссылки «Забыли пароль?» и «Регистрация»

При успешной авторизации - переходим на страницу «Личный кабинет»
При неуспешной авторизации - выводим сообщение об ошибки

### 2. Страница восстановления пароля

Содержит форму с полями:
• Шаг 1:
o Телефон
• Шаг 2:
o Код из СМС
Ссылки «Вспомнил пароль!» и «Регистрация»

Реализовать используемый на многих сайтах стандартный алгоритм восстановления через
СМС

### 3. Страница регистрации

Содержит форму с полями:
• Имя
• Телефон
• Пароль
• Аватар - загрузка файла изображения (необязательно, но будет большим плюсом)
Ссылку «Авторизация»

При успешной регистрации - переходим на страницу «Личный кабинет»
При неуспешной регистрации - выводим сообщение об ошибках

### 4. Страница личный кабинет

Выводить приветствие «Здравствуйте, Имя!» и кнопку «Выход»

### Будет плюсом:

• Маска телефона
• Галочка «посмотреть пароль»
• Блокировка повторной отправки кода смс (Отправить код повторно, через 20 секунд)
• Сохранение данных форм и авторизации - например: если пользователь ввел телефон
в форме, после перезагрузки он должен сохранится
• Защита от повторной отправки формы если запрос еще не завершен
