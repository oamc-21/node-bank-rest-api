# Core-Banking API: Gestión de Transferencias

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

RESTful API robusta diseñada para gestionar operaciones bancarias. Este proyecto implementa soluciones avanzadas para garantizar la **consistencia de datos**, el manejo de **concurrencia** y la **integridad financiera** en cada movimiento.

---

## Retos Técnicos Resueltos

### 1. Garantía de Integridad (Transacciones ACID) 
En el sector financiero, el dinero no puede "desaparecer". Utilicé **Mongoose Sessions** para asegurar que las transferencias sean atómicas:
> *Si el emisor tiene saldo pero el proceso de acreditación al receptor falla, el sistema realiza un **rollback** automático. El flujo garantiza que el débito y el crédito ocurran como una sola unidad de trabajo indivisible.*

### 2. Prevención de Duplicados (Idempotencia) 
Implementé una lógica de `idempotencia_key`. Esto garantiza que si un usuario (o un error de red) intenta procesar la misma transacción dos veces, el sistema la detecte y **no realice un cobro doble**, protegiendo el patrimonio del cliente.

### 3. Arquitectura Limpia (Patrón MSC) 
El proyecto está organizado bajo el patrón **Model-Service-Controller**, separando responsabilidades para facilitar el mantenimiento:
* **Models:** Esquemas con validaciones estrictas y tipos de datos definidos en MongoDB.
* **Services:** El "cerebro" de la aplicación donde reside la lógica de negocio y la gestión de transacciones.
* **Controllers:** Orquestación de peticiones HTTP y manejo estandarizado de respuestas.

---

## Endpoints del Sistema

| Método | Ruta | Descripción |
| :--- | :--- | :--- |
| `POST` | `/api/registrar` | Crea un nuevo cliente con saldo inicial y validación. |
| `POST` | `/api/depositar` | Realiza un depósito de fondos en una cuenta específica. |
| `POST` | `/api/retirar` | Realiza un retiro de efectivo validando saldo disponible. |
| `POST` | `/api/transferencia` | **Core:** Envío de dinero con seguridad ACID e Idempotencia. |
| `GET` | `/api/movimientos/:identificacion` | Historial inteligente (ingresos/egresos) por cédula. |
| `DELETE` | `/api/eliminar/:identificacion` | Elimina un registro de cliente del sistema. |
| `GET` | `/docs` | **Documentación Interactiva** (Swagger/Scalar). |

---

## Stack Tecnológico

* **Runtime:** Node.js
* **Framework:** Express.js
* **DB:** MongoDB Atlas con Mongoose ODM
* **Documentación:** Scalar API Reference (Swagger)
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
    PORT=3000
    MONGO_URI=tu_cadena_de_conexion_a_mongodb
    ```
4.  **Iniciar el Servidor:**
    ```bash
    npm start
    ```

---

## Documentación de la API
Una vez encendido el servidor, puedes visitar `http://localhost:3000/docs` para acceder a la referencia completa de la API. Podrás probar cada endpoint directamente desde el navegador de forma interactiva.

---
*Desarrollado con enfoque en ingeniería de software y mejores prácticas de Backend por [Ottoniel Morraz](https://github.com/oamc-21).*