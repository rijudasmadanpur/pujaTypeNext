# Express.js REST API Documentation
 
## Table of Contents
 
1. [Project Overview](#project-overview)
2. [Project Structure](#project-structure)
3. [Folder & File Descriptions](#folder--file-descriptions)
4. [Environment Configuration](#environment-configuration)
5. [Application Architecture](#application-architecture)
6. [Database Layer](#database-layer)
7. [Authentication System](#authentication-system)
8. [File Upload System](#file-upload-system)
9. [Logging System](#logging-system)
10. [Testing Framework](#testing-framework)
11. [Docker Configuration](#docker-configuration)
12. [API Structure](#api-structure)
 
## Project Overview
 
This is a Node.js backend REST API built with Express.js, designed for high-performance applications with JWT authentication, image upload capabilities, and comprehensive logging. The application uses Microsoft SQL Server with stored procedures exclusively for all database operations, ensuring optimal performance and security.
 
### Key Features
- **RESTful API Architecture**: Clean, resource-based API design
- **JWT Authentication**: Stateless authentication with refresh tokens
- **Image Upload & Management**: Secure file handling with URL-based storage
- **Stored Procedure Database Layer**: No ORM dependency, direct SQL Server integration
- **Comprehensive Logging**: Request logging with Winston and Morgan
- **Docker Containerization**: Development and test environment isolation
- **Unit & Integration Testing**: Jest-based testing framework
 
### Technology Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: Microsoft SQL Server (MSSQL)
- **Authentication**: JSON Web Tokens (JWT) + bcrypt
- **File Upload**: Multer
- **Logging**: Winston (file logging) + Morgan (HTTP request logging)
- **Testing**: Jest
- **Containerization**: Docker
 
## Project Structure
 
```
root/
├── config/              # Configuration files and settings
│   └── database.js      # Database connection configuration
├── controller/          # Route controllers (request handlers)
│   ├── auth.controller.js     # Authentication endpoints
│   ├── user.controller.js     # User management endpoints
│   ├── upload.controller.js   # File upload endpoints
│   └── health.controller.js   # Health check endpoints
├── docker/             # Docker configuration files
│   ├── Dockerfile.dev  # Development environment Docker setup
│   ├── Dockerfile.prod # Production environment Docker setup
│   └── docker-compose.yml # Multi-container setup
├── logs/               # Log files (auto-generated)
│   ├── combined.log    # All application logs
│   ├── error.log       # Error-specific logs
│   └── access.log      # HTTP request logs
├── middleware/         # Custom Express middleware
│   ├── auth.middleware.js     # JWT token validation
│   ├── error.middleware.js    # Global error handling
│   ├── logging.middleware.js  # Request logging setup
│   └── upload.middleware.js   # File upload validation
├── routes/             # API route definitions
│   ├── auth.routes.js  # Authentication routes
│   ├── user.routes.js  # User management routes
│   └── upload.routes.js # File upload routes
├── services/           # Business logic layer
│   ├── auth.service.js        # Authentication business logic
│   ├── database.service.js    # Database connection and SP execution
│   ├── user.service.js        # User-related business logic
│   └── upload.service.js      # File handling business logic
├── tests/              # Test files
│   ├── auth.test.js           # Authentication endpoint tests
│   ├── upload.test.js         # File upload tests
│   ├── integration/           # Integration tests
│   └── unit/                  # Unit tests
├── uploads/            # File storage directory
│   ├── images/         # Uploaded image files
│   └── temp/           # Temporary file storage
├── utils/              # Utility functions and helpers
│   ├── logger.js       # Winston logger instance
│   ├── response.js     # Standardized API response helpers
│   ├── validation.js   # Input validation helpers
│   └── constants.js    # Application constants
├── .env               # Environment variables (development)
├── .env.example       # Environment variables template
├── jest.setup.js      # Jest test configuration
├── app.js             # Express application setup
├── server.js          # Application entry point
├── package.json       # Node.js dependencies and scripts
└── README.md          # Project documentation
```
 
## Folder & File Descriptions
 
### `/config` Directory
**Purpose**: Centralized configuration management for different application components and environments.
 
- **`database.js`**: Contains SQL Server connection configuration including host, port, credentials, and connection pool settings. Used by the database service to establish and manage database connections.
 
### `/controller` Directory
**Purpose**: Houses route controllers that handle HTTP requests and responses. Controllers act as the interface between routes and business logic. Make folders as needed or versioning requires.
 
 
### `/docker` Directory
**Purpose**: Contains Docker configuration files for containerizing the application across different environments.
 
- **`Dockerfile`**: Development environment Docker configuration with hot-reload capabilities, development dependencies, and debugging tools.
 
- **`docker-compose.overrride.yml`**: Production environment Docker configuration optimized for performance, security, and minimal image size.
 
- **`docker-compose.yml`**: Multi-container setup defining services, networks, and volumes for development and testing environments.
 
### `/logs` Directory
**Purpose**: Auto-generated directory for storing application log files. Created by Winston logger at runtime.
 
- **`combined.log`**: Contains all application logs including info, warn, and error levels.
- **`error.log`**: Contains only error-level logs for easier error tracking.
- **`exception.log`**: Contains only the exception error logs.
- **`access.log`**: HTTP request logs generated by Morgan middleware.
 
### `/middleware` Directory
**Purpose**: Custom Express middleware functions that process requests before they reach controllers.
 
- **`auth.middleware.js`**: JWT token validation middleware that verifies and decodes tokens, populates user context, and handles authentication errors.
 
- **`error.middleware.js`**: Global error handling middleware that catches unhandled errors, formats error responses, and logs errors appropriately.
 
- **`upload.middleware.js`**: File upload validation middleware that checks file types, sizes, and handles upload errors before processing.
 
### `/routes` Directory
**Purpose**: Defines API endpoints and maps them to appropriate controllers. Organizes routes by feature/resource.
 
- **`auth.routes.js`**: Authentication-related routes (POST /login, POST /register, POST /logout, etc.)
- **`user.routes.js`**: User management routes (GET /profile, PUT /profile, etc.)
- **`upload.routes.js`**: File upload routes (POST /upload, DELETE /upload/:id, GET /files/:filename)
 
### `/services` Directory
**Purpose**: Contains business logic layer that handles complex operations, database interactions, and core application functionality.
 
- **`auth.service.js`**: Authentication business logic including password hashing, token generation/validation, and authentication workflows.
 
- **`database.service.js`**: Database connection management and stored procedure execution. Handles connection pooling, error handling, and query execution.
 
- **`user.service.js`**: User-related business logic including user creation, retrieval, updates, and user management operations.
 
- **`upload.service.js`**: File handling business logic including file processing, storage management, and database record creation for uploaded files.
 
### `/tests` Directory
**Purpose**: Comprehensive testing suite for unit tests, integration tests, and end-to-end tests.
 
- **`auth.test.js`**: Tests authentication endpoints, token validation, and authentication workflows.
- **`upload.test.js`**: Tests file upload functionality, validation, and error handling.
- **`integration/`**: Integration tests that test multiple components working together.
- **`unit/`**: Unit tests for individual functions and modules.
 
### `/uploads` Directory
**Purpose**: File storage location for uploaded files, organized by file types.
 
- **`images/`**: Stores uploaded image files with unique filenames.
- **`temp/`**: Temporary storage for files during processing before final storage.
 
### `/utils` Directory
**Purpose**: Utility functions and helpers used across the application.
 
- **`logger.js`**: Winston logger instance configuration and setup used throughout the application.
- **`response.js`**: Standardized API response formatting helpers ensuring consistent response structure.
- **`validation.js`**: Input validation helpers and custom validation functions.
- **`constants.js`**: Application-wide constants, enums, and configuration values.
 
### Root Files
 
#### `app.js`
**Purpose**: Express application setup and configuration. Contains middleware setup, route mounting, error handling setup, and application-level configuration. Separates app configuration from server startup.
 
#### `server.js`
**Purpose**: Application entry point that starts the HTTP server. Handles server startup, port binding, database connection initialization, and graceful shutdown procedures.
 
#### `.env`
**Purpose**: Environment-specific configuration variables including database credentials, JWT secrets, port numbers, and feature flags. Not committed to version control.
 
#### `.env.example`
**Purpose**: Template for environment variables showing required configuration without exposing sensitive values. Helps developers set up their local environment.
 
#### `jest.setup.js`
**Purpose**: Jest testing framework configuration including test environment setup, mock configurations, and global test utilities.
 
#### `package.json`
**Purpose**: Node.js project configuration including dependencies, scripts, and project metadata. Defines available npm scripts for development, testing, and deployment.
 
## Environment Configuration
 
### Environment Variables Structure
 
The application uses environment variables for configuration management across different environments (development, testing, production).
 
**Database Configuration**:
- `DB_SERVER`: SQL Server hostname or IP address
- `DB_PORT`: SQL Server port (default: 1433)
- `DB_DATABASE`: Database name
- `DB_USER`: Database username
- `DB_PASSWORD`: Database password
 
 
**JWT Configuration**:
- `JWT_SECRET`: Secret key for access token signing
- `JWT_EXPIRES_IN`: Access token expiration time
- `JWT_REFRESH_SECRET`: Secret key for refresh token signing
- `JWT_REFRESH_EXPIRES_IN`: Refresh token expiration time
 
**Server Configuration**:
- `PORT`: Application port number
- `NODE_ENV`: Environment mode (development/test/production)
 
**File Upload Configuration**:
- `MAX_FILE_SIZE`: Maximum file size in bytes
- `UPLOAD_PATH`: File storage directory path
- `ALLOWED_FILE_TYPES`: Comma-separated list of allowed MIME types
 
**Logging Configuration**:
- `LOG_LEVEL`: Minimum log level (error/warn/info/debug)
- `LOG_FILE_PATH`: Directory for log files
 
## Application Architecture
 
### Layered Architecture
The application follows a layered architecture pattern:
 
1. **Presentation Layer** (`/routes` + `/controller`): Handles HTTP requests/responses
2. **Business Logic Layer** (`/services`): Contains core application logic
3. **Cross-cutting Concerns** (`/middleware` + `/utils`): Handles logging, authentication, error handling
 
### Request Flow
1. HTTP request hits Express server
2. Request passes through middleware stack (logging, authentication, validation)
3. Route handler maps request to appropriate controller
4. Controller validates input and calls service layer
5. Service layer executes business logic and database operations
6. Response flows back through the stack with standardized formatting
 
## Database Layer
 
### Stored Procedure Architecture
The application exclusively uses stored procedures for all database operations:
 
**Benefits**:
- **Performance**: Pre-compiled execution plans
- **Security**: SQL injection prevention through parameterized execution
- **Maintainability**: Database logic centralized in database
- **Consistency**: Standardized data access patterns
 
**Database Service Responsibilities**:
- Connection pool management
- Stored procedure parameter binding
- Error handling and logging
- Transaction management
- Connection lifecycle management
 
## Authentication System
 
### JWT-Based Authentication
The authentication system uses JSON Web Tokens for stateless authentication:
 
**Components**:
- **Access Tokens**: Short-lived tokens for API access
- **Refresh Tokens**: Long-lived tokens for token renewal
- **Password Hashing**: bcrypt for secure password storage
- **Token Middleware**: Request authentication and user context population
 
**Security Features**:
- Password strength requirements
- Token expiration management
- Secure cookie storage for refresh tokens
- Rate limiting on authentication endpoints
 
## File Upload System
 
### Image Upload Architecture
The file upload system handles image uploads with database URL storage:
 
**Upload Process**:
1. Multer middleware handles multipart form data
2. File validation (type, size, format)
3. Unique filename generation
4. File storage to disk
5. Database record creation with file path
6. URL generation for frontend access
 
**Storage Strategy**:
- Local disk storage in `/uploads` directory
- Database stores file metadata and URLs
- Organized directory structure by file type
- Cleanup processes for orphaned files
 
## Logging System
 
### Dual Logging Approach
The application uses both Winston and Morgan for comprehensive logging:
 
**Winston Logger**:
- Application-level logging (errors, info, debug)
- File-based log storage
- Multiple log levels and formats
- Centralized logging configuration
- Database storage of logs for multi access and queryability
 
**Morgan HTTP Logger**:
- HTTP request/response logging
- Request timing and status codes
- Integration with Winston for unified logging
- Configurable log formats
 
**Log Management**:
- Automatic log rotation
- Error-specific log files
- Development vs production logging levels
- Log aggregation for monitoring
 
## Testing Framework
 
### Jest Testing Setup
Comprehensive testing framework covering multiple testing levels:
 
**Test Organization**:
- **Unit Tests**: Individual function and module testing
- **Integration Tests**: Multi-component interaction testing
- **API Tests**: Full endpoint testing with mocked dependencies
 
**Test Configuration**:
- Separate test database configuration
- Mocked external dependencies
- Test data setup and cleanup
- Coverage reporting and thresholds
 
## Docker Configurationv
 
### Multi-Environment Containerization
Docker setup supports different deployment scenarios:
 
**Development Container**:
- Hot-reload capabilities
- Development dependencies included
- Volume mounting for live code changes
- Debugging tools available
 
**Production Container**:
- Optimized for performance and security
- Minimal image size
- Production-only dependencies
- Non-root user execution
 
**Testing Container**:
- Isolated test environment
- Test database connections
- Automated test execution
- Coverage reporting
 
## API Structure
 
### RESTful Design Principles
The API follows REST conventions for predictable and intuitive endpoints:
 
**Resource Organization**:
- Authentication: `/api/auth/*`
- User Management: `/api/users/*`
- File Upload: `/api/upload/*`
- Health Checks: `/api/health`
 
**HTTP Methods**:
- GET: Resource retrieval
- POST: Resource creation
- PUT: Resource updates
- DELETE: Resource deletion
 
**Response Format**:
- Consistent JSON response structure
- Success/error status indicators
- Standardized error codes and messages
- Pagination for list endpoints
 
**Security Considerations**:
- Input validation on all endpoints
- Rate limiting for sensitive operations
- CORS configuration for cross-origin requests
- Security headers for protection
 
This architecture provides a robust, scalable, and maintainable foundation for REST API development with clear separation of concerns and comprehensive feature coverage.
 #   p u j a T y p e N e x t  
 