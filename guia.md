## Instalación

Clonar el proyecto e instalar las dependencias
```
$ git clone https://github.com/JoelAlexanderTrinidad/Grupo_10_PixelShop.git
$ cd Grupo_10_PixelShop
$ npm install

```
Crear el arhivo <code>.env</code> y darle valor a las variables de entorno según corresponda.
```
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=pixelshop_db
DB_PORT=3306
DB_HOST=127.0.0.1

```
## Base de datos
***
### Crear la base de datos con **migraciones**
Es necesario tener instalado [sequelize-cli](https://www.npmjs.com/package/sequelize-cli)
```
$ npm install --save-dev sequelize-cli
```
Crear la base de datos
```
$ sequelize db:create
```
Correr migraciones y seeders
```
$ sequelize db:migrate
$ sequelize db:seed:all
```