# -*- coding: utf-8 -*-
"""
Created on Sat May 10 00:16:21 2025

@author: prana
"""

try:
    import mysql.connector
    print("MySQL connector is installed.")
except ImportError:
    print("MySQL connector is NOT installed.")
