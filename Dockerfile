# Usa una imagen ligera de Python optimizada
FROM python:3.12-slim-bookworm

# Evita que Python escriba archivos .pyc y fuerza salida de logs al stdout
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Instalar dependencias del sistema necesarias para PostgreSQL y compilación
RUN apt-get update \
    && apt-get install -y --no-install-recommends gcc libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Establecer directorio de trabajo
WORKDIR /app

# Copiar requirements y reinstalar dependencias
COPY requirements.txt /app/
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copiar el código del proyecto (la carpeta system) a /app
COPY system/ /app/

# Exponer el puerto de Gunicorn
EXPOSE 8000

# Comando para ejecutar Gunicorn usando nuestro archivo de configuración
CMD ["gunicorn", "-c", "gunicorn.conf.py", "config.wsgi:application"]
