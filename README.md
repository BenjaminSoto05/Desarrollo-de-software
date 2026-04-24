Espacio centrado en el desarrollo del proyecto de desarrollo de software, eligiendo el proyecto adulto mayor


1. Clonar el repositorio.
2. Crear entorno virtual: python -m venv nombre-entorno
3. Activar entorno mediante: source directorio\activate.
4. Instalar dependencias: pip install -r requirements.txt
5. Crear archivo .env dentro del directorio /system con tus credenciales para la base de datos. La estructura es por ejemplo: DB_NAME=miproyectodb (salto de linea) DB_USER=tuusuario (salto de linea)    DB_PASSWORD=tucontra
6. Para correr migraciones: python manage.py migrate
7. Para correr el servidor: python manage.py runserver
