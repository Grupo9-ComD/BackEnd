# TechRetail Solutions - Backend B2B 🛒

Este repositorio contiene el código fuente del backend para la plataforma de e-commerce autogestionada enfocada en el entorno B2B **TechRetail Solutions** . El sistema permite a los comercios crear sus propias tiendas online, integrando el registro de transacciones, logística y simulaciones de pagos .

## 👥 Equipo de Desarrollo: DeveloPET Friendly (Grupo 9)
*   **Guillermo :** Diseño general de arquitectura, configuración del servidor (Express) y documentación .
*   **Mailén :** Desarrollo de módulos Comercios y Tiendas (Modelos, Controladores y Rutas) .
*   **Verónica :** Desarrollo de módulos Logística y Transacciones con validaciones cruzadas .
*   **Braian :** Desarrollo del módulo Estadísticas y motor de plantillas (Pug) .

---

## 🚀 Lo que está desarrollado (Estado Actual)

Actualmente, el proyecto cuenta con un backend 100% funcional estructurado bajo el **Patrón de Diseño MVC** (Modelos, Vistas y Controladores)  Todo el código está modernizado utilizando **ES Modules** (`import`/`export`) y maneja procesos asíncronos mediante promesas y `async/await`.

### 📦 Módulos y Funcionalidades Principales
Todos los módulos implementan un CRUD completo (Alta, Lectura, Modificación y Baja Lógica) aplicando Programación Orientada a Objetos (POO) :

*   **Comercios y Tiendas:** Gestión de clientes B2B y sus sucursales virtuales, con validación de dependencias (no se puede crear una tienda si el comercio no existe o está inactivo) .
*   **Transacciones (Ventas):** Procesamiento de ventas con cálculo automático del *Split de pagos* (comisiones) y verificación de conciliación financiera cruzando datos con la pasarela de pagos .
*   **Logística:** Generación de envíos validados contra transacciones existentes .
*   **Usuarios:** Gestión de administradores del sistema .
*   **Estadísticas:** Generación de Reporte "Hot Sale" calculando en tiempo real el volumen de ventas, la ganancia de la plataforma y la tasa de error .
*   **Vistas (Frontend):** Interfaz gráfica renderizada del lado del servidor utilizando el motor de plantillas **Pug** .

### 💾 Persistencia de Datos
En esta etapa, la persistencia se maneja simulando una base de datos a través de la lectura y escritura asíncrona de archivos **JSON** ubicados en la carpeta `/data/`, utilizando el módulo `fs/promises` nativo de Node.js .

---

## 🚧 Lo que falta (Próximos Módulos - 2° Entrega)


1.  **Base de Datos Real:** Reemplazar el sistema de archivos JSON por la integración de una base de datos NoSQL utilizando **MongoDB** .
   
## 🚧 Lo que falta (Próximos Módulos - 3° Entrega)
2.  **Autenticación y Seguridad:** Implementación de gestión de usuarios, inicio de sesión, manejo de cookies/sesiones y protección de rutas .

---

## 🛠️ Instrucciones de Instalación y Ejecución

Para levantar este proyecto en un entorno de desarrollo local:

1. Clona este repositorio.
2. Abre la terminal posicionado en la carpeta raíz del proyecto y ejecuta el siguiente comando para instalar las dependencias:
      npm install
   
Una vez finalizada la instalación, levanta el servidor de desarrollo (con recarga automática) ejecutando:
El servidor estará corriendo en http://localhost:8000. Vistas desde tu navegador o probar los endpoints de la API (ej. /comercios, /tiendas, /estadisticas) utilizando herramientas como Thunder Client o Postman.
