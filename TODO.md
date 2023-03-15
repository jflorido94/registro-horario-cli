# Cliente Registro Jornadas

  

## Contenido (Esquema Archivos creados)

### Modulos - Servicios

|  					  | Estado  			         | Carpeta   |
|-------------------|---------------------------|-----------|
| Core              | Completado                |App        |
| Shared/common     | Sin Modularizar           |App        |
| Modules/pages     | Sin Modularizar           |App        |
| Layouts           | Sin Modularizar           |Core       |
| Services          | Sin Modularizar           |Shared     |
| Components        | Base                      |Core       |
| Interfaces        | Sin Modularizar           |Modules    |

### Funcionalidades

|  					        | Module      | Component.ts 		  | Component.html	 | Component.scss  | Carpeta   | Routing        |
|-------------------|-------------|-------------------|------------------|-----------------|-----------|----------------|
| Login             | N/N         | Completado        | Completado       | Provisional     |Pages      | /login         |
| Registro          | N/N         | Provisional       | Provisional      | Provisional     |Pages      | /registro      |
| Perfil / Editar   | Base        | Base              | Provisional      | Provisional     |Pages      | /user-profile  |
| Calendario Admin  | Provisional | Provisional       | Provisional      | Base            |Pages      | /calendar-admin|
| Calendario Usuar  | Base        | Base              | Base             | Base            |Pages      | /calendar-view |
| Historial         | Base        | Base              | Provisional      | Base            |Pages      | /historial     |
| Registro          | Base        | Base              | Base             | Base            |Pages      | /registro      |
|                   |             |                   |                  |                 |           |                |
| Gestion Horarios  |             |                   |                  |                 |           |                |
| Gestion Usuarios  |             |                   |                  |                 |           |                |
| Permisos          |             |                   |                  |                 |           |                |
| Estadisticas      |             |                   |                  |                 |           |                |
|                   |             |                   |                  |                 |           |                |


## Proceso - TODO list

 - [X] Auth (Login - Registro)
 - [X] Pantalla de carga (Spinner)
 - [X] Toast (Errores y info)
 - [X] Services
    - [X] Interceptores
      - [X] Errores
      - [X] Json
      - [X] Tokens (Auth)
    - [ ] Guards y roles
      - [X] Employee
      - [X] Admin
      - [X] Loged
      - [ ] Personal
      - [ ] Sistemas
      - [ ] Jefe Departamento
 - [ ] Modelo de Datos (I)
    - [ ] Centros y Departamentos
    - [X] Usuarios
    - [ ] Roles
    - [X] Registros
    - [ ] Motivos
    - [ ] Pausas y Extras
    - [ ] Jornadas y tipos
    - [ ] Calendarios
 - [ ] Funcionalidad (.ts)
    - [ ] Centros y Departamentos
    - [X] Usuarios
    - [X] Roles
    - [X] Registros
    - [ ] Motivos
    - [ ] Pausas y Extras
    - [ ] Jornadas y tipos
    - [ ] Calendarios
 - [ ] UI UX (html  y scss) 
    - [ ] Centros y Departamentos
    - [X] Usuarios
    - [X] Roles
    - [X] Registros
    - [ ] Motivos
    - [ ] Pausas y Extras
    - [ ] Jornadas y tipos
    - [X] Calendarios
