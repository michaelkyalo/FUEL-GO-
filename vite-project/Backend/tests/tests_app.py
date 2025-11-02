import os
import tempfile
import json

import pytest

from backend import app, db


@pytest.fixture
def client(tmp_path, monkeypatch):
    # Use a temporary sqlite file for tests
    db_file = tmp_path / "test_orders.db"
    monkeypatch.setenv("TEST_DB_PATH", str(db_file))

    # Override database URI
    app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{db_file}"
    app.config["TESTING"] = True

    with app.app_context():
        db.create_all()

    with app.test_client() as client:
        yield client

    # cleanup
    try:
        os.remove(str(db_file))
    except Exception:
        pass


def test_ping(client):
    rv = client.get("/api/ping")
    assert rv.status_code == 200
    data = rv.get_json()
    assert data["status"] == "ok"


def test_add_get_clear_orders(client):
    # Ensure empty initially
    rv = client.get("/api/orders")
    assert rv.status_code == 200
    assert rv.get_json() == []

    # Add an order
    payload = {"fuelType": "diesel", "litres": 10, "pricePerLitre": 170}
    rv = client.post("/api/orders", data=json.dumps(payload), content_type="application/json")
    assert rv.status_code == 201
    created = rv.get_json()
    assert created["fuelType"] == "diesel"
    assert created["cost"] == 1700

    # Get orders
    rv = client.get("/api/orders")
    assert rv.status_code == 200
    data = rv.get_json()
    assert len(data) == 1

    # Clear orders
    rv = client.delete("/api/orders")
    assert rv.status_code == 200
    resp = rv.get_json()
    assert resp["status"] == "cleared"