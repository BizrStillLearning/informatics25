## 🗄️ Database Schema Design

Pusat data platform **Informatics 25** menggunakan arsitektur relasional untuk mengelola data mahasiswa, struktur organisasi, dan arsip galeri.

### 1. Table: `users` (Admin Authentication)
| Field | Type | Constraint             | Description |
| :--- | :--- |:-----------------------| :--- |
| `id` | INT | Primary Key, AI        | Unique Identifier |
| `username` | VARCHAR(50) | Unique, Not Null       | Admin Login Username |
| `password` | VARCHAR(255) | Not Null               | Hashed Password (Bcrypt) |
| `role` | ENUM | 'superadmin', 'admin', | Access Level |
| `last_login` | TIMESTAMP | Nullable               | Last login activity trace |

### 2. Table: `students` (Student Directory)
| Field | Type | Constraint | Description |
| :--- | :--- | :--- | :--- |
| `id` | INT | Primary Key, AI | Internal ID |
| `nim` | VARCHAR(20) | Unique, Not Null | Student Identity Number |
| `full_name` | VARCHAR(100) | Not Null | Full Name |
| `slug` | VARCHAR(120) | Unique, Not Null | URL Friendly Name |
| `avatar` | VARCHAR(255) | Default: 'default.jpg' | Profile Picture Path |
| `domicile` | VARCHAR(100) | Nullable | Origin City |
| `school_origin` | VARCHAR(100) | Nullable | Previous High School |
| `hobby` | TEXT | Nullable | Student's Hobbies |
| `quote` | TEXT | Nullable | Personal Motivation Quote |
| `goal` | TEXT | Nullable | Future Career / Life Goal |
| `instagram` | VARCHAR(50) | Nullable | IG Username |
| `github` | VARCHAR(50) | Nullable | Github Username |
| `linkedin` | VARCHAR(100) | Nullable | LinkedIn Profile URL |

### 3. Table: `organization` (Organizational Structure)
| Field | Type | Constraint | Description |
| :--- | :--- | :--- | :--- |
| `id` | INT | Primary Key, AI | Structure ID |
| `student_id` | INT | Foreign Key | References `students.id` |
| `role_key` | VARCHAR(50) | Not Null | i18n Key (e.g., 'komting', 'wakil') |
| `order_priority`| INT | Default: 0 | Display Order (Lower = First) |

### 4. Table: `events` (Event & Activities)
| Field | Type | Constraint | Description |
| :--- | :--- | :--- | :--- |
| `id` | INT | Primary Key, AI | Event ID |
| `slug` | VARCHAR(120) | Unique, Not Null | URL Friendly Title |
| `category` | VARCHAR(50) | Not Null | Makrab, Kuliah, etc. |
| `date_event` | DATE | Not Null | Execution Date |
| `location` | VARCHAR(255) | Not Null | Venue / Points of Location |
| `thumbnail` | VARCHAR(255) | Not Null | Main Cover Image |
| `title_id` | VARCHAR(255) | Not Null | Title (Bahasa Indonesia) |
| `title_en` | VARCHAR(255) | Not Null | Title (English) |
| `desc_id` | TEXT | Nullable | Description (Bahasa Indonesia) |
| `desc_en` | TEXT | Nullable | Description (English) |

### 5. Table: `gallery_photos` (Visual Archives)
| Field | Type | Constraint | Description |
| :--- | :--- | :--- | :--- |
| `id` | INT | Primary Key, AI | Photo ID |
| `event_id` | INT | Foreign Key | References `events.id` |
| `image_path` | VARCHAR(255) | Not Null | File Storage Path |
| `caption` | VARCHAR(255) | Nullable | Short Photo Description |
| `created_at` | TIMESTAMP | Default: CURRENT_TIMESTAMP| Upload Time |

### 6. Table: `student_portfolios` (Student Projects)
| Field | Type | Constraint | Description |
| :--- | :--- | :--- | :--- |
| `id` | INT | Primary Key, AI | Project ID |
| `student_id` | INT | Foreign Key | References `students.id` |
| `title` | VARCHAR(255) | Not Null | Project Name |
| `description` | TEXT | Nullable | Short explanation of the project |
| `link` | VARCHAR(255) | Nullable | URL to the project (e.g., GitHub/Demo) |
| `thumbnail` | VARCHAR(255) | Nullable | Preview image of the project |

### 7. Table: `student_galleries` (Personal Photos)
| Field | Type | Constraint | Description |
| :--- | :--- | :--- | :--- |
| `id` | INT | Primary Key, AI | Photo ID |
| `student_id` | INT | Foreign Key | References `students.id` |
| `image_path` | VARCHAR(255) | Not Null | File Storage Path |
| `caption` | VARCHAR(255) | Nullable | Description of the photo |

---

### 🛠️ Entity Relationship Summary
* **One-to-One**: `organization.student_id` ➔ `students.id` (Setiap jabatan dipegang oleh satu mahasiswa).
* **One-to-Many**: `gallery_photos.event_id` ➔ `events.id` (Satu event memiliki banyak foto dokumentasi).
* **One-to-Many**: `student_portfolios.student_id` ➔ `students.id` (Satu mahasiswa bisa memiliki banyak karya).
* **One-to-Many**: `student_galleries.student_id` ➔ `students.id` (Satu mahasiswa bisa memiliki galeri foto pribadi).



