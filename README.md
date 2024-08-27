# EFTS Mobile - Backend
### Práctica profesional - Gestión de la información - UNLZ

Este repositorio contiene el backend de **EFTS Mobile**, una aplicación móvil para la enseñanza de inglés técnico de aviación, enfocada en pilotos y personal aeronáutico. La aplicación permite a los usuarios progresar a través de módulos, unidades y niveles, realizando ejercicios interactivos de listening, speaking y writing.

## Requisitos

- **Node.js** >= 16.x
- **MongoDB**
- **npm** o **yarn** para la gestión de paquetes

## Instalación

1. Clona el repositorio:
    ```bash
    git clone https://github.com/tu-usuario/efts-mobile-backend.git
    cd efts-mobile-backend
    ```

2. Instala las dependencias:
    ```bash
    npm install
    # o
    yarn install
    ```

3. Crea un archivo `.env` en el directorio raíz basado en el archivo `.env.example`. Configura las variables necesarias:
    ```
    PORT=5000
    JWT_SECRET=tu_jwt_secret
    DB_URI=mongodb://localhost/efts_mobile
    ```

4. Inicia el servidor:
    ```bash
    npm start
    # o
    yarn start
    ```

## Endpoints de la API

#### USERS
                
+ '/api/v1/auth/login'
+ '/api/v1/auth/register'

#### MODULES & UNITS
+ '/api/v1/modules'
+ '/api/v1/modules/{id}/units'
+ '/api/v1/modules/units/{id}/levels'

#### EXCERCISES
+ '/api/v1/levels/{id}/exercises'
+ '/api/v1/exercises/{id}/submit'



### In progress.
