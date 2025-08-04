import os
import json
from json import JSONDecodeError

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# === CORS setup ===
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],            # <-- allow all origins; replace with your React app URL in production
    allow_credentials=True,
    allow_methods=["*"],            # <-- allows GET, POST, OPTIONS, etc.
    allow_headers=["*"],            # <-- allows Content-Type, Authorization, etc.
)

# === Data model ===
class RequestModel(BaseModel):
    name: str

# === JSON file utilities ===
FILE_PATH = "requests.json"

def read_requests() -> list[str]:
    if not os.path.exists(FILE_PATH):
        return []
    with open(FILE_PATH, "r") as f:
        try:
            return json.load(f)
        except JSONDecodeError:
            return []

def write_requests(data: list[str]) -> None:
    with open(FILE_PATH, "w") as f:
        json.dump(data, f, indent=2)

# === Endpoints ===
@app.get("/requests")
def get_requests():
    items = read_requests()
    return {"requests": items}

@app.post("/requests")
def add_request(item: RequestModel):
    items = read_requests()
    items.append(item.name)
    write_requests(items)
    return {"status": "ok", "requests": items}