# Sistema de Biblioteca Full Stack

Trabalho final da disciplina de Frameworks Web II. O projeto consiste em uma API RESTful para gerenciamento de uma biblioteca (Autores e Livros) com autenticação JWT e documentação Swagger, consumida por um frontend em React.

## 👥 Integrantes do Grupo
* David Borges Santos

## 🛠 Tecnologias Utilizadas
**Backend:**
* Java 25 e Spring Boot 4
* Spring Data JPA (H2 em memória)
* Spring Security (JWT)
* Swagger / OpenAPI 3
* Lombok

**Frontend:**
* React 19 (Vite)
* React Router DOM
* Axios
* Material-UI (MUI)

## 🚀 Como rodar o projeto localmente

### Pré-requisitos
* Java 25+ (JDK)
* Node.js (v20+)
* Git

### 1. Backend
Abra o terminal na pasta `backend` e rode:
```bash
cd backend
./mvnw spring-boot:run
A API estará disponível em http://localhost:8080.
O Swagger pode ser acessado em: http://localhost:8080/swagger-ui/index.html.