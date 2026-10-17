# 🛒 BazarDor — বাজার দর

### Daily Market Price Tracking Application

BazarDor is a modern, responsive, full-stack web application designed to help users explore and compare the daily prices of essential products in Bangladesh.

Built with **Next.js, TypeScript, Tailwind CSS, DaisyUI, Better Auth, and MongoDB Atlas**, the platform provides daily market price updates, product comparisons, price trends, and secure user authentication through a clean, user-friendly interface.

## ✨ Key Features

1. **Daily Market Prices** — Browse updated prices of 33 essential products across 8 categories.
2. **Live Price Ticker** — An infinite scrolling ticker displaying product names, current prices, and price changes.
3. **Price Trend Analysis** — Explore the top 6 products with increasing prices and the top 6 with decreasing prices.
4. **Category-Based Browsing** — Explore products by category and sort by price in ascending or descending order.
5. **Detailed Product Information** — View individual product prices, market-wise minimum and maximum prices, and estimated average prices.
6. **Secure Authentication** — Sign up and sign in using email and password with Better Auth and MongoDB.
7. **Protected Routes** — Restrict product details and profile pages to authenticated users.
8. **Profile Management** — View and update user information.
9. **Responsive Design** — Optimized for desktop, tablet, and mobile devices.
10. **Loading and Error Handling** — Skeleton loaders, custom 404 page, error states, and toast notifications.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Next.js 16 | Full-stack React framework |
| React | Component-based user interfaces |
| TypeScript | Type-safe application development |
| Tailwind CSS | Responsive styling |
| DaisyUI | UI components |
| Better Auth | User authentication |
| MongoDB Atlas | Cloud database |
| MongoDB Adapter | Database integration with Better Auth |
| Lucide React | Modern icons |
| React Hot Toast | Notifications |
| Vercel | Hosting and deployment |

## 🔐 Authentication

BazarDor uses Better Auth with MongoDB Atlas to securely manage accounts and sessions. Users can register, sign in, sign out, and update their profiles.

Google and GitHub OAuth authentication can also be configured using provider credentials.

## 📄 Main Pages

| Route | Description |
|---|---|
| `/` | Homepage and all products |
| `/category/[slug]` | Category products with sorting |
| `/product/[slug]` | Protected product details |
| `/signin` | Sign-in page |
| `/signup` | Registration page |
| `/profile` | User profile |
| `/profile/update` | Edit profile information |

## 🚀 Installation

**Clone the repository**

```bash
git clone https://github.com/halima-chowdhury-mahima/BazarDor.git
cd BazarDor
```

**Install dependencies**

```bash
npm install
```

**Create a `.env.local` file**

```env
MONGODB_URI="your_mongodb_connection_string"
BETTER_AUTH_SECRET="your_secret_key"
BETTER_AUTH_URL="http://localhost:3000"
```

**Run the application**

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## 🌐 Links

**GitHub Repository:** https://github.com/halima-chowdhury-mahima/BazarDor



## 👩‍💻 Developed By

**Halima Chowdhury Mahima**

Full Stack Web Developer

GitHub: https://github.com/halima-chowdhury-mahima

---

Made with Next.js, TypeScript, Tailwind CSS, and MongoDB.
