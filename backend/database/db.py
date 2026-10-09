import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import mysql.connector
from config.settings import DB_HOST, DB_USER, DB_PASS, DB_NAME

def get_connection():
    try:
        # ✅ Debug print to verify .env values
        print("DB_HOST =", DB_HOST)
        print("DB_USER =", DB_USER)
        print("DB_NAME =", DB_NAME)

        connection = mysql.connector.connect(
            host=DB_HOST,           # This should print "127.0.0.1"
            user=DB_USER,
            password=DB_PASS,
            database=DB_NAME
        )

        if connection.is_connected():
            print("✅ Database connected successfully")
            return connection
        else:
            print("❌ Failed to connect to database")
            return None

    except Exception as e:
        print(f"❌ Error connecting to database: {e}")
        return None




