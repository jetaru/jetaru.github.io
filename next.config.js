/** @type {import('next').NextConfig} */
const nextConfig = {
  // Exportación estática requerida para GitHub Pages (genera la carpeta out/)
  output: "export",

  // Las imágenes en exportación estática de GitHub Pages requieren unoptimized: true
  images: {
    unoptimized: true,
  },

  // Genera carpetas con index.html para compatibilidad total con servidores estáticos
  trailingSlash: true,

  // Para el repositorio raíz de GitHub Pages (jetaru.github.io), basePath debe ser ""
  // Si en el futuro se usa en un subdirectorio, se puede pasar NEXT_PUBLIC_BASE_PATH
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",

  // Variables de entorno expuestas al cliente
  env: {
    NEXT_PUBLIC_DEFAULT_LOCALE: "auto",
  },

  // Reglas de Turbopack para procesar Tailwind CSS v4
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

module.exports = nextConfig;
