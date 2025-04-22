import json
import os

FILE_NAME = 'journal_entries.json'

# Function to add a new entry
def add_entry(entry):
    entries = load_entries()  # Load existing entries
    entries.append({"text": entry})  # Add new entry
    with open(FILE_NAME, 'w') as file:
        json.dump(entries, file)  # Save entries back to the file

# Function to load all entries
def load_entries():
    if not os.path.exists(FILE_NAME):  # Check if file exists
        return []  # If not, return an empty list
    with open(FILE_NAME, 'r') as file:
        return json.load(file)  # Read and return the entries from the file
