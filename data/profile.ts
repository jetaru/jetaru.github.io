export const profileData = {
    personalInfo: {
        name: "Jorge Eduardo Thompson Alvarado",
        titleMobile: "Senior Mobile Developer (Android & React Native)",
        titleBackend: "Senior Back-End Engineer & Data Architect",
        location: "San Pedro de la Paz, Chile",
        availability: "Immediate Availability (Remote / Hybrid)",
        email: "a.thompson.jorge@gmail.com",
        phone: "+56982456154",
        linkedin: "https://linkedin.com/in/jorge-e-thompson-alvarado",
        github: "https://github.com/jetaru",
        englishLevel: "Intermediate (B1/B2)"
    },
    summary: {
        en: "Computer Science Engineer with 5+ years of experience specializing in high-performance Back-End development, data architecture, and modern mobile app development (Kotlin, Jetpack Compose, React Native). Expert in NestJS, .NET Core, Oracle SQL, SAP BTP / SAP PO / SAP HANA, Azure, and Offline-First architectures with OWASP API Security, leveraging AI assistants to accelerate delivery cycles.",
        es: "Ingeniero Civil en Informática con más de 5 años de experiencia especializándose en desarrollo Back-End de alto rendimiento, arquitectura de datos y desarrollo móvil moderno (Kotlin, Jetpack Compose, React Native). Experto en NestJS, .NET Core, Oracle SQL, SAP BTP / SAP PO / SAP HANA, Azure y arquitecturas Offline-First con ciberseguridad OWASP, utilizando asistentes de IA para acelerar ciclos de entrega."
    },
    skills: [
        { category: "Mobile", items: ["Kotlin", "Java", "Jetpack Compose", "Android SDK", "React Native", "Offline-First Architecture", "Background Services"] },
        { category: "Back-End & Cloud", items: ["NestJS", "Node.js", ".NET Core", "SAP BTP", "SAP PO (Process Orchestration)", "Azure (Entra ID, App Services)", "Microservices", "REST APIs", "GCP (Firebase)"] },
        { category: "Databases & Architecture", items: ["SAP HANA", "Oracle SQL (10g/12c/19c)", "PostgreSQL", "Clean Architecture", "Transactional Outbox", "Data Modeling", "Stored Procedures (PL/SQL)", "MVVM/MVI", "SOLID"] },
        { category: "Security & Quality", items: ["OWASP Top 10", "SSL Pinning", "Encryption & Hashing", "SonarQube", "KIUWAN", "Clean Code"] },
        { category: "DevOps & AI", items: ["Git", "Docker", "CI/CD", "Scrum/XP", "GitHub Copilot", "ChatGPT"] }
    ],
    experience: [
        {
            company: "Genesys Ltda.",
            role: "Senior Back-End Engineer / Senior Android Developer",
            period: "Nov 2021 – Jun 2026",
            location: "Concepción, Chile",
            highlights: [
                "Architected and implemented the backend for Supplier Logistics Hub (BFF in NestJS / Node.js and Oracle SQL) for high-concurrency online onboarding and validation of transport fleets, drivers, and technical licenses.",
                "Engineered the Convector BTP transactional backend for railway logistics and industrial train convoy dispatching, developing high-performance PL/SQL packages in Oracle SQL and integration endpoints with SAP BTP for dispatch events (SIM-F9902) and volumetric measurement.",
                "Developed the VALDOR mobile application and background tracking services for continuous GPS telematics, transport mission orchestration, breakdown (panne) transfer control, and mobile security enforced with SSL Pinning (OWASP MASVS).",
                "Led the modernization of the Chemical Industrial Inspection system under Clean Architecture and Offline-First, orchestrating asynchronous ingestion with SAP PO (Process Orchestration) and Zero Trust federated authentication with Microsoft Entra ID.",
                "Evolved the SISPAT field inspection platform and operational checklists, implementing conditional multi-event logic upon non-compliance and two-way data sync with Oracle SQL.",
                "Optimized transactional performance with advanced stored procedures and JSON processing in Oracle SQL and SAP HANA, mitigating bottlenecks in high-demand industrial workflows."
            ]
        },
        {
            company: "PlagaStop Ltda.",
            role: "Back-End & Android Developer",
            period: "Nov 2020 – Dec 2021",
            location: "Concepción, Chile",
            highlights: [
                "Designed RESTful API architecture using PHP/Laravel for field reports and QR scanning.",
                "Orchestrated PostgreSQL database modeling with indexed queries for fast audit record retrieval."
            ]
        }
    ],
    education: {
        degree: "Computer Science Engineering (Ingeniería Civil en Informática)",
        institution: "Universidad del Bío-Bío, Chile",
        year: "2021",
        honors: "Lean Software Development Workshop Diploma"
    }
};
