# ReturnLess — ready-to-run

This is a **complete** Create React App project — unlike the earlier zip,
this one already has `public/index.html`, a full `package.json` (react,
react-dom, react-router-dom, recharts, react-scripts), and a `.gitignore`.
You do not need to run `create-react-app` yourself or copy any files around.

## Run it

```bash
# 1. Unzip this, then open a terminal inside the returnless-app folder

# 2. Install dependencies (downloads node_modules — takes a minute)
npm install

# 3. Start the dev server
npm start
```

It should open **http://localhost:3000** automatically. If not, open that
URL yourself. You should land on the ReturnLess login page with Shopper /
Seller / Admin buttons.

## What's inside

```
returnless-app/
├── public/
│   └── index.html              # HTML shell, has the #root div React mounts into
├── src/
│   ├── App.jsx                 # Routes: / /shopper /seller /admin
│   ├── App.css                 # Global reset + shared layout
│   ├── index.js                # React entry point
│   ├── mockData/mockData.js    # Real Flipkart-derived product catalog + mock stats
│   ├── components/             # ProductCard, RiskPopup, StatCard, ChartCard
│   └── pages/                  # Login (email/password form), ShopperDashboard, SellerDashboard, AdminDashboard
├── flipkart_cleaned.csv        # Full cleaned dataset (12,677 rows) the catalog was sampled from
├── package.json
└── .gitignore
```

## If something goes wrong

- **"Missing script: start"** — you're in the wrong folder. `cd` into
  `returnless-app` (the one with this README) before running `npm start`.
- **Port 3000 already in use** — CRA will ask if you want to run on another
  port; type `y` and hit enter.
- **Blank white page in the browser** — open the browser console (F12) and
  check for an error there; paste it back if you're stuck.
