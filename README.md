# 🧪 Desafío Técnico – Desarrollador/a Full Stack Junior / Semi-Senior

## Herraminetas usadas:
 - NestJS version 10.4.9
 - Node.JS version 20.18
 - Base de datos PostgreSQL version 17.50
 - Docker version 28.0.1
 - Docker Compose version 2.29.2

## Intrucciones de ejecucion
### 1. Contenedor de Base de datos
  Es importante destacar que para realizar este proceso debes de iniciar el daemon de Docker, para iniciarlo debes de iniciar una terminal de WLS, si estas en Windows o una simple terminal si estas en Linux, y ejecutar el comando: <br/>
  
  >sudo systemctl start docker

  <br/>
  Tambien puedes iniciar la aplicación "Docker Desktop", si la tienes instalada.<br/>
  Ya con el daemon de docker iniciado, 
  en la carpta del proyecto se debe de abrir una terminal de comandos o CMD y ejecutar el sigiente comando <br/>
  `docker compose up`<br/>
  esto ejecutara el archivo "docker-compose.yml" en la raiz del proyecto, creando asi un contenedor con la base de datos montada en localhost.<br/><br/>
  Puedes administrar el contenedor a traves de la interfaz de Docker Desktop o mediante la terminal, con los siguientes comandos:<br/>
  
  - `docker ps -a` : ver los contenedores disponibles.
  - `docker start [nombre del contenedor]` : iniciar uno o mas contenedores.
  - `docker stop [nombre del contenedor]` : detener uno o mas contenedores.

### 2. Comprobar la base de datos. (opcional)
  Ya con la descarga completada, se pueden realizar pruebas a la base de datos levantada en el servidor local, en el puerto 5432 (`http://localhost:5432`), existen distintas herramientas para realizar estas pruebas, todas estas pediran credenciales, usuario y nombre de la base de datos; dichos datos estan presentes en el archivo ejecutado en el paso anterior.

### 3. Levantar la API
- #### Instalacion de dependencias
  En otra consola de comandos abierta en la misma carpeta del proyecto, se debe ejecutar el siguiente comando:  <br/>
  >npm i<br/>

  Esto hará que se descarguen e instalen todas las dependencias necesarias para el correcto funcionamiento del sistema, las cuales se indican en archivo "package.json", en el apartado de "dependencies" y "devDependencies", con la siguiente nomenclatura:<br/>
    `{"Nombre de la dependencia": "version"}`
- #### Ejecución del proyecto
  Para iniciar el servidor con la API, se debe de ejecutar en la terminal el siguiente comando:<br/>
  >`npm run start` o `npm run start:dev`<br/>

  Esto mostrará en la terminal una serie de mensajes referentes al sistema, como rutas disponibles para solicitud HTTP.
- #### Carga de datos
  Esta API carga de forma automatica a la base de datos, la informacion necesaria para realizar las pruebas a de solicitud, como la creación de la tabla a trabajar y sus datos correspondientes.<br/>
  Esto lo realiza mediante un archivo "seed.sql" en la raiz del proyecto, el cual se ejecuta al momento de iniciar el servidor de la API.<br/>
  Para la conexión a la base de datos, el sistema utiliza variables de entorno de en un arcivo .env en la raiz del proyecto, estas variables, corresponden a los datos necesarios para establecer la conexión, como servidor, puerto, usuario, credencial y tabla.

