# Gestor de Respaldo (Frontend)

Este es el frontend para el proyecto **Gestor de Respaldo**, una aplicación diseñada para administrar, monitorear y gestionar copias de seguridad de manera eficiente.

## 🚀 Tecnologías

Este proyecto está construido utilizando las siguientes tecnologías:
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Bootstrap](https://getbootstrap.com/) *(Integrado vía CDN para estilos, evitando dependencias innecesarias)*

## 🏗️ Estructura de Componentes (Atomic Design)

Este proyecto sigue la metodología de **[Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)** para estructurar y organizar los componentes de React. Esto facilita la reutilización y el mantenimiento del código agrupándolos de la siguiente manera:

- **Átomos (Atoms):** Componentes UI básicos y fundamentales (botones, inputs, tipografía).
- **Moléculas (Molecules):** Grupos simples de átomos funcionando de forma conjunta (ej. un campo de búsqueda con su botón).
- **Organismos (Organisms):** Componentes relativamente complejos formados por moléculas y/o átomos, que representan secciones completas de la interfaz (ej. barra de navegación, tabla de datos).
- **Plantillas (Templates):** Estructuras a nivel de página que articulan la disposición de los componentes, sin inyectar datos reales todavía.
- **Páginas (Pages):** Componentes a nivel de ruta que obtienen el estado o los datos de la aplicación y los pasan a las plantillas u organismos para mostrar el resultado final.

## 📦 Instalación y Configuración

Para ejecutar este proyecto de forma local, sigue estos pasos:

1. Clona el repositorio y navega al directorio del frontend:
   ```bash
   cd gestor_de_respaldo_fe
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## 📜 Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Construye la aplicación para producción.
- `npm run lint`: Ejecuta ESLint para analizar el código en busca de problemas.
- `npm run preview`: Previsualiza la aplicación construida localmente.
