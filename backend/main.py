from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import uvicorn
import json

app = FastAPI()

# Pydantic model for request validation
class Medicine(BaseModel):
    name: str
    price: float

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Helper Functions ---

def load_data():
    """Helper to read the JSON database."""
    with open('data.json', 'r') as f:
        return json.load(f)

def save_data(data):
    """Helper to write to the JSON database."""
    with open('data.json', 'w') as f:
        json.dump(data, f, indent=4)

# --- API Endpoints ---

@app.get("/medicines")
def get_all_meds():
    return load_data()

@app.get("/medicines/{name}")
def get_single_med(name: str):
    data = load_data()
    for med in data["medicines"]:
        if med['name'] == name:
            return med
    return {"error": "Medicine not found"}

@app.post("/create")
def create_med(medicine: Medicine):
    """
    Creates a new medicine.
    Expects JSON body: {"name": "Name", "price": 10.0}
    """
    data = load_data()
    new_med = medicine.dict()
    data["medicines"].append(new_med)
    save_data(data)
    return {"message": f"Medicine created successfully with name: {medicine.name}"}

@app.post("/update")
def update_med(medicine: Medicine):
    data = load_data()
    for med in data["medicines"]:
        if med['name'] == medicine.name:
            med['price'] = medicine.price
            save_data(data)
            return {"message": f"Medicine updated successfully with name: {medicine.name}"}
    return {"error": "Medicine not found"}

@app.delete("/delete")
def delete_med(name: str):
    data = load_data()
    original_count = len(data["medicines"])
    data["medicines"] = [m for m in data["medicines"] if m['name'] != name]
    
    if len(data["medicines"]) < original_count:
        save_data(data)
        return {"message": f"Medicine deleted successfully with name: {name}"}
    return {"error": "Medicine not found"}

@app.get("/average-price")
def calculate_average_price():
    """Calculates the average price of all medicines."""
    data = load_data()
    medicines = data.get("medicines", [])
    
    # Filter out None or non-numeric prices
    valid_prices = [
        m["price"] for m in medicines 
        if m.get("price") is not None and isinstance(m["price"], (int, float))
    ]

    if not valid_prices:
        return {"error": "No valid prices found"}

    avg = sum(valid_prices) / len(valid_prices)
    return {"average_price": round(avg, 2)}

# --- Static Files Configuration ---
# This mounts the frontend to the root URL. 
# Ideally placed before the main execution block.
app.mount("/", StaticFiles(directory="../frontend", html=True), name="static")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)