## Pruebas de endpoints
###
  Al iniciar el proyecto, en la terminal se nos muestran las distintas rutas disponibles a partir de la url raiz (http://localhost:3000), las rutas disponibles en este caso son las siguientes:
- `http://localhost:3000/` mediante metodo GET
- `http://localhost:3000/categoria/` mediante metodo GET
- `http://localhost:3000/categoria/[id]` mediante metodo GET

Para realizar las pruebas a estos endpoints, la herramienta mas conocida es Postman, la cual ofrece una amigable interfaz de usuario para realizar estas solicitudes.
<br/>
La primera ruta `http://localhost:3000/`, corresponde a un endpoint creado por el propio framework, el cual entrega un texto de "Hello World!".<br/>
El endpoint que importa es `http://localhost:3000/categoria/[id]`, puesto que requiere un parametro para retornar resultados especificos. Su uso es bastante simple, el parametro "id", corresponde al dato identificador de cada fila en la tabla de la base de datos con la que se esta trabajando.
<table>
  <tr>
    <th>id (identificador)</th>
    <th>categoria</th>
  </tr>
  <tr>
    <td>1</td>
    <td>Neumáticos</td>
  </tr>
  <tr>
    <td>2</td>
    <td>Chasis</td>
  </tr>
  <tr>
    <td>3</td>
    <td>Motor</td>
  </tr>
  <tr>
    <td>4</td>
    <td>Accesorios</td>
  </tr>
</table>

Por ende, si por ejemplo accedemos a la URL "http://localhost:3000/categoria/3", obtenemos la Fila correspondiente al id numero 3, en formato JSON.<br/>
  `{"id": 3,"nombre": "Motor"}`<br/>
  Si se accede a la URL sin definir un parametro, el sistema entregara una lista con todas las filas de la tabla.<br/>
  `[{"id": 1,"nombre": "Neumáticos"},{"id": 2,"nombre": "Chasis"}, ...]`
  <br/>
  Otra manera de porbar los endpoints, es mediante cURL, que consiste en utilizar el comando `curl` en la terminal de comandos, la sintaxis es la siguiente:<br/>

>curl [url]

<br/>En este caso el comando completo sería: <br/>

>curl http://localhost:3000/categoria/3 <br/>

Retornando el mismo resultado visto anteriormente.

## Archivos importantes

Entre los archivos mas importantes para el funcionamiento de este sistema se encuantran los siguentes

Comenzando por la carpeta raiz del proyecto, se destacan:

- __.env__: contiene la informacion necesaria para la conexión a la base de datos, como usuario y credenciales para la misma.
- __docker-compose.yml__: este archivo contiene informacion necesaria para crear el contenedor de Docker donde se levantara la base de datos con la que trabajará el proyecto.
- __seed.sql__: lleva instrucciones para la correcta carga de datos a la base de datos.
- __src/__: corresponde a la carpeta en donde se almacena el codigo fuente editable del sistema, como modelos de datos, controladores y funcionalidades.

A continuación, se explicaran los archivos mas relevantes del directorio "src/"

- __app.module.ts__: Es el archivo principal del sistema, desde el cual se importa el resto de componentes del sistema.
- __app.controller.ts__: Este archivo, contiene las rutas HTTP accesibles desde la URL raiz (http://localhost:3000/).
- __app.service.ts__: Contiene las funcionalidades que se ejecutan al acceder a su correspondiente url.
- __database/__: En esta carpeta, se encuentra todo el código referente a la conexón del sistema con la base de datos.
- __categories/__: Hace referencia a la entidad con la que el sistema trabaja desde la base de datos, cuya tabla lleva por nombre "category", aqui se encuentra el código referente, tanto al manejo de los datos, como de los endpoints relacionados a dicha tabla.

Dentro de la carpeta "database/", se encuentran los siguientes archivos.

- __database.module.ts__: Este archivo, se encarga se establecer la conexión con la base de datos, utilizando la información almacenada en el archivo ".env", descrito anteriormente.
- __seeder/seeder.service.ts__: Este archivo, permite la carga automatica de los datos predefinidos en el archivo "seed.sql", hacia la base de datos, de esta forma se evita cargar los datos de forma manual.

Por último, se explicarán los archivos mas importantes en la carpeta "categories/"

- __categories.controller.ts__, __categories.module.ts__ y __categories.service.ts__: Estos tres archivos poseen las misma funcion que los archivos "app.controller.ts", "app.module.ts" y "app.servce.ts", explicados anteriormente; con la diferencia de que sus endpoints se solo se acceden desde una ruta adicional (http://localhost:3000/categorias/).

- __entities/__: En este directorio se define la entidad de la tabla correspondiente como un objeto, permitiendo el mejor manejo de la entidad dentro del sistema y evitando asi, llamadas inecesarias a la base de datos.