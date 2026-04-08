# Core-Banking API: Gestión de Transferencias

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

RESTful API robusta diseñada para gestionar operaciones bancarias. Este proyecto implementa soluciones avanzadas para garantizar la **consistencia de datos**, el manejo de **concurrencia** y la **seguridad perimetral** en cada movimiento financiero.

---

## Retos Técnicos Resueltos

### 1. Garantía de Integridad (Transacciones ACID) ⚖️
En el sector financiero, el dinero no puede "desaparecer". Utilicé **Mongoose Sessions** para asegurar que las transferencias sean atómicas:
> *Si el emisor tiene saldo pero el proceso de acreditación al receptor falla, el sistema realiza un **rollback** automático. El flujo garantiza que el débito y el crédito ocurran como una sola unidad de trabajo indivisible.*

### 2. Seguridad y Protección de Identidad (Auth) 🔐
Implementé un sistema de autenticación basado en **JSON Web Tokens (JWT)** y encriptación de grado industrial:
* **Bcryptjs:** Las contraseñas nunca se almacenan en texto plano; se utiliza un proceso de *hashing* con *salts* antes de persistir en la base de datos mediante hooks de Mongoose.
* **Protección de Rutas:** Middleware personalizado para la verificación de tokens, asegurando que solo el propietario de la cuenta pueda realizar retiros o consultar movimientos sensibles.

### 3. Prevención de Duplicados (Idempotencia) 🛡️
Lógica de `idempotencia_key` en transacciones críticas. Esto garantiza que si un error de red provoca un reintento de envío, el sistema detecte la transacción procesada y **evite cargos dobles**, protegiendo el patrimonio del cliente.

### 4. Arquitectura Limpia (Patrón MSC) 🏗️
Organización bajo el patrón **Model-Service-Controller**, separando responsabilidades para facilitar el mantenimiento:
* **Models:** Esquemas con validaciones estrictas y middlewares de ciclo de vida (`pre-save`) optimizados para funciones asíncronas.
* **Services:** El "cerebro" de la aplicación donde reside la lógica de negocio, el manejo de sesiones y las reglas financieras.
* **Controllers:** Orquestación de peticiones HTTP y manejo estandarizado de respuestas.

---

## Endpoints del Sistema

| Método | Ruta | Descripción | Auth |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/registrar` | Crea un nuevo cliente con password encriptada. | No |
| `POST` | `/api/login` | Autenticación y generación de Token JWT. | No |
| `POST` | `/api/depositar` | Depósito de fondos en cuenta (abierto a terceros). | No |
| `POST` | `/api/retirar` | Realiza un retiro de efectivo validando saldo. | **Sí (JWT)** |
| `POST` | `/api/transferencia` | Envío de dinero con seguridad ACID e Idempotencia. | **Sí (JWT)** |
| `GET` | `/api/movimientos` | Historial inteligente basado en el token del usuario. | **Sí (JWT)** |
| `DELETE` | `/api/eliminar/:id` | Elimina un registro del sistema. | No |
| `GET` | `/docs` | Documentación Interactiva (Scalar). | No |

---

## Stack Tecnológico

* **Runtime:** Node.js
* **Framework:** Express.js
* **DB:** MongoDB Atlas con Mongoose ODM
* **Auth:** JSON Web Tokens (JWT) & Bcryptjs
* **Documentación:** Scalar API Reference
* **Entorno:** Dotenv para gestión segura de credenciales

---

## Instalación y Configuración

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/oamc-21/node-bank-rest-api.git](https://github.com/oamc-21/node-bank-rest-api.git)
    ```
2.  **Instalar dependencias:**
    ```bash
    npm install
    ```
3.  **Configurar Variables de Entorno:**
    Crea un archivo `.env` en la raíz del proyecto:
    ```env
    PORT=8383
    MONGO_URI=tu_cadena_de_conexion_a_mongodb
    JWT_SECRET=tu_clave_secreta_para_tokens
    ```
4.  **Iniciar el Servidor:**
    ```bash
    npm start
    ```

---

## Documentación de la API
Una vez encendido el servidor, puedes visitar http://localhost:3000/docs para acceder a la referencia completa de la API. La documentación Scalar permite probar el flujo de autenticación y las operaciones bancarias directamente desde el navegador de forma interactiva.

---
*Desarrollado con enfoque en ingeniería de software y mejores prácticas de Backend por [Ottoniel Morraz](https://github.com/oamc-21).*