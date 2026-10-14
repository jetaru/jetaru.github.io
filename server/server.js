/**
 * Servidor Externo en JavaScript (Node.js nativo sin dependencias pesadas)
 * Este servidor puede ejecutarse en local (puerto 4000) o desplegarse en Render, Railway, VPS, etc.
 * Proporciona la API para la página estática alojada en GitHub Pages.
 */

const http = require("http");

const PORT = process.env.PORT || 4000;

// Base de datos en memoria para mensajes de contacto
const contactMessages = [];

// Lista de proyectos servida por el backend externo
const dynamicProjects = [
  {
    id: "patio-madera",
    slug: "patio-madera",
    title: "Patio Madera (API Live)",
    subtitle: "Plataforma Logística y Trazabilidad Operacional",
    summary:
      "Sistema integral de gestión logística e inventario en tiempo real para optimización de cubicación y despacho.",
    description:
      "Solución de alto rendimiento orientada a la industria manufacturera con sincronización en tiempo real y soporte offline-first.",
    role: "Lead Software Architect & Full Stack Engineer",
    architectureType: "Clean Architecture + Event-Driven",
    tags: ["Logística", "Tiempo Real", "Microservicios", "Clean Architecture"],
    metrics: [
      { label: "Reducción de tiempos de cubicación", value: "-45%" },
      { label: "Precisión de stock", value: "99.8%" },
      { label: "Disponibilidad", value: "99.95%" },
    ],
    highlights: [
      "Arquitectura limpia con capas de dominio aisladas.",
      "Algoritmo de cubicación 3D volumétrico en tiempo real.",
      "Integración con ERP mediante webhooks seguros.",
    ],
    techStack: {
      frontend: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      backend: ["Node.js", "Express", "TypeScript", "Redis"],
      database: ["PostgreSQL", "Prisma"],
      devops: ["Docker", "GitHub Actions"],
    },
    githubUrl: "https://github.com/jetaru",
    featured: true,
    status: "Producción",
  },
  {
    id: "sispat",
    slug: "sispat",
    title: "SISPAT (API Live)",
    subtitle: "Sistema de Diagramación y Arquitectura Empresarial",
    summary:
      "Herramienta web interactiva para el modelado, diagramación y orquestación de sistemas de arquitectura empresarial.",
    description:
      "Permite a los equipos modelar topologías de sistemas y flujos operativos con renderizado vectorial acelerado.",
    role: "Senior Architect & Core Developer",
    architectureType: "Hexagonal / Ports & Adapters",
    tags: ["Diagramación", "Modelado", "Vectorial", "Hexagonal"],
    metrics: [
      { label: "Rendimiento", value: "60 FPS continuos" },
      { label: "Optimización de tiempo", value: "-60%" },
    ],
    highlights: [
      "Motor reactivo basado en grafos dirigidos (DAG).",
      "Persistencia de estado inmutable con historial infinito.",
      "Exportación directa a SVG, PDF y especificaciones JSON.",
    ],
    techStack: {
      frontend: ["React", "TypeScript", "Canvas / SVG"],
      backend: ["Node.js", "Fastify"],
      database: ["PostgreSQL", "JSONB"],
      devops: ["Docker", "GitHub Pages"],
    },
    githubUrl: "https://github.com/jetaru",
    featured: true,
    status: "Producción",
  },
];

// Helper para parsear JSON del body
function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on("error", reject);
  });
}

const startTime = Date.now();

const server = http.createServer(async (req, res) => {
  // Configuración de CORS universal para permitir peticiones desde GitHub Pages y localhost
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Pre-flight OPTIONS
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  const pathname = parsedUrl.pathname;

  // Endpoint: Health Check
  if (req.method === "GET" && (pathname === "/api/health" || pathname === "/health")) {
    const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        status: "online",
        uptimeSeconds,
        serverTime: new Date().toISOString(),
        version: "1.0.0",
        environment: process.env.NODE_ENV || "development",
        runtime: `Node.js ${process.version}`,
        message: "Servidor externo JavaScript operativo para GitHub Pages",
      })
    );
    return;
  }

  // Endpoint: Listar proyectos
  if (req.method === "GET" && (pathname === "/api/projects" || pathname === "/projects")) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ projects: dynamicProjects }));
    return;
  }

  // Endpoint: Recibir mensaje de contacto
  if (req.method === "POST" && (pathname === "/api/contact" || pathname === "/contact")) {
    try {
      const data = await parseJsonBody(req);
      const ticketId = `EXT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      const record = {
        id: ticketId,
        ...data,
        receivedAt: new Date().toISOString(),
      };
      contactMessages.push(record);
      console.log(`[Contacto Recibido] De: ${data.name} <${data.email}> | Ticket: ${ticketId}`);

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          success: true,
          message: `Mensaje recibido exitosamente en el servidor externo. Ticket: ${ticketId}`,
          ticketId,
          timestamp: record.receivedAt,
        })
      );
    } catch {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: false, message: "Payload JSON inválido" }));
    }
    return;
  }

  // 404 para cualquier otra ruta
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Endpoint no encontrado", path: pathname }));
});

server.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(` Servidor externo JS escuchando en http://localhost:${PORT}`);
  console.log(` - GET  /api/health`);
  console.log(` - GET  /api/projects`);
  console.log(` - POST /api/contact`);
  console.log(`=======================================================`);
});
