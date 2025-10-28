# 🍕 Cheezious Frontend (Next.js)

## 📖 Overview

This is the **frontend** of the Cheezious web application, built with **Next.js 15**, **Tailwind CSS**, and **Radix UI**. It provides a smooth, responsive, and modern interface for browsing menus, managing orders, and accessing user accounts.

Deployed on **Vercel** → [cheezious-app.vercel.app](https://cheezious-app.vercel.app/)

---

## ⚙️ Tech Stack

* **Next.js 15** (App Router)
* **React 19**
* **Tailwind CSS 4**
* **Radix UI Components**
* **Lucide Icons**
* **Axios** for API requests
* **Recharts** for dashboard stats
* **React Hook Form** for form handling
* **Swiper** for carousels
* **Leaflet** for maps
* **Vaul** & **Sonner** for UI effects

---

## 🧰 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/hamzafaiz17/cheezious-app-frontend.git
cd cheezious-app-frontend
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Setup Environment Variables

Create a `.env` file in the root directory and add the following:

```bash
NEXT_PUBLIC_API_BASE_URL=https://api-cheezious.onrender.com/api
NEXT_PUBLIC_API_VERSION=/v1/
```

### 4️⃣ Run Dev Server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000)

---

## 📂 Folder Structure

```
app/
│
├── (public pages)
│   ├── page.tsx (Home)
│   ├── menu/
│   ├── cart/
│   ├── checkout/
│   ├── track-my-order/[id]/
│
├── auth/
│   ├── login/
│   │   ├── page.tsx
│   │   ├── email-address/
│   │   └── otp/
│   ├── register/
│   │   ├── page.tsx
│   │   └── otp-verify/
│
├── account/
│   ├── edit-profile/
│   ├── order-history/
│   ├── favourites/
│   ├── saved-addresses/
│   └── promos/
│
├── admin/
│   ├── login/
│   ├── register/
│   └── otp-verify/
│
├── dashboard/
│   ├── page.tsx
│   ├── categories/
│   ├── orders/
│   ├── products/
│   └── users/
│
└── privacy-policy/
```

---

## 🌐 API Connection

Frontend connects to the backend hosted on Render:

```
Base URL: https://api-cheezious.onrender.com/api/v1/
```

All product, user, order, and category data is fetched using Axios.

---

## 🧾 Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build production bundle  |
| `npm start`     | Run production build     |
| `npm run lint`  | Run ESLint checks        |

---

## 🚀 Deployment

Hosted on **Vercel**  → [https://cheezious-app.vercel.app/](https://cheezious-app.vercel.app/)

---

## 👨‍💻 Author

**Hamza Faiz**
