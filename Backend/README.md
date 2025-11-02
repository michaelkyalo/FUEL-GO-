# Fuel App — Backend (Flask)

This folder contains a minimal Flask backend used by the frontend for storing and retrieving fuel orders.

Quick start

1. Create a virtual environment and activate it:

   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   ```

2. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```


3. Run the server:

   ```bash
   python app.py
   ```

   The server listens on port 5000 by default. API endpoints are:
   - GET  /api/ping
   - GET  /api/orders
   - POST /api/orders  (JSON: { fuelType, litres, pricePerLitre })
   - DELETE /api/orders

Notes
- Data is persisted to `orders.db` (SQLite) in this directory. The database and tables are created automatically when the server first starts.
- CORS is enabled for `/api/*` so the Vite dev server (usually on port 5173/5174) can call the API.