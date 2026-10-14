# Jorge Thompson — Portafolio Profesional & Arquitectura de Software

Sitio web estático de alto rendimiento para **GitHub Pages** ([jetaru.github.io](https://jetaru.github.io)), desarrollado con **Next.js 16**, **React 19**, **Tailwind CSS v4** y diseñado bajo los principios de **Clean Architecture** (Arquitectura Limpia). Diseñado con desacoplamiento total para conectarse a un **servidor externo en JavaScript (Node.js)**.

---

## 🏛️ Arquitectura del Proyecto (Clean Architecture)

El código fuente en `src/` está estrictamente organizado en capas concéntricas con inversión de dependencias:

```
src/
├── core/                        # CAPA DE DOMINIO (Core puro sin dependencias de frameworks)
│   ├── domain/
│   │   ├── entities/            # Entidades de negocio (Project, Skill, ContactMessage, ServerHealth)
│   │   └── repositories/        # Contratos / Interfaces (IProjectRepository, IContactRepository, IServerRepository)
│   └── usecases/                # Casos de Uso (GetProjectsUseCase, SendContactUseCase, CheckServerStatusUseCase)
│
├── infrastructure/              # CAPA DE INFRAESTRUCTURA Y ADAPTADORES
│   ├── api/                     # Cliente HTTP resiliente con timeout, retry y manejo de errores
│   ├── config/                  # Variables de entorno y configuración tipada (appConfig)
│   ├── container.ts             # Service Container (Inversión de Control / Dependency Injection)
│   └── repositories/
│       ├── http/                # Implementaciones que consumen el Servidor JS Externo
│       └── mock/                # Implementaciones de contingencia (Fallback transparente para GitHub Pages)
│
├── presentation/                # CAPA DE PRESENTACIÓN (UI)
│   ├── components/
│   │   ├── layout/              # Navbar con monitor de servidor en tiempo real y Footer
│   │   ├── sections/            # Hero, Proyectos (Patio Madera, SISPAT), Arquitectura, Skills, Servidor JS, Contacto
│   │   └── ui/                  # Iconografía y componentes atómicos
│   └── hooks/                   # Custom Hooks (useProjects, useServerStatus, useContact)
│
└── app/                         # NEXT.JS APP ROUTER
    ├── layout.tsx               # Metadatos SEO, OpenGraph y estructura raíz
    ├── page.tsx                 # Composición de la página principal
    └── globals.css              # Estilos Tailwind CSS v4 y animaciones
```

---

## 🚀 Proyectos Destacados Incluidos

1. **Patio Madera**: Plataforma logística y trazabilidad industrial en tiempo real (cubicación 3D, gestión de inventario offline-first e integración con ERP).
2. **SISPAT**: Herramienta de diagramación, modelado vectorial y arquitectura empresarial basada en grafos acíclicos dirigidos (DAG).
3. **Clean Core Engine**: Micro-framework modular en TypeScript para servicios backend escalables.

---

## 🌐 Servidor Externo en JavaScript (`server/server.js`)

Para desacoplar el frontend estático alojado en GitHub Pages de la lógica de procesamiento dinámico, el repositorio incluye un servidor ligero en Node.js (cero dependencias externas requeridas) en `server/server.js`:

### Endpoints Disponibles:
- `GET  /api/health` — Telemetría del servidor (estado, uptime, versión de runtime, latencia).
- `GET  /api/projects` — Catálogo dinámico de proyectos.
- `POST /api/contact` — Recepción y persistencia de mensajes con asignación de ticket único.

### Cómo ejecutar el servidor en local:
```bash
npm run server
# Escuchando en http://localhost:4000
```

> **Resiliencia Automática:** Si el servidor externo no está disponible o está en despliegue frío, el portafolio cambia automáticamente a su capa de contingencia local (Mock Fallback), asegurando que los visitantes en GitHub Pages siempre disfruten de una experiencia fluida y sin pantallas de error.

---

## 📦 Despliegue Automatizado en GitHub Pages

El proyecto incluye un flujo de integración continua en `.github/workflows/deploy.yml`:

1. Cada `git push` a las ramas `develop`, `main` o `master` dispara el workflow.
2. Next.js compila el sitio con `output: 'export'` generando los archivos estáticos en la carpeta `out/`.
3. GitHub Actions despliega automáticamente el sitio en **https://jetaru.github.io**.

### Configuración de GitHub Pages en el repositorio:
1. Ve a **Settings** > **Pages** en tu repositorio en GitHub.
2. En **Build and deployment** > **Source**, selecciona **GitHub Actions**.

---

## 🛠️ Comandos de Desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo frontend (puerto 3000)
npm run dev

# Compilar y exportar la versión estática para producción (carpeta out/)
npm run build

# Iniciar el servidor backend externo en Node.js (puerto 4000)
npm run server
```

---

## 👤 Autor

**Jorge Thompson**
- GitHub: [@jetaru](https://github.com/jetaru)
- LinkedIn: [Jorge Thompson](https://www.linkedin.com/in/jorge-thompson)
- Email: [contacto.jetaru@gmail.com](mailto:contacto.jetaru@gmail.com)
