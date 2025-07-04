# 📚 UserManagementAPI

A robust Spring Boot REST API for user management, supporting CRUD operations, bulk user creation, and pagination. Built for scalability and easy integration.

---

## 🚀 Features

| Feature                | Description                                      |
|------------------------|--------------------------------------------------|
| User CRUD              | Create, read, update, and delete users           |
| Bulk User Creation     | Add multiple users in a single request           |
| Pagination             | List users with pagination support               |
| Input Validation       | Ensures data integrity and correctness           |
| Mock Data Loading      | Load mock users for testing/demo                 |
| Comprehensive Testing  | JUnit & MockMvc test coverage                    |

---

## 🛠️ Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Backend    | Java 17, Spring Boot 3, Spring Data JPA |
| Database   | PostgreSQL (configurable)         |
| Testing    | JUnit 5, Spring Boot Test, MockMvc|
| Build Tool | Maven                             |

---

## ⚙️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/aadityakumar08/UserManagementAPI.git
   cd UserManagementAPI
   ```

2. **Configure the database**
   - Edit `src/main/resources/application.properties` with your PostgreSQL credentials.

3. **Build the project**
   ```bash
   mvn clean install
   ```

4. **Run the application**
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

| Method | Endpoint                  | Description                | Body Example |
|--------|---------------------------|----------------------------|--------------|
| POST   | `/api/users`              | Create a new user          | `{ "name": "John Doe", "email": "john@example.com" }` |
| POST   | `/api/users/multiple`     | Create multiple users      | `[ { "name": "Alice", "email": "alice@example.com" }, ... ]` |
| GET    | `/api/users`              | Get all users              |              |
| GET    | `/api/users/{id}`         | Get user by ID             |              |
| PUT    | `/api/users/{id}`         | Update user                | `{ "name": "New Name", "email": "new@example.com" }` |
| DELETE | `/api/users/{id}`         | Delete user                |              |
| GET    | `/api/users/mock`         | Get mock users             |              |
| GET    | `/api/users/page`         | Get paginated users        |              |

#### Example: Create User (cURL)
```bash
curl -X POST http://localhost:8080/api/users \
  -H 'Content-Type: application/json' \
  -d '{ "name": "John Doe", "email": "john@example.com" }'
```

---

## 🤝 Contributing

1. **Fork** the repo and create your branch from `main` or `testing`.
2. **Make your changes** and add tests.
3. **Ensure all tests pass:**  
   ```bash
   mvn test
   ```
4. **Submit a pull request** with a clear description.

For more details, see [CONTRIBUTING.md](CONTRIBUTING.md).

---

## 📫 Contact

- **Author:** Aditya Kumar  
- [LinkedIn](https://www.linkedin.com/in/aditya-kumar-302795254/)  
- [GitHub](https://github.com/aadityakumar08)  

--- 