# 📊 Aplicación de Monitoreo (NOC)

Sistema de monitoreo de servicios en **TypeScript** con **Clean Architecture**. Verifica disponibilidad de servicios y guarda logs por severidad.

## 🏗️ Arquitectura

```
src/
├── domain/          # Lógica de negocio (entities, use-cases, contratos)
├── infrastructure/  # Implementaciones (datasources, repositories)
├── presentation/    # Orquestación (server, cron)
└── config/          # Variables de entorno
```

## 🚀 Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/Juan2007-sys/Aplicacion-Monitoreo.Ts.git
cd Aplicacion-Monitoreo.Ts
```

### 2. Reconstruir módulos (importante)
```bash
npm install
```
**Nota:** `node_modules/`, `dist/`, `logs/` y `.env` están en `.gitignore`, por lo que deben generarse localmente.

### 3. Configurar `.env`
```env
PORT=3000
MAILER_EMAIL=tu_email@example.com
MAILER_SECRET_KEY=tu_contraseña
PROD=false
```
**⚠️ Todas las variables son requeridas.**

## 🎯 Scripts

```bash
npm run dev      # Desarrollo con hot-reload
npm run build    # Compilar a JavaScript
npm start        # Producción
```

## 📦 Dependencias

**Producción:** `cron`, `dotenv`, `env-var`  
**Desarrollo:** `typescript`, `ts-node-dev`, `@types/node`, `rimraf`

## 🔧 Funcionamiento

- Cron job ejecuta cada 5 segundos
- Verifica disponibilidad de servicios (fetch)
- Guarda logs en `logs/` organizados por severidad (low, medium, high)

### Estructura de logs
```
logs/
├── logs-all.log      # Todos los logs
├── logs-medium.log   # Severidad media
└── logs-high.log     # Severidad alta
```

## 🛠️ Stack

TypeScript • Node.js • Cron • Clean Architecture

## 👨‍💻 Autor

**Juan Ovalle** - [@Juan2007-sys](https://github.com/Juan2007-sys)

## 📄 Licencia

ISC