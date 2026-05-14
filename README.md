En este espacio nos centramos en el trabajo de taller integracion y la codificacion de nuestro proyecto que estamos llevando a cabo. Ademas nos centraremos en dejar la documentacion correspondientes y la actividad de cada integrante.

DB = POSTGRESQL

Despues se debe operar con el pgadmin4 para tener acceso a las tablas 

**Consejo:** Genere el entorno virtual **dentro del directorio en el que se encuentre system** en su manejo de archivos, es decir, **no genere el entorno virtual dentro de system**, para un mayor orden.

**Recuerde crear y utilizar el entorno virtual cada vez que avance en el proyecto, de no hacerlo, puede generar errores en el repositorio por falta de librerias, entre otros!**
Seguido de esto, ademas cada vez que agregue librerias, agreguelo al archivo ya hecho "requeriments.txt" mediante el comando: "pip freeze > requeriments.txt"
Nota: *Debe de encontrarse en la carpeta actual de requeriments.txt, de caso contrario, creara un nuevo archivo.*


## Guia del repositorio
1. Clonar el repositorio.
2. Crear entorno virtual: `python -m venv nombre-entorno`
3. Activar entorno mediante: `source directorio\activate`.
4. Instalar dependencias: `pip install -r requirements.txt`
5. Crear archivo `.env` dentro del directorio /system con tus credenciales para la base de datos. La estructura es por ejemplo: DB_NAME=miproyectodb (salto de linea) DB_USER=tuusuario (salto de linea) DB_PASSWORD=tucontra
6. Para correr migraciones: `python manage.py migrate`
7. Para correr el servidor: `python manage.py runserver`
8. **(Opcional) Cargar datos de prueba:** Para poblar la base de datos con usuarios y solicitudes de ejemplo, ejecute: `python manage.py populate_data`
   - Usuarios creados: `presi`, `vol1`, `vol2`, `abuelo1`.
   - Contraseña para todos: `pass1234`.
9. Desplegar dos terminales nuevas dentro de el entorno virtual, una sera para establecer la conexion a la base de datos y otra para visualizar la pagina.
10. Comando nuevos necesarios (por orden de apertura):
    1. Para establecer la conexion a la base de datos: cd c:\Users\bsd28\Documents\GitHub\Desarrollo-de-software\server node src/server.js
    2. Para visualizar la pagina: cd c:\Users\bsd28\Documents\GitHub\Desarrollo-de-software\client npm run dev
11. Para terminar, el localhost que te brinde el comando para visualizar la pagina se tiene que abrir. Por ejemplo: http://localhost:5173
