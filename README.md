# Bidnest

Bidnest is a full-stack online marketplace and auction platform built with the MERN stack. Users can browse products, list items for sale, participate in live auctions, place bids, manage wishlists, and complete orders. Administrators can review listings, manage users, and monitor marketplace activity from a dedicated admin panel.

## Features

### Marketplace

- User registration and secure login
- Browse marketplace products and auction listings
- Product details with image galleries
- Create, edit, and delete product listings
- Add and remove products from a wishlist
- User profile and password management
- Order creation and order status tracking

### Auctions

- Create auctions with images and galleries
- Browse upcoming, live, and ended auctions
- Real-time bidding with Socket.IO
- Automatic auction status scheduling
- Winner tracking for completed auctions
- Auction purchase and payment flow

### Admin Panel

- Secure administrator login
- Dashboard overview
- Review and approve or reject products
- Review and approve or reject auctions
- View and manage registered users
- Update user account status
- Monitor products, auctions, and marketplace activity

## Tech Stack

### Frontend

- React 19
- Vite
- React Router DOM
- Axios
- Tailwind CSS
- Socket.IO Client
- Lucide React and React Icons

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
- bcrypt.js
- Socket.IO
- Multer
- express-rate-limit
- node-cron

### Integrations

- ImageKit for image uploads and media storage
- SafePay for online payments
- Cash on delivery support

## Project Structure

```
Bidnest/
├── admin/                         # React admin dashboard
│   ├── public/
│   └── src/
│       ├── Components/
│       ├── Layout/
│       └── Pages/
├── client/                        # React customer marketplace
│   ├── public/
│   └── src/
│       ├── Components/
│       ├── Layout/
│       ├── Pages/
│       ├── api/
│       └── socket.js
├── server/                        # Express API and Socket.IO server
│   └── src/
│       ├── Config/
│       ├── Controller/
│       ├── Cron/
│       ├── DB/
│       ├── Middleware/
│       ├── Models/
│       └── Routes/
└── README.md
```

## Authentication and Security

- JWT access and refresh tokens stored in HTTP-only cookies
- Password hashing with bcrypt.js
- Protected API routes for authenticated users
- Separate customer and administrator login flows
- CORS configuration for approved frontend origins
- Rate limiting for authentication and API requests

## API Overview

The API is served from `/api/v1`.

### Authentication and Users

```
POST   /api/v1/registerUser
POST   /api/v1/loginUser
POST   /api/v1/loginAdmin
GET    /api/v1/profile
PUT    /api/v1/profileUpdate
PUT    /api/v1/updatePassword
GET    /api/v1/users
PUT    /api/v1/updateStatus/:id
```

### Products

```
POST   /api/v1/createProduct
GET    /api/v1/products
GET    /api/v1/marketplaceProducts
GET    /api/v1/product/:id
PUT    /api/v1/productUpdate/:id
PUT    /api/v1/updateStatusProducts/:id
DELETE /api/v1/productDeleted/:id
```

### Auctions and Bidding

```
POST   /api/v1/createAuction
GET    /api/v1/auctions
GET    /api/v1/marketAuctions
GET    /api/v1/auction/:id
GET    /api/v1/pendingAuctions
POST   /api/v1/placeBid
GET    /api/v1/getWinner
PUT    /api/v1/auctionUpdated/:id
DELETE /api/v1/deletAuction/:id
```

### Wishlist, Orders, and Payments

```
PUT    /api/v1/addInToWishlist
PUT    /api/v1/removeFromWishlist
GET    /api/v1/wishlist
POST   /api/v1/paymentCreate
POST   /api/v1/paymentVerify
POST   /api/v1/paymentWebhook
```

## Installation

Clone the repository and install dependencies in each application:

```bash
git clone <repository-url>
cd Bidnest

cd client
npm install

cd ../admin
npm install

cd ../server
npm install
```

## Environment Variables

Create `server/.env`:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_access_token_secret
JWT_SECRET_REFRESH=your_refresh_token_secret
CORS_ORIGINS=http://localhost:5173,http://localhost:5174
CLIENT_URL=http://localhost:5173
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
SAFEPAY_PUBLIC_KEY=your_safepay_public_key
SAFEPAY_SECRET_KEY=your_safepay_secret_key
NODE_ENV=development
```

Create `client/.env`:

```env
VITE_API_URL=http://localhost:3000/api/v1
```

Keep `.env` files private and never commit real credentials to source control.

## Running the Project

Start the backend:

```bash
cd server
npm run dev
```

Start the customer frontend in a second terminal:

```bash
cd client
npm run dev
```

Start the admin frontend in a third terminal:

```bash
cd admin
npm run dev
```

The backend defaults to `http://localhost:3000`. Vite will display the local URLs for the customer and admin applications in their respective terminals.

## Production Builds

Build either frontend with:

```bash
npm run build
```

Run the production API server with:

```bash
cd server
npm start
```

## Author

**Kashan Ahmed**

BS Computer Science Student | MERN Stack Developer

## License

This project is developed for learning and portfolio purposes.