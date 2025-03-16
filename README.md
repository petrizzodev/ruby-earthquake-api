# README  

# Datos Sismológicos

Este proyecto es una aplicación desarrollada en Ruby on Rails que obtiene datos sismológicos desde un feed en línea y los persiste en una base de datos SQLite. Además, ofrece API para consultar y crear comentarios sobre las características sismológicas.

## Requisitos

- **Ruby versión:** 3.2.3
- **Rails versión:** 7.1.3.2
- **Base de datos:** SQLite3 3.45.2 (viene por defecto con Ruby on Rails)

## Instalación

1. **Instala las dependencias:**
    ```bash
    bundle install
    ```

2. **Ejecuta las migraciones de la base de datos:**
    ```bash
    rails db:migrate
    ```

3. **Ejecuta la tarea para obtener datos sismológicos desde el feed y persistirlos en la base de datos:**
    ```bash
    rake features_data:fetch_data
    ```

4. **Inicia el servidor:**
    ```bash
    rails server
    ```

## Uso de las API

### Consultar Features sismológicas

Puedes consultar las Features sismológicas persistidas en la base de datos utilizando la siguiente URL:

`http://127.0.0.1:3000/api/features`

Opcionalmente, puedes agregar parámetros de consulta a la URL para filtrar los datos:

- `page`: Número de página para paginación (por defecto, 1).
- `per_page`: Número de elementos por página (por defecto, 20; máximo, 1000).
- `mag_type[]`: Filtro para el tipo de magnitud (valores posibles: `md`, `ml`, `ms`, `mw`, `me`, `mi`, `mb`, `mlg`). Se puede filtrar por más de un tipo.

**Ejemplo:**

`http://127.0.0.1:3000/api/features?page=1&per_page=20&mag_type[]=md&mag_type[]=ml`

### Crear un comentario sobre una Feature sismológica

Puedes crear un comentario sobre una Feature sismológica utilizando la siguiente URL y enviando un cuerpo JSON con el contenido del comentario:

`http://127.0.0.1:3000/api/features/1/comments`

**Ejemplo:**

```json
{"body": "This is a comment"}
```

# Client Side Aplicación React

Esta aplicación permite a los usuarios buscar, visualizar y comentar Features relacionadas con datos de terremotos.

## Características

Búsqueda: Los usuarios pueden buscar características por tipo de magnitud (ml, md, etc.) utilizando un buscador.
Visualización de Datos: Los datos de las características se muestran en tarjetas, que incluyen información detallada como ID, título, magnitud, lugar, hora y más.
Comentarios: Los usuarios pueden ver y agregar comentarios asociados con una característica específica.
Paginación: Navegación entre múltiples páginas de datos.

## Ejecuta la aplicación:
Node.js y npm.
Ejecutar el servidor de Ruby on Rails para poder consultar las API de Features.

##Instala las dependencias:

### `npm install`

## Ejecuta la aplicación:

### `npm start`
