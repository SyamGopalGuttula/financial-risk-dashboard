import os
import sqlite3
import mysql.connector
import pandas as pd

# Get SQLite Path
base_dir = os.path.dirname(os.path.dirname(__file__))
sqlite_path = os.path.join(base_dir, "data", "snowflake_sim.db")

# Connect to SQLite
conn_sqlite = sqlite3.connect(sqlite_path)

# Read data from risk table
df = pd.read_sql_query('SELECT * FROM risk_data', conn_sqlite)

# Connect to AWS MySQL

rds_conn = mysql.connector.connect(
    host="financial-risk-db.c29owswq4sn8.us-east-1.rds.amazonaws.com",
    port=3306,
    user="admin",
    password="admin123"
)
rds_cursor = rds_conn.cursor()

# Create Database and Table
rds_cursor.execute("CREATE DATABASE IF NOT EXISTS financial_risk")
rds_cursor.execute("USE financial_risk")

rds_cursor.execute("""
CREATE TABLE IF NOT EXISTS risk_data_rds (
    id INT PRIMARY KEY,
    client VARCHAR(255),
    riskScore INT,
    category VARCHAR(50)
)
""")

# Insert data into database

insert_query = """
REPLACE INTO risk_data_rds (id, client, riskScore, category)
VALUES (%s, %s, %s, %s)
"""

# Loop through the DataFrame and insert each row
for _, row in df.iterrows():
    rds_cursor.execute(insert_query, (row['id'], row['client'], row['riskScore'], row['category']))

rds_conn.commit()  # Save all changes

print(f"Inserted {len(df)} rows into AWS RDS MySQL.")

# Close connections
rds_cursor.close()
rds_conn.close()
conn_sqlite.close()