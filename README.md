# dream_fabric

1. При первой инициализации необходимо поставить node.js (https://nodejs.org/en/)

2. Далее необходимо запустить команду npm install из папки проекта
  Эта команда установит все пакеты необходимые для разработки в папку node_modules

3. Т.к. в качестве менеджера сборки используется gulp, ему необходима глобальная установка. С помощью прав администратора выполить команду npm install gulp -g

4. Ну и собственно для запуска сервера необходимо выполнить команду gulp
  Эта команда запустит задачу по умолчанию для gulp. Она соберёт весь проект из исходников в папку build и запустит задачу для просмотра изменений в файлах. При изменениях она будет автоматические презапускать сервер (если изменения произошли на серверной стороне) и пересборку клиентских файлов если изменения произошли на клиентской стороне
