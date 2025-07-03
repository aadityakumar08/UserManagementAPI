# User Management API

A Spring Boot-based RESTful API for managing user records with full CRUD operations, input validation, and PostgreSQL integration.

## 🚀 Features
- Add new users with name and email
- View all users or fetch a user by ID
- Update existing user data
- Delete users
- Input validation using Jakarta Bean Validation
- PostgreSQL database connectivity
- Uses Spring Data JPA for easy data handling

## 🛠️ Tech Stack
- Java 17+
- Spring Boot 3
- Spring Data JPA
- Hibernate
- PostgreSQL
- Maven

## 📁 Project Structure
```
UserManagementAPI/
├── src/
│   └── main/
│       ├── java/org/usermanag/UserManagementAPI/
│       │   ├── controller/UserController.java
│       │   ├── model/User.java
│       │   └── repository/UserRepository.java
│       └── resources/
│           └── application.properties
├── pom.xml
```

## 🔧 Getting Started
1. Clone the repository:
   ```sh
   git clone https://github.com/aadityakumar08/UserManagementAPI.git
   cd UserManagementAPI
   ```
2. Update `src/main/resources/application.properties` with your PostgreSQL credentials:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/userdb
   spring.datasource.username=your_db_username
   spring.datasource.password=your_db_password
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true
   ```
3. Run the application:
   ```sh
   mvn spring-boot:run
   ```

## 🧪 API Endpoints
- `GET /api/users` – Get all users
- `GET /api/users/{id}` – Get user by ID
- `POST /api/users` – Create new user
- `PUT /api/users/{id}` – Update user
- `DELETE /api/users/{id}` – Delete user

## License
This project is open source and available under the [MIT License](LICENSE). 