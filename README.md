# Sistema de Gestión de Citas - Mantenimiento Vehicular (Full Stack)

Esta solución ha sido desarrollada como parte de una prueba técnica, implementando las tecnologías más recientes del mercado para garantizar un sistema escalable, seguro y altamente eficiente.

## Tecnologías de Vanguardia
- Backend: .NET 10.0 Web API (Última versión LTS).
- Frontend: Angular 21.0 utilizando el nuevo paradigma Zoneless (sin Zone.js) para un rendimiento superior.
- UI Framework: Angular Material 21.0 (Diseño moderno y responsivo).
- Base de Datos: Entity Framework Core In-Memory (Ideal para pruebas rápidas y portabilidad).
- Arquitectura: Vertical Slices (Funcionalidades) para un desacoplamiento total y alta cohesión.

## Requisitos para Ejecución
Para levantar este proyecto en cualquier máquina, asegúrese de tener instalado:

### 1. .NET 10 SDK
Es indispensable para compilar y ejecutar el backend.
- **Descarga:** Puede obtenerlo desde el sitio oficial de Microsoft: [dotnet.microsoft.com/download](https://dotnet.microsoft.com/download) (busque la versión .NET 10.0).
- **Verificación:** Una vez instalado, abra una terminal y ejecute:
  ```bash
  dotnet --version
  ```
  Debería obtener un resultado que comience con `10.0.x`.

### 2. Node.js y npm
Necesarios para el ecosistema de Angular.
- **Versión recomendada:** Node.js v22.0.0 o superior.
- **npm:** Incluido con Node.js.

### 3. Angular CLI (Opcional)
- Se puede instalar globalmente usando: `npm install -g @angular/cli@21`

## Instrucciones de Instalación y Lanzamiento

### 1. Clonar el repositorio
```bash
git clone https://github.com/Yariel03/ReservasApp.git
cd ReservasApp
```

### 2. Levantar el Backend (API)
Abra una terminal en la carpeta del backend:
```bash
cd Reservas_Backend/Reservas_Backend
dotnet restore
dotnet run --urls "http://localhost:3000"
```
- API URL: http://localhost:3000
- Swagger UI: http://localhost:3000/swagger (Documentación interactiva con ejemplos de éxito y error).

### 3. Levantar el Frontend (Angular)
Abra otra terminal en la carpeta del frontend:
```bash
cd Reservas_Frontend
npm install
npm start
```
- Web URL: http://localhost:4200

---

## Características y Reglas de Negocio (Implementadas al 100%)

### A. Consulta de Historial
- Búsqueda por Placa: Filtro instantáneo con validación de formato (XXX-0000).
- Mensajes Amigables: Si no hay citas, el sistema muestra un estado vacío diseñado con Material.
- Tipado Fuerte: Integración de interfaces TypeScript para asegurar la integridad de los datos consultados.

### B. Agendamiento de Citas
- Validación de Horario: Estrictamente Lunes a Viernes de 08:00 AM a 02:00 PM.
- Selector de Horas: Se implementó un selector con bloques de 30 minutos, evitando errores de entrada manual.
- Control de Fechas Pasadas: Se ha bloqueado el calendario tanto en Backend como en Frontend para impedir citas anteriores al día de hoy.
- Validación Crítica (Punto Extra): El sistema detecta y bloquea si el horario ya está ocupado por otro vehículo, devolviendo un error de negocio específico.

### C. Arquitectura y UX
- Validaciones Reactivas: Los campos se marcan visualmente en rojo ante entradas inválidas.
- Feedback Visual: Uso de Spinners para procesos de carga y SnackBars para notificaciones de éxito/error.
- Responsive Design: Interfaz adaptada al 100% para dispositivos móviles y tablets.
- Zoneless Change Detection: Implementación de provideExperimentalZonelessChangeDetection() para una reactividad más rápida.


