# Personal Details Management System

A full-stack application for managing personal, professional, and educational details.

## Tech Stack
- **Frontend**: React.js + Vite + Vanilla CSS
- **Backend**: Node.js + Hono (Express alternative for Edge)
- **Database**: Cloudflare D1 (Serverless SQLite)
- **Deployment**: Cloudflare Pages (Frontend) & Cloudflare Workers (Backend)

## Architecture Note
The backend uses **Hono** instead of Express.js. Standard Express.js relies heavily on Node.js core modules (like `http` and `net`) which are not fully supported natively in Cloudflare Workers V8 isolates. Hono provides the exact same routing and middleware patterns as Express but is built natively for Edge environments, perfectly supporting Cloudflare D1 bindings. This preserves the requested "Node.js + Express-like routing + D1" stack in the most robust way.

## Local Development Setup

### 1. Backend Setup
1. Open terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the local development server (it will automatically create a local SQLite DB for D1):
   ```bash
   npm run dev
   ```
   *The API will run on http://localhost:8787*
   
   *(Note: The very first time a request is made, Hono might need you to initialize the DB. To apply the schema locally, run `npx wrangler d1 execute personal_details_db --local --file=./schema.sql`)*

### 2. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file from the example if needed, ensuring `VITE_API_URL` points to `http://localhost:8787`.
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   *The UI will run on http://localhost:5173*

## Production Deployment (Cloudflare)

### Backend (Cloudflare Workers & D1)
1. Login to Cloudflare via CLI:
   ```bash
   npx wrangler login
   ```
2. Create the D1 Database:
   ```bash
   npx wrangler d1 create personal_details_db
   ```
3. Update `wrangler.toml` in the `backend` folder with the `database_id` returned from the previous step.
4. Apply the schema to the production database:
   ```bash
   npx wrangler d1 execute personal_details_db --remote --file=./schema.sql
   ```
5. Deploy the Worker:
   ```bash
   npm run deploy
   ```
6. Note the deployed URL (e.g., `https://personal-details-api.your-subdomain.workers.dev`).

### Frontend (Cloudflare Pages)
1. In the `frontend` folder, create a `.env.production` file:
   ```env
   VITE_API_URL=https://personal-details-api.your-subdomain.workers.dev
   ```
2. Build the project:
   ```bash
   npm run build
   ```
3. Deploy to Cloudflare Pages:
   ```bash
   npx wrangler pages deploy dist --project-name="personal-details-ui"
   ```

## Security & Data Privacy
- **Do not expose sensitive personal information publicly.** Implement authentication (like Cloudflare Access or JWT) on the `GET /api/forms` route in production.
- Cloudflare D1 provides automated backups, ensuring your data is safe.
