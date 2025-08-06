# URL Shortener 

A lightweight URL shortening service built with **EJS**, **Node.js**, and **Express**. Easily convert long URLs into concise, shareable links.


## Features
- Shorten URLs into compact links.
- Screen out already shortened URLs from your own service.
- Basic analytics: count redirects per short link.
- Friendly UI using EJS templates.
create account, login, genrate and share
URL input → Submit → Generated short link → Redirects to target URL.

## Tech Stack
- **Backend:** Node.js + Express  
- **Templating:** EJS  
- **Database/storage:** mongoDB  
- **Routing & Validation**

## Installation

```bash
git clone https://github.com/0shashank1/url-shortener.git
cd url-shortener
npm install
```

## Configuration
1. Create a `.env` :
   ```dotenv
   PORT=8000
   BASE_URL=http://localhost:8000
   MONGODB_URI=mongodb://localhost:27017/url-shortener
   SESSION_SECRET=your_secret_key
   ```
2. If using a database, configure credentials or storage path accordingly.

## Usage

```bash
npm start
# or, during development:
npm run dev
```

- Visit `http://localhost:8000` (or your configured `BASE_URL`)
- Enter your long URL and submit — receive a short path like `http://.../xyz123`
- Navigating to that path redirects to the original URL

## API Endpoints

| Method | Endpoint        | Description                |
|:-------|:----------------|:---------------------------|
| `POST` | `/shorten`      | Accepts a long URL in JSON and returns a short code |
| `GET`  | `/:shortCode`   | Redirects to the original long URL, increments visit count |


```
##  Live Demo
🟢 [Click here to try the live URL Shortener](https://url-shortener-y82d.onrender.com)

---
