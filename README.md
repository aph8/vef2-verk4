# Vefforritun 2 – Verkefni 4 (2025)

> Verkefni í Vefforritun 2 sem inniheldur bæði **Frontend** (React með Next.js) og **Backend** (Hono + Prisma).

---

## 🚀 Keyrsla verkefnis

Verkefnið er í tveimur möppum: **frontend** og **backend**.

**Ath:** Fyrir bæði frontend og backend þarf að hafa `.env` skrá (sjá neðar).

### 🟢 **Backend uppsetning**

Farðu í `backend` möppuna:

```bash
cd backend
npm install
```

Búðu til `.env` skrá í backend möppunni með eftirfarandi breytum:

```env
DATABASE_URL="postgresql://user:pass@localhost:5432/database"
STATIC_DATA=true
```

Settu upp gagnagrunninn með Prisma:

```bash
npx prisma db push
npx prisma db seed

# Ef þú vilt endursetja gagnagrunninn
npx prisma db push --force-reset
npx prisma db seed
```

Keyra backend:

```bash
npm run dev
```

---

### 🔵 **Frontend uppsetning**

Farðu í `frontend` möppuna:

```bash
cd frontend
npm install
```

Búðu til `.env` skrá í frontend möppunni með:

```env
NEXT_PUBLIC_API_BASE_URL="http://localhost:8080"
```

Keyra frontend:

```bash
npm run dev
```

---

## 🗂️ Verkefnauppsetning

```
vef2-verk4/
├── frontend/   # React með Next.js
├── backend/    # Hono API með Prisma
├── .gitignore
└── README.md
```

---

## 📚 Tækni notuð

| Frontend                 | Backend               |
|--------------------------|-----------------------|
| React                    | Node.js               |
| Next.js                  | Hono                  |
| React-hot-toast          | Prisma (PostgreSQL)   |
| CSS modules              | Zod                   |
| Framer Motion            | Vitest (fyrir test)   |

---

## 🔄 API endpoints (Backend)

**Categories**

- `GET /categories` – Sækja alla flokka
- `POST /categories` – Búa til flokk
- `GET /categories/:slug` – Sækja einn flokk
- `PATCH /categories/:slug` – Uppfæra flokk
- `DELETE /categories/:slug` – Eyða flokki

**Questions**

- `GET /questions` – Sækja spurningar
- `POST /questions` – Búa til spurningu með svörum

---

## 🖥️ Frontend síður

- `/` – Forsíða með yfirliti flokka
- `/category/:slug` – Spurningar innan flokks
- `/manage` – Bæta við spurningu
- `/manage-categories` – Stjórna flokkum (bæta við, breyta, eyða)

---

## 🔑 Auka virkni og UX

- Toast tilkynningar
- Smooth transitions og loading spinner
- Scroll-to-top hnappur
- Responsive layout og faglegt útlit

---

## ✅ Verkefnaskil

- Verkefnið sett upp á GitHub með skýrum möppum (`frontend`, `backend`)
- `.gitignore` notað rétt til að forðast að setja óþarfa skrár á GitHub
- Þetta README skjal fylgir með

---

## 👤 Höfundur

- **Andri Páll Helgason**
- **aph8@hi.is**
- **Vefforritun 2, 2025**

---