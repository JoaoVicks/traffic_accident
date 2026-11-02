# 🚦 Beltwise

### A data-driven platform for Brazilian traffic accident analysis and visualization.

Beltwise is an academic software engineering project focused on collecting, organizing, processing, and visualizing Brazilian traffic accident data. Its goal is to transform raw accident records into structured information that supports data analysis and helps identify patterns, trends, and high-risk locations on Brazilian roads.

The project is being developed as part of an undergraduate research initiative at the **Federal Institute of São Paulo (IFSP)**.

<p align="center">
  <img src="https://img.shields.io/badge/Java-Backend-orange?logo=openjdk" />
  <img src="https://img.shields.io/badge/Spring%20Boot-Framework-6DB33F?logo=springboot&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-Database-4169E1?logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Python-Data%20Processing-3776AB?logo=python&logoColor=white" />
  <img src="https://img.shields.io/badge/React-Frontend-61DAFB?logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/MapLibre-Mapping-396CB2?logo=maplibre&logoColor=white" />
</p>

---

## 📑 Table of Contents

- [🌎 Overview](#-overview)
- [🎯 Objectives](#-objectives)
- [⚙️ Features](#️-features)
- [🛠️ Technology Stack](#️-technology-stack)
- [🏗️ Architecture](#️-architecture)
- [🗃️ Data Model](#️-data-model)
- [📂 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [🗺️ Development Roadmap](#️-development-roadmap)
- [🎓 Project Context](#-project-context)

---

## 🌎 Overview

Traffic accidents are a significant public safety concern in Brazil. However, analyzing accident data requires organizing large datasets and making the information accessible through meaningful visualizations.

Beltwise addresses this challenge by providing a centralized platform for exploring traffic accident records, applying filters, and visualizing accident-related information.

The initial development focuses on data provided by the Brazilian Federal Highway Police (PRF), with the possibility of expanding the data scope through integration with RENAEST (National Traffic Accident and Statistics Registry).

## 🎯 Objectives

- Centralize Brazilian traffic accident data.
- Structure accident records and their related entities.
- Provide filtering capabilities for accident analysis.
- Visualize accident locations through interactive maps.
- Identify geographical areas with high accident and fatality concentrations.
- Support data-driven research and public safety analysis.

## ⚙️ Features

### 🚗 Accident Management and Analysis

- Detailed accident records.
- Related vehicle and participant information.
- Filtering by date, time, vehicle type, and accident classification.
- Structured representation of roads, cities, and geographical relationships.

### 🗺️ Interactive Map

- Geographical visualization of traffic accidents.
- Location-based exploration.
- Identification of areas with high concentrations of fatal accidents.

### 🔄 Data Processing

- Data extraction and transformation using Python.
- Data cleaning and structuring.
- Relational database persistence.
- Preparation of accident records for analytical queries.

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| ☕ Java | Backend development |
| 🍃 Spring Boot | Backend application framework |
| 🔗 Spring Data JPA | Database persistence and ORM |
| 🐘 PostgreSQL | Relational database |
| 🐍 Python | Data processing and ETL |
| 🐼 Pandas | Data manipulation and transformation |
| 🔌 SQLAlchemy | Database integration for Python |
| 🟦 TypeScript | Frontend development |
| ⚛️ React | User interface |
| 🌍 MapLibre | Interactive map visualization |
| 🐙 Git / GitHub | Version control and collaboration |

## 🏗️ Architecture

Beltwise follows a layered backend architecture, separating responsibilities to improve maintainability, organization, and scalability.

The backend is organized around domain entities and their relationships.

### Backend Layers

**🎮 Controller Layer**
- Exposes REST API endpoints.
- Handles incoming HTTP requests.
- Delegates operations to services.

**⚙️ Service Layer**
- Contains application and business logic.
- Coordinates operations between repositories and other services.
- Handles data retrieval and processing.

**🗄️ Repository Layer**
- Responsible for database access.
- Uses Spring Data JPA for persistence and queries.

**📦 DTO and Mapper Layer**
- Defines the data exposed through API responses.
- Separates internal persistence entities from external representations.
- Controls how related entities are represented in API responses.

### Data Flow

```text
       🖥️ Client Application
                |
                v
       🌐 REST API (Controller)
                |
                v
          ⚙️ Service Layer
                |
                v
         🗄️ Repository Layer
                |
                v
          🐘 PostgreSQL
```

## 🗃️ Data Model

The current domain model includes the following main entities:

| Entity | Responsibility |
|---|---|
| 🚨 Accident | Stores traffic accident information |
| 🚗 Vehicle | Represents vehicles involved in accidents |
| 👤 Participant | Represents people involved in accidents |
| 🛣️ Road | Stores road-related information |
| 🏙️ City | Represents municipalities |
| 🗺️ State | Represents Brazilian states |
| 🔗 RoadCity | Represents the relationship between roads and cities |

The model uses relational associations to represent the connections between accidents, vehicles, participants, and geographical information.

## 📂 Project Structure

The backend follows a domain-oriented package organization.

```text
beltwise-api/
├── src/
│   └── main/
│       ├── java/
│       │   └── com/example/beltwise_api/
│       │       ├── accident/
│       │       │   ├── controllers/
│       │       │   ├── dtos/
│       │       │   ├── mappers/
│       │       │   ├── models/
│       │       │   ├── repositories/
│       │       │   └── services/
│       │       ├── vehicle/
│       │       ├── participant/
│       │       ├── road/
│       │       ├── city/
│       │       └── state/
│       └── resources/
│           └── application.properties
└── pom.xml
```

## 🚀 Getting Started

### 📋 Prerequisites

- Java (version compatible with the project's Spring Boot configuration).
- PostgreSQL.
- Maven.
- Git.

### 1. 📥 Clone the repository

```bash
git clone <REPOSITORY_URL>
cd beltwise-api
```

### 2. 🗄️ Configure the database

Create a PostgreSQL database for the application.

Configure the database connection in your application properties or environment variables.

Example:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/beltwise
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
```

### 3. ▶️ Run the application

```bash
./mvnw spring-boot:run
```

On Windows:

```bash
mvnw.cmd spring-boot:run
```

## 🗺️ Development Roadmap

- [x] Initial domain modeling.
- [x] Spring Boot backend foundation.
- [x] PostgreSQL integration.
- [x] Initial accident retrieval endpoint.
- [x] Structured API responses using DTOs and mappers.
- [x] Detailed accident information endpoint.
- [x] Advanced accident filtering.
- [x] Interactive accident map.
- [x] Geographical accident analysis.
- [x] Identification of high-fatality locations.
- [x] Expanded data integration.

## 🎓 Project Context

Beltwise is developed within an academic research context at the **Federal Institute of São Paulo (IFSP)**.

The project combines software engineering, data engineering, relational database modeling, and geographical visualization to explore how technology can contribute to traffic safety analysis.

Its development emphasizes maintainable backend architecture, efficient data retrieval, and meaningful presentation of information.

---

<p align="center">
  <strong>🚦 Beltwise — Turning traffic data into meaningful insights.</strong>
</p>
