# TokenView Dashboard

![GitHub last commit](https://img.shields.io/github/last-commit/rachell444/token-view)
![GitHub repo size](https://img.shields.io/github/repo-size/rachell444/token-view)
![API Status](https://img.shields.io/badge/API-Operational-success)

## Description

TokenView Dashboard is a modern application for visualizing real-time cryptocurrency data. It features an intuitive interface and interactive charts to make crypto market tracking easy and efficient.

## Main Features

- **Real-time updates:** Cryptocurrency data refreshes every 30 seconds
- **Advanced visualizations:** 6 different chart types to analyze the market
- **Responsive design:** Works seamlessly on both desktop and mobile devices
- **Data redundancy:** Multiple data sources to ensure up-to-date information

## Screenshots

### Dark Mode

![Dashboard in dark mode](public/dark-mode.jpg)

### Light Mode

![Dashboard in light mode](public/light-mode.jpg)

## Quick Start

### Prerequisites

- Node.js (v14.0 or higher)
- npm (v6.0 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rachell444/token-view.git
   cd token-view
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Iniciar la aplicación
   ```bash
   npm start
   ```

4. Abrir http://localhost:3000 en tu navegador

## Estructura del Proyecto

```
src/
├── components/      # Componentes reutilizables
│   ├── charts/       # Componentes de gráficos (BarChart, PieChart, etc.)
│   ├── statistics/    # Componentes de estadísticas
│   └── tables/        # Componentes de tablas
├── layout/          # Componentes de estructura (Header, Sidebar, etc.)
├── pages/           # Páginas principales
├── theme/           # Configuración del tema (colores, tipografía)
├── tests/           # Pruebas unitarias
└── index.js         # Punto de entrada
```

## Personalización

### Colores

Para modificar los colores, edita el archivo `src/theme/theme.js`.

### Tipografía

Para cambiar las fuentes, añade la nueva fuente en `public/index.html` y modifica `src/theme/typography.js`.

### Gráficos

Los gráficos se pueden personalizar editando los archivos en `src/components/charts/`.

## Pruebas

Ejecuta las pruebas con el siguiente comando:

```bash
npm test
```

## Contribución

Las contribuciones son bienvenidas. Para cambios importantes, por favor abre primero un issue para discutir lo que te gustaría cambiar.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - consulta el archivo LICENSE para más detalles.

## Contacto

Rachell Moron - [@rachell444](https://github.com/rachell444)

Link del proyecto: [https://github.com/rachell444/token-view](https://github.com/rachell444/token-view)
