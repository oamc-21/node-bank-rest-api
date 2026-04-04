
# Node.js Bank API

Hola! 
Esta es una API con sentido bancario, lo hice a manera de fortalecer mis conocimientos y aprender mejores practicas en desarrollo backend.
Consegui que este pequeño sistema realizara gestion de cuentas y movimientos financieros usando node.js y express, aprendiendo y usando a la vez una arquitectura MVC.

## Características

- Gestion de usuarios: Registro y eliminacion de clientes.
- Operaciones: Depositos y retiros con validaciones de saldo.
- Historial estructurado: Cada movimiento se guarda como un objeto con tipo, monto y timestamps (ISO 8601)
- Seguridad: uso de variables de entorno, y middlewares de protección.
- Monitoreo: Middleware personalizados que registra cada peticion en consola en tiempo real



## Tecnologías usadas

* Node.js y Express
* Dotenv
* File system
* Bruno (Pruebas API)



## Rutas principales





| Ruta | Método     | Descripcion                |
| :-------- | :------- | :------------------------- |
| `/api/historial/:nombre` | `GET` | Ver saldo y movimientos de un cliente. |

| Ruta | Método     | Descripcion                |
| :-------- | :------- | :------------------------- |
| `/api/historial/:nombre` | `POST` | Crear un nuevo cliente en el sistema. |

| Ruta | Método     | Descripcion                |
| :-------- | :------- | :------------------------- |
| `/api/depositar` | `POST` | Ingresar dinero a una cuenta. |

| Ruta | Método     | Descripcion                |
| :-------- | :------- | :------------------------- |
| `/api/retirar` | `POST` | Sacar dinero (valida si hay saldo suficiente). |

| Ruta | Método     | Descripcion                |
| :-------- | :------- | :------------------------- |
| `/api/eliminar` | `DELETE` | Dar de baja una cuenta. |

## Roadmap

- Estoy trabajando en llevarlo con una base de datos completa.

- Eventualmente crear una interfaz para que sea atractiva visualmente.

