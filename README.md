# Financial Risk Dashboard – Fullstack Data Engineering Project

This project simulates a real-world SDLC workflow for a Senior Data Fullstack Engineer role. It includes:

- A Node.js backend that writes mock financial risk data into SQLite
- A Python ETL pipeline that extracts from SQLite and loads into AWS RDS MySQL
- Git-based SDLC practices using feature branches

## Folder Structure

```
financial-risk-dashboard/
├── backend/         # Express API
├── data/            # SQLite DBs
├── etl/             # Python ETL scripts
├── frontend/        # (To be added) React dashboard
```

## Tech Stack

- Node.js + Express (backend)
- SQLite (Snowflake simulation)
- Python 3.13 + Pandas + mysql-connector-python
- AWS RDS MySQL
- Git & GitHub (SDLC workflow)

## How to Run

### 1. Start Backend API

```bash
cd backend
npm install
node index.js
```

### 2. Run Python ETL

```bash
pip install -r requirements.txt  # or manually install: pandas, mysql-connector-python, python-dotenv
```

Create a `.env` file inside `etl/` with:

```
RDS_HOST=your-rds-endpoint
RDS_PORT=3306
RDS_USER=admin
RDS_PASSWORD=yourpassword
```

Run ETL:

```bash
cd etl
python load_to_rds.py
```

## Security Notes

- Do not commit `.env` files
- Add `etl/.env` to `.gitignore`

## Features Completed

- [x] Backend API + SQLite ingestion
- [x] Python ETL to AWS RDS
- [x] Secure environment management
- [x] Git feature branch merges
