# UserManagementAPI

A robust Spring Boot REST API for user management, supporting CRUD operations, bulk user creation, and pagination. Built for scalability and easy integration.

---

## 🚀 Features
- Create, read, update, and delete users
- Bulk user creation (POST multiple users)
- Pagination support for user listing
- Input validation
- Mock data loading for testing
- Comprehensive test coverage

---

## 🛠️ Tech Stack
- **Backend:** Java 17, Spring Boot 3, Spring Data JPA
- **Database:** PostgreSQL (configurable)
- **Testing:** JUnit 5, Spring Boot Test, MockMvc
- **Build:** Maven

---

## ⚙️ Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/aadityakumar08/UserManagementAPI.git
   cd UserManagementAPI
   ```
2. **Configure the database:**
   - Edit `src/main/resources/application.properties` with your PostgreSQL credentials.
3. **Build the project:**
   ```bash
   mvn clean install
   ```
4. **Run the application:**
   ```bash
   mvn spring-boot:run
   ```

---

## 🧪 Running Tests

```bash
mvn test
```

---

## 📚 API Endpoints

### User CRUD
- **Create User:**
  - `POST /api/users`
  - Body: `{ "name": "John Doe", "email": "john@example.com" }`
- **Bulk Create Users:**
  - `POST /api/users/multiple`
  - Body: `[ { "name": "Alice", "email": "alice@example.com" }, ... ]`
- **Get All Users:**
  - `GET /api/users`
- **Get User by ID:**
  - `GET /api/users/{id}`
- **Update User:**
  - `PUT /api/users/{id}`
  - Body: `{ "name": "New Name", "email": "new@example.com" }`
- **Delete User:**
  - `DELETE /api/users/{id}`
- **Get Mock Users:**
  - `GET /api/users/mock`
- **Paginated Users:**
  - `GET /api/users/page?page=0&size=10&sort=name,asc`

### Example: Create User (cURL)
```bash
curl -X POST http://localhost:8080/api/users \
  -H 'Content-Type: application/json' \
  -d '{ "name": "John Doe", "email": "john@example.com" }'
```

---

## 🤝 Contributing

1. Fork the repo and create your branch from `main` or `testing`.
2. Make your changes and add tests.
3. Ensure all tests pass: `mvn test`
4. Submit a pull request with a clear description.

---

## 📫 Contact
- **Author:** Aditya Kumar
- [LinkedIn](https://www.linkedin.com/in/aditya-kumar-302795254/)
- [GitHub](https://github.com/aadityakumar08)

--- 