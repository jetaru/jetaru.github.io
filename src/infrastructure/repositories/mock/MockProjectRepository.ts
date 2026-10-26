import { IProjectRepository } from "@/core/domain/repositories/IProjectRepository";
import { Project } from "@/core/domain/entities/project";

export const MOCK_PROJECTS: Project[] = [
  // =========================================================================
  // CASO 1: Inspección Industrial & Auditoría de Calidad Química
  // =========================================================================
  {
    id: "inspeccion-industrial-sap",
    slug: "inspeccion-industrial-sap",
    title: "Plataforma de Inspección Industrial y Auditoría de Calidad Química",
    subtitle: "Plataforma Móvil Offline-First con Orquestación SAP PO y Microsoft Entra ID",
    summary:
      "Solución de misión crítica para el control y recepción de insumos químicos peligrosos y materiales industriales en plantas continuas, con resiliencia en terreno sin red, middleware SAP PO y seguridad federada.",
    description:
      "[SITUACIÓN] Complejos industriales con intenso tráfico de transporte pesado y recepción de sustancias químicas de alto riesgo requerían inspecciones normativas estrictas (hojas de seguridad, kits de contención de derrames, acreditación y pesaje) en zonas con nula cobertura celular.\n\n[TAREA] Diseñar e implementar una arquitectura móvil desacoplada y tolerante a fallos que eliminara cuellos de botella en las garitas de pesaje, suprimiera conexiones directas a bases de datos legadas y centralizara la conciliación contable y de calidad en el ERP corporativo.\n\n[ACCIÓN] Se implementó Clean Architecture con el patrón Transactional Outbox en SQLite cifrado local; sincronización asíncrona bidireccional en dos fases (metadatos e imágenes comprimidas en edge) coordinada con el REST Adapter de SAP Process Orchestration (PO); Single Sign-On (SSO) federado con Microsoft Entra ID (MSAL PKCE); y un motor dinámico Server-Driven para actualización de normativas e internacionalización (ES/EN/PT).\n\n[RESULTADO] Garantía de continuidad operativa al 100% en zonas sin red, reducción del tiempo de conciliación en el ERP de 45 minutos a < 2.5 segundos, optimización del 68% en consumo de payload y reducción del 98% en tiempos de aprovisionamiento de accesos.",
    role: "Lead Software Architect & Principal Mobile Engineer",
    architectureType: "Clean Architecture / Offline-First / Enterprise ESB",
    tags: [
      "Clean Architecture",
      "Offline-First",
      "SAP PO",
      "Azure Entra ID",
      "Oracle SQL",
      "Seguridad Móvil",
    ],
    metrics: [
      { label: "Continuidad Operacional", value: "99.98%" },
      { label: "Latencia de Ingesta ERP", value: "< 2.5s" },
      { label: "Optimización de Payload", value: "-68%" },
      { label: "Tiempo de Aprovisionamiento", value: "-98%" },
    ],
    highlights: [
      "Patrón Transactional Outbox en SQLite local que garantiza cero pérdida de evaluaciones en zonas remotas.",
      "Orquestación asíncrona mediante SAP Process Orchestration (REST Adapter) hacia los módulos MM/QM del core ERP.",
      "Autenticación federada Zero Trust con Microsoft Entra ID (MSAL SDK) bajo estándares de ciberseguridad industrial.",
      "Arquitectura Server-Driven Checklist para despliegue dinámico de normativas multisede y multilingüe (ES, EN, PT).",
    ],
    techStack: {
      frontend: [
        "Android Native (Kotlin)",
        "Jetpack Compose / MVI",
        "Next.js (Web Admin)",
        "TypeScript",
        "Tailwind CSS",
      ],
      backend: [
        "Clean Architecture Core",
        "ASP.NET Core Web API",
        "SAP Process Orchestration (PO 7.5)",
        "Node.js REST Services",
      ],
      database: [
        "Encrypted SQLite (Edge)",
        "Oracle Relational Core",
        "Azure Blob Storage",
      ],
      devops: [
        "Microsoft Entra ID (OAuth 2.0)",
        "Docker",
        "Azure App Services",
        "CI/CD GitLab Pipelines",
      ],
    },
    featured: true,
    status: "Producción",
    evidences: [
      {
        url: "/assets/projects/inspeccion-industrial-sap/evidence-1.png",
        title: "Topología de Red y Conectividad Híbrida",
        description:
          "Esquema de integración segura entre clientes móviles en terreno, gateway reverso y middleware corporativo.",
        type: "architecture",
      },
      {
        url: "/assets/projects/inspeccion-industrial-sap/evidence-2.png",
        title: "Modelo Entidad-Relación de Auditoría Técnica",
        description:
          "Diseño del esquema de base de datos relacional para control de parámetros normativos y evaluaciones.",
        type: "schema",
      },
    ],
    architectureDiagramCode: `flowchart TD
  MobileClient["Mobile Client (Clean Arch)"] --> LocalCache["Local Outbox (SQLite)"]
  LocalCache --> SyncWorker["Sync Worker & Retry Policy"]
  SyncWorker -- "HTTPS / OAuth2 JWT" --> APIGateway["Enterprise API Gateway"]
  APIGateway --> SAPPO["SAP Process Orchestration (PO)"]
  SAPPO --> SAPERP["SAP Core (MM/QM)"]
  MobileClient -. "SSO Auth" .-> EntraID["Microsoft Entra ID (MSAL)"]`,
    en: {
      title: "Enterprise Industrial Inspection & Chemical Quality Audit",
      subtitle: "Offline-First Mobile Inspection Platform with SAP PO & Microsoft Entra ID",
      summary:
        "Mission-critical solution for inspecting hazardous chemicals and industrial materials at manufacturing plants, delivering zero-downtime offline capabilities, SAP PO middleware integration, and federated identity.",
      description:
        "[SITUATION] Industrial complexes with high volumes of heavy transport and hazardous chemical deliveries required rigorous compliance checks in areas with zero cellular reception.\n\n[TASK] Design a decoupled, fault-tolerant mobile architecture to remove gate bottlenecks, eliminate legacy database direct calls, and centralize reconciliation into the core corporate ERP.\n\n[ACTION] Architected Clean Architecture with local encrypted SQLite Transactional Outbox; 2-phase async sync engine against SAP PO REST Adapter; corporate SSO with Microsoft Entra ID (MSAL PKCE); and dynamic Server-Driven schemas.\n\n[RESULT] 100% operational continuity in offline areas, ERP latency reduced from 45 minutes to < 2.5s, 68% payload size reduction, and 98% faster access provisioning.",
      role: "Lead Software Architect & Principal Mobile Engineer",
      architectureType: "Clean Architecture / Offline-First / Enterprise ESB",
      tags: ["Clean Architecture", "Offline-First", "SAP PO", "Azure Entra ID", "Oracle SQL", "Mobile Security"],
      highlights: [
        "Transactional Outbox pattern in local SQLite ensuring zero data loss during connectivity drops.",
        "Asynchronous enterprise integration via SAP PO REST Adapter directly into core ERP MM/QM modules.",
        "Zero Trust federated authentication with Microsoft Entra ID (MSAL SDK) meeting industrial standards.",
        "Server-Driven Checklist architecture enabling dynamic multi-plant and multi-lingual deployment (ES, EN, PT).",
      ],
      metrics: [
        { label: "Operational Continuity", value: "99.98%" },
        { label: "ERP Ingestion Latency", value: "< 2.5s" },
        { label: "Payload Optimization", value: "-68%" },
        { label: "Provisioning Speedup", value: "-98%" },
      ],
    },
  },

  // =========================================================================
  // CASO 2: VALDOR - Telemetría de Flota Pesada y Misiones de Transporte
  // =========================================================================
  {
    id: "valdor-telemetria-flota",
    slug: "valdor-telemetria-flota",
    title: "VALDOR: Telemetría de Flota Pesada, Misiones de Transporte y Geocercas",
    subtitle: "Trazabilidad Satelital Continua, Gestión de Pannes y Seguridad Móvil SSL Pinning",
    summary:
      "Plataforma de misión crítica para el despacho y monitoreo telemático en tiempo real de unidades de transporte pesado, gestionando misiones de abastecimiento, traspaso de carga por panne y validación de polígonos de cosecha.",
    description:
      "[SITUACIÓN] La logística de transporte forestal e industrial requería coordinar miles de viajes diarios a través de rutas agrestes y faenas aisladas, enfrentando problemas de suplantación de patentes, desvíos de carga no autorizados y fallas mecánicas en ruta sin trazabilidad inmediata.\n\n[TAREA] Desarrollar un ecosistema móvil resiliente para conductores y despachadores que operara de forma continua en segundo plano, detectara la posición satelital sin agotar la batería, gestionara traspasos de carga ante pannes mecánicas y blindara las comunicaciones contra ingeniería inversa.\n\n[ACCIÓN] Se diseñó la aplicación Android con Foreground Services resistentes a optimizaciones del sistema operativo; buffer circular de coordenadas con compresión delta; motor espacial de punto en polígono para validar el ingreso/egreso de canchas autorizadas; protocolo seguro de confirmación de traspaso de carga entre unidades de transporte (UT); y cifrado TLS con SSL Pinning respaldado por almacén de claves criptográficas.\n\n[RESULTADO] Erradicación total de desvíos no identificados, 99.9% de disponibilidad en la captura de telemetría en campo, 0% de intercepciones de tráfico gracias a SSL Pinning y reducción del 70% en el tiempo de gestión de contingencias por fallas mecánicas en ruta.",
    role: "Lead Mobile Architect & Security Specialist",
    architectureType: "Foreground Services / Spatial Geofencing / OWASP Mobile Security",
    tags: [
      "Android SDK",
      "Telemetría GPS",
      "SSL Pinning",
      "Geocercas",
      "Servicios en Segundo Plano",
      "Oracle SQL",
    ],
    metrics: [
      { label: "Disponibilidad de Telemetría", value: "99.9%" },
      { label: "Fraude o Desvío de Carga", value: "0%" },
      { label: "Resolución de Traspaso en Panne", value: "-70%" },
      { label: "Precisión de Geocercado", value: "< 5m" },
    ],
    highlights: [
      "Servicio de rastreo GPS en segundo plano con muestreo adaptativo según acelerómetro y velocidad vehicular.",
      "Ciberseguridad móvil bajo estándar OWASP MASVS con SSL Pinning contra ataques Man-In-The-Middle (MITM).",
      "Flujo transaccional de contingencia para ConfirmarTraspasoUTPanne con trazabilidad fotográfica de la guía.",
      "Algoritmo de cálculo poligonal optimizado en cliente para validar faenas de carga y alerta de desvíos.",
    ],
    techStack: {
      frontend: [
        "Android Native (Java/Kotlin)",
        "Foreground Services",
        "Google Play Services Location",
        "Bouncy Castle Security Provider",
      ],
      backend: [
        "Node.js Microservices",
        "Oracle SQL Stored Procedures",
        "Firebase Cloud Messaging (Push)",
        "RESTful Logistics Gateways",
      ],
      database: [
        "Oracle Relational Database",
        "SQLite (Local Track Cache)",
        "Encrypted Storage",
      ],
      devops: [
        "SSL Certificate Pinning (.ks)",
        "Ethical Hacking Mobile Compliance",
        "Docker",
        "CI/CD Pipelines",
      ],
    },
    featured: true,
    status: "Producción",
    evidences: [
      {
        url: "/assets/projects/valdor-telemetria-flota/evidence-1.png",
        title: "Flujo Operativo de Misiones y Confirmación de Traspaso en Panne",
        description:
          "Secuencia de reasignación y traspaso de carga entre camiones ante fallas mecánicas en ruta con validación fotográfica.",
        type: "workflow",
      },
      {
        url: "/assets/projects/valdor-telemetria-flota/evidence-2.png",
        title: "Arquitectura de Seguridad SSL Pinning y Mitigación MITM",
        description:
          "Implementación criptográfica de certificados empaquetados para validar la autenticidad del servidor de telemetría.",
        type: "architecture",
      },
      {
        url: "/assets/projects/valdor-telemetria-flota/evidence-3.png",
        title: "Motor de Geocercado Poligonal y Verificación de Faenas",
        description:
          "Algoritmo de validación de coordenadas contra polígonos de cosecha y canchas autorizadas de acopio.",
        type: "ui",
      },
    ],
    architectureDiagramCode: `flowchart TD
  MobileVALDOR["App Móvil VALDOR (Foreground Service)"] -- "HTTPS + SSL Pinning" --> ReverseProxy["Reverse Proxy / API Gateway"]
  ReverseProxy --> ValdorBFF["BFF de Telemetría & Misiones"]
  ValdorBFF --> SpatialEngine["Motor de Geocercas & Validación Poligonal"]
  ValdorBFF --> OracleDB[("Oracle Enterprise Store (SAM/VALDOR)")]
  ValdorBFF -. Push Alertas .-> Firebase["Firebase Cloud Messaging"]
  Firebase -. Notificación Traspaso .-> MobileVALDOR`,
    en: {
      title: "VALDOR: Heavy Fleet Telematics, Transport Mission Dispatcher & Geofencing",
      subtitle: "Continuous Background Sat-Tracking, Panne Transfer & SSL Pinning Mobile Security",
      summary:
        "Mission-critical mobile telematics platform for real-time heavy industrial fleet tracking, transport mission orchestration, cargo transfer handling during vehicle breakdown (panne), and spatial geofence validation.",
      description:
        "[SITUATION] Industrial timber and bulk freight haulage required tracking thousands of daily trips over remote terrain, dealing with plate forgery risks, unauthorized deviations, and mechanical breakdowns without real-time tracking.\n\n[TASK] Build a resilient mobile ecosystem for drivers and dispatchers running continuously in the background, minimizing battery drain while enforcing strict geofence validation and MITM-proof communications.\n\n[ACTION] Engineered Android Native architecture with resilient Foreground Services; circular coordinate buffers with delta compression; point-in-polygon engine for authorized loading zone validation; secure cargo transfer workflow for breakdowns; and TLS encryption enforced via SSL Certificate Pinning.\n\n[RESULT] 0% undetected deviations, 99.9% telematics capture uptime, zero traffic interception due to SSL Pinning, and 70% faster resolution of mechanical breakdown contingencies.",
      role: "Lead Mobile Architect & Security Specialist",
      architectureType: "Foreground Services / Spatial Geofencing / OWASP Mobile Security",
      tags: ["Android SDK", "GPS Telematics", "SSL Pinning", "Geofencing", "Background Services", "Oracle SQL"],
      highlights: [
        "Continuous background GPS tracking service with adaptive motion sampling via accelerometer.",
        "OWASP MASVS mobile security compliance with SSL Pinning against Man-In-The-Middle attacks.",
        "Transactional contingency workflow for breakdown cargo transfer with photographic bill of lading proof.",
        "Client-side polygon calculation engine validating harvesting areas and routing bounds.",
      ],
      metrics: [
        { label: "Telematics Availability", value: "99.9%" },
        { label: "Cargo Deviation / Fraud", value: "0%" },
        { label: "Panne Transfer Resolution", value: "-70%" },
        { label: "Geofence Accuracy", value: "< 5m" },
      ],
    },
  },

  // =========================================================================
  // CASO 3: SISPAT - Inspección Patrimonial, Checklist y Eventos
  // =========================================================================
  {
    id: "sispat",
    slug: "sispat",
    title: "SISPAT: Inspección Patrimonial, Checklist Operacional y Gestión de Eventos",
    subtitle: "Sistema Móvil de Fiscalización en Terreno con Disparo Condicional de Eventos Múltiples",
    summary:
      "Plataforma móvil y de servicios para la fiscalización técnica y patrimonial en faenas industriales y forestales, implementando checklists dinámicos con creación automática de incidentes múltiples ante no-conformidades.",
    description:
      "[SITUACIÓN] Equipos de fiscalización y protección en terreno recorrían cientos de predios, instalaciones y faenas evaluando condiciones de seguridad física (cercos, torres de vigilancia, maquinaria, prevención de incendios) con procesos manuales desconectados que demoraban días en registrar incidentes críticos.\n\n[TAREA] Construir una plataforma móvil robusta de formularios y checklists que guiara al fiscalizador en terreno, evaluara condiciones de no-cumplimiento en caliente y permitiera disparar de forma condicional múltiples eventos asociados con asignación de recursos y evidencias fotográficas.\n\n[ACCIÓN] Se rediseñó el flujo operacional en Android nativo estructurando formularios de evaluación parametrizados; se desarrolló la lógica condicional que evalúa cada ítem defectuoso para ofrecer la generación atómica de incidentes vinculados; se implementó sincronización con servicios web empresariales y bases de datos Oracle; y se diseñó un esquema offline con almacenamiento de credenciales y predios autorizados.\n\n[RESULTADO] Reducción del 85% en el tiempo de reporte y asignación de recursos ante no-conformidades, 100% de trazabilidad de hallazgos en terreno, operación ininterrumpida sin conectividad y más de 50,000 auditorías procesadas anualmente.",
    role: "Senior Mobile & Backend Engineer",
    architectureType: "Conditional Event Engine / Offline Forms / Oracle DB Integration",
    tags: [
      "Android Native",
      "Checklist Dinámico",
      "Eventos Condicionales",
      "Oracle SQL",
      "Gestión Patrimonial",
      "Servicios Web",
    ],
    metrics: [
      { label: "Tiempo de Reporte de Hallazgos", value: "-85%" },
      { label: "Trazabilidad de No-Conformidades", value: "100%" },
      { label: "Disponibilidad en Faena", value: "99.95%" },
      { label: "Auditorías Anuales", value: "+50,000" },
    ],
    highlights: [
      "Motor de checklist dinámico con generación condicional de eventos múltiples ante ítems no conformes.",
      "Módulo de asignación de recursos y mitigación inmediata en terreno para focos de riesgo patrimonial.",
      "Sincronización híbrida cliente-servidor con servicios web SOAP/REST y base de datos relacional Oracle.",
      "Arquitectura offline con precarga de predios, usuarios y formularios según perfil de seguridad.",
    ],
    techStack: {
      frontend: [
        "Android Native (Java/Kotlin)",
        "Custom Views & Dynamic Forms",
        "SQLite Local Persistence",
        "Camera Hardware Integration",
      ],
      backend: [
        ".NET Web Services (ASMX / REST)",
        "Oracle.ManagedDataAccess",
        "Business Logic Layer (App_Code)",
        "Newtonsoft.Json Pipelines",
      ],
      database: [
        "Oracle Enterprise Database",
        "Embedded Mobile SQLite",
        "Procedimientos Almacenados PL/SQL",
      ],
      devops: [
        "FortiClient VPN / Zero Trust Network",
        "IIS Web Hosting",
        "Git Enterprise",
        "CI/CD Pipelines",
      ],
    },
    featured: true,
    status: "Producción",
    evidences: [
      {
        url: "/assets/projects/sispat/evidence-1.png",
        title: "Flujo de Checklist Operacional con Disparo Condicional de Eventos",
        description:
          "Secuencia guiada en la app donde la detección de ítems con no-conformidad habilita la creación automática de eventos.",
        type: "workflow",
      },
      {
        url: "/assets/projects/sispat/evidence-2.png",
        title: "Módulo de Asignación de Recursos y Gestión de No-Conformidades",
        description:
          "Pantalla de registro de medidas correctivas, asignación de cuadrillas y materiales para subsanar hallazgos en predios.",
        type: "ui",
      },
      {
        url: "/assets/projects/sispat/evidence-3.png",
        title: "Matriz de Parámetros de Inspección y Sincronización Móvil",
        description:
          "Estructura relacional de grupos de checklist, tipos de material y opciones de respuesta binarias y ponderadas.",
        type: "schema",
      },
      {
        url: "/assets/projects/sispat/evidence-4.png",
        title: "Menú de Formularios de Fiscalización y Control de Predios",
        description:
          "Interfaz móvil de selección de fundos asignados, historial de eventos y sincronización bidireccional de parámetros.",
        type: "ui",
      },
    ],
    architectureDiagramCode: `flowchart TD
  MobileApp["App Móvil SISPAT (Terreno)"] --> LocalCache["SQLite (Predios & Parámetros)"]
  LocalCache --> FormEngine["Motor de Checklist & Evaluación de Fallas"]
  FormEngine -- "Item No Conforme" --> MultiEventEngine["Generador Condicional de Eventos Múltiples"]
  MultiEventEngine --> SyncModule["Módulo de Sincronización Asíncrona"]
  SyncModule -- "VPN / HTTPS" --> WebService[".NET Enterprise Web Services"]
  WebService --> OracleDB[("Oracle Enterprise Relational DB")]`,
    en: {
      title: "SISPAT: Field Inspection, Operational Checklist & Event Management Engine",
      subtitle: "Mobile Field Inspection with Conditional Multi-Event Triggers & Central DB Sync",
      summary:
        "Mobile and backend platform for field technical and asset protection inspections across extensive forestry and industrial properties, featuring dynamic checklists that conditionally spawn linked incident events upon non-compliance.",
      description:
        "[SITUATION] Inspection teams audited hundreds of industrial estates, perimeter fences, and operational plants using disconnected manual methods that delayed critical incident reporting by days.\n\n[TASK] Build an offline-ready mobile form system that guides field inspectors, validates faults in real-time, and conditionally generates multiple linked incident reports with photos and resource allocation.\n\n[ACTION] Architected native Android dynamic form rendering; implemented conditional logic spawning atomic incidents per failed checklist item; integrated reliable sync with corporate web services and Oracle databases.\n\n[RESULT] 85% reduction in incident reporting time, 100% audit finding traceability, continuous offline field operations, and over 50,000 annual inspections processed.",
      role: "Senior Mobile & Backend Engineer",
      architectureType: "Conditional Event Engine / Offline Forms / Oracle DB Integration",
      tags: ["Android Native", "Dynamic Checklists", "Conditional Events", "Oracle SQL", "Asset Protection", "Web Services"],
      highlights: [
        "Dynamic checklist engine with conditional multi-event generation for non-compliant items.",
        "On-site resource and crew allocation module for immediate hazard mitigation.",
        "Hybrid client-server synchronization using web services and Oracle enterprise database.",
        "Offline-first architecture pre-caching estates, users, and audit templates per user role.",
      ],
      metrics: [
        { label: "Incident Reporting Speed", value: "-85%" },
        { label: "Non-Compliance Traceability", value: "100%" },
        { label: "Field Availability", value: "99.95%" },
        { label: "Annual Audits", value: "+50,000" },
      ],
    },
  },

  // =========================================================================
  // CASO 4: Portal B2B de Proveedores & Homologación de Transporte
  // =========================================================================
  {
    id: "portal-proveedores-b2b",
    slug: "portal-proveedores-b2b",
    title: "Portal B2B de Proveedores y Homologación de Transporte",
    subtitle: "Portal Transaccional de Proveedores, Validación Masiva de Flotas y Migración Android 14+",
    summary:
      "Ecosistema integral de homologación de transportistas, auditoría documental en línea y control de acceso logístico, modernizado bajo estándares de ciberseguridad móvil OWASP MASVS y Android 14+.",
    description:
      "[SITUACIÓN] Miles de transportistas y proveedores externos interactuaban diariamente con la cadena logística mediante aplicaciones móviles heredadas vulnerables a ataques de hombre en el medio (MITM) y no compatibles con las directivas de seguridad de Android 14+.\n\n[TAREA] Modernizar de punta a punta la plataforma móvil de proveedores, implementar controles criptográficos de comunicación, automatizar la certificación de patentes y conductores, y desplegar un portal web transaccional de alto tráfico.\n\n[ACCIÓN] Se refactorizó la base de código móvil bajo directivas Android 14+ (Photo Picker, permisos granulares); se implementó SSL Pinning en el canal de red mediante keystore criptográfico; se diseñó un Backend-For-Frontend (BFF) con rate limiting y caché distribuida; y se implementaron validaciones telemáticas que bloquean unidades en caso de desvíos de carga.\n\n[RESULTADO] 100% de cumplimiento con las directivas de Google Play Store para Android 14/15, 0% de fraudes por suplantación de flota, reducción del 75% en tiempos de validación documental y disminución del 60% en tickets de soporte técnico.",
    role: "Senior Backend Architect & Mobile Modernization Specialist",
    architectureType: "Backend-for-Frontend (BFF) / Clean Architecture / Zero-Trust Security",
    tags: [
      "Portal B2B",
      "Logística de Proveedores",
      "Migración Android 14+",
      "SSL Pinning",
      "OWASP MASVS",
      "BFF Architecture",
    ],
    metrics: [
      { label: "Aprobación Store & Compliance", value: "100%" },
      { label: "Fraude de Identidad", value: "0%" },
      { label: "Tiempo de Validación Documental", value: "-75%" },
      { label: "Tickets de Soporte Técnico", value: "-60%" },
    ],
    highlights: [
      "Modernización de la arquitectura móvil para total compatibilidad con Android 14 y 15 (Target SDK 34/35).",
      "Implementación de SSL Pinning en canal seguro HTTPS, mitigando ataques de intercepción Man-In-The-Middle.",
      "Módulos web de autogestión para carga masiva de patentes, conductores y certificaciones técnicas vigentes.",
      "Validación telemática cruzada con bloqueo automático ante cargas efectuadas fuera de los polígonos asignados.",
    ],
    techStack: {
      frontend: [
        "Next.js (App Router)",
        "React 18",
        "TypeScript",
        "Tailwind CSS",
        "Android SDK (Target API 34/35)",
      ],
      backend: [
        "Node.js / Express Enterprise BFF",
        ".NET 8 Enterprise Services",
        "JWT & OAuth 2.0 Broker",
      ],
      database: [
        "Oracle Relational Enterprise Store",
        "Redis Caching & Session Store",
        "Encrypted Storage",
      ],
      devops: [
        "Azure API Management (APIM)",
        "Docker & Azure Container Apps",
        "OWASP Security Scanners",
        "Automated Pipelines",
      ],
    },
    featured: true,
    status: "Producción",
    evidences: [
      {
        url: "/assets/projects/portal-proveedores-b2b/evidence-1.png",
        title: "Esquema de Validación de Documentos y Patentes",
        description:
          "Flujo de verificación automática de pólizas, licencias y autorizaciones mecánicas de transportistas.",
        type: "workflow",
      },
    ],
    architectureDiagramCode: `flowchart TD
  SupplierApp["Android 14+ Mobile App"] -- "Mutual TLS / SSL Pinning" --> APIManagement["Azure API Gateway (Rate Limiting)"]
  SupplierWeb["Supplier Web Portal (Next.js)"] -- "HTTPS / Session Auth" --> APIManagement
  APIManagement --> BFFLayer["Logistics BFF Layer"]
  BFFLayer --> ValidationService["Fleet & License Validation Engine"]
  BFFLayer --> LegacyAdapter["Enterprise Database Adapter"]
  LegacyAdapter --> OracleDB[("Enterprise Relational DB")]`,
    en: {
      title: "B2B Enterprise Supplier Logistics Hub & Fleet Onboarding",
      subtitle: "Transactional Supplier Portal, High-Volume Fleet Validation & Android 14+ Migration",
      summary:
        "Comprehensive B2B ecosystem for transport carrier onboarding, online documentation audit, and logistical access control, modernized under OWASP MASVS mobile security and Android 14+ standards.",
      description:
        "[SITUATION] Thousands of carrier companies interacted with the supply chain via legacy mobile apps vulnerable to MITM attacks and failing Android 14+ security policies.\n\n[TASK] Completely modernize the supplier mobile client, enforce cryptographic communication checks, automate fleet and driver certification, and deploy a high-traffic web portal.\n\n[ACTION] Refactored mobile codebase to Android 14+ guidelines (Photo Picker, fine-grained permissions); implemented keystore-backed SSL Pinning; built a rate-limited BFF with distributed caching; and enforced telematics cross-checks.\n\n[RESULT] 100% compliance with Google Play Store Android 14/15 policies, 0% vehicle fraud, 75% faster documentation audits, and 60% fewer support tickets.",
      role: "Senior Backend Architect & Mobile Modernization Specialist",
      architectureType: "Backend-for-Frontend (BFF) / Clean Architecture / Zero-Trust Security",
      tags: ["B2B Logistics", "Supplier Hub", "Android 14+ Migration", "SSL Pinning", "OWASP MASVS", "BFF Architecture"],
      highlights: [
        "Mobile architecture modernization complying fully with Android 14 and 15 (Target SDK 34/35).",
        "SSL Pinning over HTTPS channel eliminating Man-In-The-Middle attacks.",
        "Self-service web modules for bulk registration of vehicle plates, drivers, and technical certifications.",
        "Cross-telematics validation with automatic block rules when loading outside assigned geofence polygons.",
      ],
      metrics: [
        { label: "Store Compliance", value: "100%" },
        { label: "Identity Fraud Rate", value: "0%" },
        { label: "Validation Speedup", value: "-75%" },
        { label: "Support Ticket Drop", value: "-60%" },
      ],
    },
  },

  // =========================================================================
  // CASO 5: Convector BTP - Orquestación Ferroviaria y Despacho Industrial
  // =========================================================================
  {
    id: "convector-btp-ferroviario",
    slug: "convector-btp-ferroviario",
    title: "Convector BTP: Orquestación Logística Ferroviaria y Despacho Industrial",
    subtitle: "Backend de Alto Rendimiento para Eventos de Despacho (SIM-F9902) y Cubicación en SAP BTP",
    summary:
      "Plataforma backend y middleware transaccional de alta concurrencia para la gestión y despacho de convoyes ferroviarios y transporte pesado, con cálculo volumétrico y conciliación de eventos en SAP BTP.",
    description:
      "[SITUACIÓN] El transporte ferroviario de productos terminados, subproductos y madera industrial requería coordinar despachos masivos con múltiples carros y trenes diarios, donde cualquier error de pesaje o retraso en la emisión de guías paralizaba patios industriales.\n\n[TAREA] Diseñar e implementar un motor transaccional de backend que centralizara los eventos de despacho (SIM-F9902), ejecutara cálculos volumétricos de cubicación en milisegundos y se sincronizara de forma atómica con SAP BTP y bases de datos relacionales.\n\n[ACCIÓN] Se desarrollaron procedimientos almacenados de alto rendimiento en Oracle SQL con paquetes transaccionales específicos (`gde2.pkg_ngde`); se modelaron APIs RESTful desacopladas para la orquestación de eventos de despacho, grillas operativas y modales de conciliación; se integraron colas de procesamiento asíncrono para absorber picos de tráfico de convoyes; y se enlazaron servicios de integración en SAP BTP.\n\n[RESULTADO] Disminución del 55% en los tiempos de despacho ferroviario en patios de carga, procesamiento de más de 20,000 toneladas diarias sin descalces de inventario, 99.95% de disponibilidad transaccional y total trazabilidad de eventos logísticos.",
    role: "Senior Backend & Data Architect",
    architectureType: "High-Throughput Transact Core / SAP BTP Middleware / Oracle PL-SQL",
    tags: [
      "SAP BTP",
      "Logística Ferroviaria",
      "Oracle SQL",
      "Procedimientos Almacenados",
      "Alta Concurrencia",
      "Microservicios",
    ],
    metrics: [
      { label: "Tiempo de Despacho Ferroviario", value: "-55%" },
      { label: "Volumen Diario Procesado", value: "+20k Ton" },
      { label: "Disponibilidad Transaccional", value: "99.95%" },
      { label: "Descalce de Inventario", value: "0%" },
    ],
    highlights: [
      "Diseño de paquetes y procedimientos almacenados PL/SQL optimizados para procesamiento por lotes de convoyes.",
      "Integración de la interfaz de despacho SIM-F9902 con grilla reactiva y modal de conciliación de carga.",
      "Conectividad asíncrona con servicios de logística nacional y pesaje en SAP Business Technology Platform (BTP).",
      "Algoritmos de cubicación y asignación de espacio en carros de tren para máxima eficiencia volumétrica.",
    ],
    techStack: {
      frontend: [
        "Next.js / React Enterprise Console",
        "TypeScript",
        "Tailwind CSS",
        "Reactive Data Grids",
      ],
      backend: [
        "Node.js / Express Microservices",
        "SAP BTP Integration Suite",
        "Oracle PL/SQL Stored Procedures",
        "Asynchronous Ingestion Queues",
      ],
      database: [
        "Oracle Database High-Availability",
        "SAP HANA In-Memory Store",
        "Redis Session & Lock Cache",
      ],
      devops: [
        "Docker",
        "Azure Cloud Services",
        "SAP Cloud Foundry",
        "GitLab CI/CD",
      ],
    },
    featured: true,
    status: "Producción",
    evidences: [
      {
        url: "/assets/projects/convector-btp-ferroviario/evidence-1.png",
        title: "Módulo de Despacho de Eventos y Grilla Transaccional (SIM-F9902)",
        description:
          "Panel operativo en tiempo real para registro y control de eventos de despacho de trenes y camiones.",
        type: "ui",
      },
      {
        url: "/assets/projects/convector-btp-ferroviario/evidence-2.png",
        title: "Modal de Conciliación de Carga Ferroviaria y Asignación de Convoyes",
        description:
          "Interfaz de validación volumétrica, pesaje y asignación de carros de tren previa a la transmisión hacia SAP BTP.",
        type: "ui",
      },
    ],
    architectureDiagramCode: `flowchart TD
  DispatchOperator["Operador de Despacho Ferroviario"] --> WebConsole["Consola Web de Despacho (SIM-F9902)"]
  WebConsole --> BTPGateway["API Gateway / Integration Services"]
  BTPGateway --> ConvectorCore["Convector Backend Engine"]
  ConvectorCore --> PLSQLPkg["Oracle PL/SQL Packages (gde2.pkg_ngde)"]
  PLSQLPkg --> OracleDB[("Oracle Enterprise Relational Core")]
  ConvectorCore -- "RFC / REST" --> SAPBTP["SAP BTP / SAP S4 Logistics Core"]`,
    en: {
      title: "Convector BTP: Rail Logistics Orchestration & Industrial Dispatching",
      subtitle: "High-Performance Backend for Dispatch Events (SIM-F9902) & Rail Cargo on SAP BTP",
      summary:
        "High-concurrency transactional backend and middleware platform for managing railway convoy dispatches and heavy industrial transport, with volumetric calculation and atomic event reconciliation on SAP BTP.",
      description:
        "[SITUATION] Rail transport of industrial timber and manufactured products required dispatching multiple heavy freight trains daily, where any weighing glitch or documentation delay paralyzed cargo yards.\n\n[TASK] Design and implement a high-throughput transactional backend engine to centralize dispatch events (SIM-F9902), execute cubic volume calculations in milliseconds, and atomically sync with SAP BTP.\n\n[ACTION] Developed high-performance PL/SQL packages in Oracle SQL (`gde2.pkg_ngde`); modeled decoupled RESTful APIs for dispatch event grids and modal reconciliation; and integrated asynchronous queues to absorb train convoy traffic spikes.\n\n[RESULT] 55% reduction in rail yard dispatch cycle time, over 20,000 metric tons processed daily with zero inventory mismatch, 99.95% transactional availability, and full end-to-end auditability.",
      role: "Senior Backend & Data Architect",
      architectureType: "High-Throughput Transact Core / SAP BTP Middleware / Oracle PL-SQL",
      tags: ["SAP BTP", "Rail Logistics", "Oracle SQL", "Stored Procedures", "High Concurrency", "Microservices"],
      highlights: [
        "Optimized PL/SQL packages and stored procedures for high-volume train convoy batch processing.",
        "Integration of SIM-F9902 dispatch interface with reactive data grid and cargo reconciliation modal.",
        "Asynchronous connectivity with national logistics services and weighbridges on SAP BTP.",
        "Volumetric cargo measurement and train wagon allocation algorithms for optimal space utilization.",
      ],
      metrics: [
        { label: "Rail Dispatch Cycle Time", value: "-55%" },
        { label: "Daily Processed Tonnage", value: "+20k Ton" },
        { label: "Transactional Availability", value: "99.95%" },
        { label: "Inventory Variance", value: "0%" },
      ],
    },
  },

  // =========================================================================
  // CASO 6: SISPAT Modeling & Architecture Core (Herramienta Web)
  // =========================================================================
  {
    id: "sispat-modeling",
    slug: "sispat-modeling",
    title: "Motor de Modelado y Diagramación de Arquitectura de Sistemas",
    subtitle: "Herramienta Web Interactiva con Renderizado Vectorial Acelerado por GPU",
    summary:
      "Plataforma web para el modelado, diagramación y orquestación de topologías de sistemas y arquitecturas de software complejas con exportación multiformato.",
    description:
      "Permite a equipos de arquitectura e ingeniería modelar topologías distribuidas, grafos dirigidos acíclicos (DAG) y flujos operacionales con renderizado acelerado en Canvas/SVG y soporte para reglas de validación en tiempo de ejecución.",
    role: "Senior Architect & Core Developer",
    architectureType: "Hexagonal / Ports & Adapters + Canvas Engine",
    tags: ["Diagramación", "Modelado", "Vectorial", "Arquitectura Limpia", "Web Standards"],
    metrics: [
      { label: "Rendimiento Gráfico", value: "60 FPS en 5k nodos" },
      { label: "Tiempo de Modelado", value: "-60%" },
      { label: "Formatos de Exportación", value: "SVG, JSON, PDF, PNG" },
      { label: "Compatibilidad", value: "100% Web Estándar" },
    ],
    highlights: [
      "Motor reactivo de diagramación basado en grafos acíclicos con historial de deshacer/rehacer infinito.",
      "Arquitectura hexagonal que aísla por completo el motor de cálculo gráfico de la capa de componentes UI.",
      "Pipeline de exportación vectorial de alta fidelidad sin dependencias de backend.",
    ],
    techStack: {
      frontend: ["React", "TypeScript", "HTML5 Canvas / SVG", "Tailwind CSS"],
      backend: ["Node.js Server", "Fastify", "TypeScript"],
      database: ["PostgreSQL", "JSONB Document Store"],
      devops: ["Docker", "GitHub Pages / CI", "Cloudflare"],
    },
    githubUrl: "https://github.com/jetaru",
    featured: false,
    status: "Producción",
    en: {
      title: "Systems Architecture Modeling & Diagramming Engine",
      subtitle: "Interactive Web Tool with GPU-Accelerated Vector Rendering",
      summary:
        "Web platform for modeling, diagramming, and orchestrating distributed system topologies and complex software architectures with multi-format export.",
      description:
        "Enables architecture and engineering teams to model distributed topologies, DAGs, and operational workflows with GPU-accelerated Canvas/SVG rendering and runtime validation rules.",
      role: "Senior Architect & Core Developer",
      architectureType: "Hexagonal / Ports & Adapters + Canvas Engine",
      tags: ["Diagramming", "Modeling", "Vector Graphics", "Clean Architecture", "Web Standards"],
      highlights: [
        "Reactive DAG-based diagramming engine with infinite in-memory undo/redo history.",
        "Hexagonal architecture isolating graphical calculation engines from presentation UI layers.",
        "High-fidelity vector export pipeline independent of backend rendering services.",
      ],
      metrics: [
        { label: "Rendering Performance", value: "60 FPS @ 5k nodes" },
        { label: "Modeling Speedup", value: "-60%" },
        { label: "Export Formats", value: "SVG, JSON, PDF, PNG" },
        { label: "Compatibility", value: "100% Web Standards" },
      ],
    },
  },

  // =========================================================================
  // CASO 7: Clean Core JS Engine
  // =========================================================================
  {
    id: "clean-core-engine",
    slug: "clean-core-engine",
    title: "Clean Core JS Engine",
    subtitle: "Micro-framework TypeScript con Arquitectura Limpia y DDD",
    summary:
      "Plantilla arquitectónica modular orientada a empresas para el despliegue rápido de microservicios backend robustos, desacoplados y testeables.",
    description:
      "Un esqueleto de grado industrial estructurado bajo Domain-Driven Design (DDD) y Clean Architecture. Diseñado para desacoplar las reglas de negocio de frameworks web y bases de datos, permitiendo migraciones tecnológicas sin tocar el núcleo de dominio.",
    role: "Creador & Mantenedor",
    architectureType: "Domain-Driven Design (DDD) + Clean Architecture",
    tags: ["TypeScript", "Clean Architecture", "DDD", "Framework", "Testing"],
    metrics: [
      { label: "Cobertura de Pruebas", value: "95%+" },
      { label: "Tiempo de Onboarding", value: "< 1 día" },
      { label: "Dependencias en Core", value: "0 (Pure Domain)" },
    ],
    highlights: [
      "Capa de dominio 100% aislada de dependencias externas (sin frameworks en el Core).",
      "Contratos estrictos mediante interfaces TypeScript para inversión de control (IoC).",
      "Manejador centralizado de errores, telemetría y validación de schemas con Zod.",
    ],
    techStack: {
      frontend: ["Next.js (Documentation Site)"],
      backend: ["Node.js", "TypeScript", "Express / Fastify Adapters"],
      database: ["Agnóstico (In-memory, PostgreSQL, MongoDB adapters)"],
      devops: ["GitHub Actions", "Jest / Vitest", "ESLint"],
    },
    githubUrl: "https://github.com/jetaru",
    featured: false,
    status: "Completado",
    en: {
      title: "Clean Core JS Engine",
      subtitle: "TypeScript Micro-framework with Clean Architecture & DDD",
      summary:
        "Modular enterprise-ready architecture template for rapidly scaffolding robust, decoupled, and highly testable backend services.",
      description:
        "Production-grade skeleton structured under Domain-Driven Design and Clean Architecture, decoupling core business logic from web frameworks and databases.",
      role: "Creator & Maintainer",
      architectureType: "Domain-Driven Design (DDD) + Clean Architecture",
      tags: ["TypeScript", "Clean Architecture", "DDD", "Framework", "Testing"],
      highlights: [
        "100% pure domain layer without external framework dependencies.",
        "Strict TypeScript interfaces enabling Dependency Inversion (IoC).",
        "Centralized error handling, telemetry, and Zod schema validations.",
      ],
      metrics: [
        { label: "Test Coverage", value: "95%+" },
        { label: "Onboarding Time", value: "< 1 day" },
        { label: "External Core Deps", value: "0 (Pure Domain)" },
      ],
    },
  },
];

export class MockProjectRepository implements IProjectRepository {
  async getAll(): Promise<Project[]> {
    return MOCK_PROJECTS;
  }

  async getBySlug(slug: string): Promise<Project | null> {
    const item = MOCK_PROJECTS.find((p) => p.slug === slug);
    return item || null;
  }

  async getFeatured(): Promise<Project[]> {
    return MOCK_PROJECTS.filter((p) => p.featured);
  }
}
