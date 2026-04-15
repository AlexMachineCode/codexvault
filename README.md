# CodexVault

CodexVault is a content management system designed to organize structured RPG data such as abilities, skills, items, and backgrounds.

The project focuses on building a clean and scalable full-stack architecture using modern tools like Next.js, tRPC, and Prisma.

---

##  Features

* Full CRUD system (Create, Read, Update, Delete)
* Content organized into:

  * Backgrounds
  * Skills
  * Abilities
  * Items
* Inline editing (update directly in the UI)
* Dynamic filtering by title
* Real-time updates using tRPC
* Responsive and minimal UI

---

##  Tech Stack

* **Frontend:** Next.js (App Router), React, TypeScript
* **Backend:** tRPC
* **Database:** Prisma ORM (SQLite for development)
* **Styling:** Tailwind CSS
* **Package Manager:** pnpm

---

##  Preview

> <img width="1914" height="841" alt="image" src="https://github.com/user-attachments/assets/594e13cd-c497-4778-b43e-2175b9e2ce56" />
> <img width="1911" height="826" alt="image" src="https://github.com/user-attachments/assets/fb2821c3-0cb6-47a6-adbb-8a0f7179bc20" />



---

##  Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/SEU-USUARIO/codexvault.git
cd codexvault
```

---

### 2. Install dependencies

```bash
pnpm install
```

---

### 3. Setup environment variables

Create a `.env` file in the root:

```env
DATABASE_URL="file:./dev.db"
```

---

### 4. Setup database

```bash
pnpm prisma db push
```

---

### 5. Run the development server

```bash
pnpm dev
```

Open:

```
http://localhost:3000
```

---

##  Example Content

You can test the system by creating entries like:

* **Ability:** Fireball
* **Skill:** Stealth
* **Item:** Sword
* **Background:** Soldier

---


##  Roadmap

* [ ] Add authentication (admin access control)
* [ ] Migrate database to PostgreSQL
* [ ] Deploy application (AWS / Vercel)
* [ ] Improve UI/UX (animations, feedback states)
* [ ] Add advanced filtering (by category, type, etc.)
* [ ] Add RPG-specific fields (mana cost, rarity, etc.)

---

##  Notes

* This project currently does not include authentication
* Admin actions (create/update/delete) are not protected yet
* SQLite is used for development only

---

##  Purpose

This project was built to practice full-stack development concepts including:

* API design with tRPC
* State management in React
* Database modeling with Prisma
* Clean UI structuring with Tailwind

---

## 👨‍💻 Author

**Alex Batista**
