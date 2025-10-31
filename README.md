<h1 align="center">⚽ Football QueryBuilder API</h1>

<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="90" alt="NestJS Logo"/>
</p>

<p align="center">
  <b>RESTful API for managing football data — built with NestJS, TypeORM, and MySQL</b><br/>
  Featuring elegant QueryBuilder examples, clean architecture, and real-world relationships between Teams, Players, Coaches, and Matches.
</p>

---

## 🧩 Overview

**Football QueryBuilder API** is a lightweight backend built with **NestJS** and **TypeORM** that demonstrates:
- Proper modular architecture (Repository → Service → Controller)
- Realistic database relationships (OneToMany, ManyToOne, OneToOne)
- Smart and clean **QueryBuilder** usage
- Swagger documentation for all endpoints

---

## ⚙️ Tech Stack

| Layer | Technology | Purpose |
|-------|-------------|----------|
| ⚙️ Backend | [NestJS](https://nestjs.com/) + TypeScript | Framework for scalable backend |
| 🗄️ Database | MySQL + [TypeORM](https://typeorm.io/) | ORM and relational data mapping |
| 📦 Validation | class-validator + class-transformer | DTO data validation |
| 📚 Documentation | Swagger (via @nestjs/swagger) | API documentation |
| 🧠 Architecture | Repository Pattern | Clean business separation |
| 🚀 Dev Tools | TablePlus, Postman | Testing and DB management |

---

## 🧱 Entities & Relationships

```bash
Team 1 — 1 Coach
Team 1 — * Players
Team 1 — * Matches (home)
Team 1 — * Matches (away)
