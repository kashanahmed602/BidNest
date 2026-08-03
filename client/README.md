# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.


client/
│
├── public/
│
├── src/
│   │
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── logo/
│   │
│   ├── components/
│   │   ├── Navbar/
│   │   ├── Footer/
│   │   ├── Buttons/
│   │   ├── Cards/
│   │   ├── Inputs/
│   │   ├── Loader/
│   │   └── Modal/
│   │
│   ├── pages/
│   │   ├── Auth/
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   │
│   │   ├── Home/
│   │   │   └── Home.jsx
│   │   │
│   │   ├── Auctions/
│   │   │   ├── Auctions.jsx
│   │   │   └── AuctionDetail.jsx
│   │   │
│   │   ├── Sell/
│   │   │   └── SellItem.jsx
│   │   │
│   │   ├── Dashboard/
│   │   │   ├── UserDashboard.jsx
│   │   │   └── AdminDashboard.jsx
│   │   │
│   │   ├── Profile/
│   │   │   └── Profile.jsx
│   │   │
│   │   ├── MyBids/
│   │   │   └── MyBids.jsx
│   │   │
│   │   ├── MyListings/
│   │   │   └── MyListings.jsx
│   │   │
│   │   ├── Wishlist/
│   │   │   └── Wishlist.jsx
│   │   │
│   │   └── NotFound/
│   │       └── NotFound.jsx
│   │
│   ├── layouts/
│   │   ├── MainLayout.jsx
│   │   ├── AuthLayout.jsx
│   │   └── DashboardLayout.jsx
│   │
│   ├── routes/
│   │   └── AppRoutes.jsx
│   │
│   ├── context/
│   │   └── AuthContext.jsx
│   │
│   ├── hooks/
│   │   ├── useAuth.js
│   │   └── useFetch.js
│   │
│   ├── services/
│   │   ├── axios.js
│   │   ├── authService.js
│   │   ├── auctionService.js
│   │   ├── bidService.js
│   │   └── userService.js
│   │
│   ├── utils/
│   │   ├── formatDate.js
│   │   ├── currency.js
│   │   └── validators.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .env
├── package.json
└── vite.config.js