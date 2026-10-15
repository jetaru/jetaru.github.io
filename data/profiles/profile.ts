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
        en: "Computer Science Engineer with 5+ years of experience specializing in high-performance Back-End development, data architecture, and modern mobile app development (Kotlin, Jetpack Compose, React Native). Expert in NestJS, .NET Core, Oracle SQL, SAP HANA, and OWASP API Security, leveraging AI assistants to accelerate delivery cycles.",
        es: "Ingeniero Civil en Informática con más de 5 años de experiencia especializándose en desarrollo Back-End de alto rendimiento, arquitectura de datos y desarrollo móvil moderno (Kotlin, Jetpack Compose, React Native). Experto en NestJS, .NET Core, Oracle SQL, SAP HANA y ciberseguridad OWASP, utilizando asistentes de IA para acelerar ciclos de entrega."
    },
    skills: [
        { category: "Mobile", items: ["Kotlin", "Java", "Jetpack Compose", "Android SDK", "React Native", "Background Services"] },
        { category: "Back-End & Cloud", items: ["NestJS", "Node.js", ".NET Core", "PHP (Laravel)", "Java (SpringBoot)", "REST APIs", "Microservices", "SAP BTP", "GCP (Firebase)"] },
        { category: "Databases & Architecture", items: ["SAP HANA", "Oracle SQL (10g/12c/19c)", "PostgreSQL", "Data Modeling", "Stored Procedures", "Clean Architecture", "MVVM/MVI", "SOLID"] },
        { category: "Security & Quality", items: ["OWASP Top 10", "Encryption & Hashing", "SonarQube", "KIUWAN", "Clean Code"] },
        { category: "DevOps & AI", items: ["Git", "Gradle", "CI/CD", "Scrum/XP", "GitHub Copilot", "ChatGPT"] }
    ],
    experience: [
        {
            company: "Genesys Ltda.",
            role: "Senior Back-End Engineer / Senior Android Developer",
            period: "Nov 2021 – Jun 2026",
            location: "Concepción, Chile",
            highlights: [
                "Led migration and modernization from legacy ASP.NET / Java systems to NestJS, Next.js, Kotlin, and Jetpack Compose.",
                "Designed data transformation layers in NestJS unifying complex payloads from external APIs and SAP HANA.",
                "Optimized transactional performance with advanced stored procedures and JSON processing in Oracle SQL and SAP HANA.",
                "Implemented OWASP security standards, mitigating CSRF and injection vulnerabilities verified by SonarQube & KIUWAN.",
                "Developed robust background GPS tracking services for logging trucks integrated with SAP BTP / HANA.",
                "Accelerated development and unit test coverage by integrating AI assistants (Copilot, ChatGPT)."
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