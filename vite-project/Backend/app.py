from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime
import os

from models import db, User, Order
from auth import token_required, create_token

app = Flask(__name__)

# Database setup
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{os.path.join(BASE_DIR, 'fuel.db')}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SECRET_KEY"] = "your-secret-key"

CORS(app)
db.init_app(app)

# Create DB tables
with app.app_context():
    db.create_all()

# ---------------- AUTH ---------------- #

@app.route("/api/register", methods=["POST"])
def register():
    data = request.get_json() or {}
    
    if not all(k in data for k in ["name", "email", "password"]):
        return jsonify({"error": "Name, email and password required"}), 400

    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"error": "Email already exists"}), 400

    user = User(name=data["name"], email=data["email"])
    user.set_password(data["password"])

    db.session.add(user)
    db.session.commit()

    token = create_token(user)
    return jsonify({"token": token, "user": user.to_dict()}), 201


@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json() or {}

    user = User.query.filter_by(email=data.get("email")).first()
    if not user or not user.check_password(data.get("password")):
        return jsonify({"error": "Invalid credentials"}), 401

    token = create_token(user)
    return jsonify({"token": token, "user": user.to_dict()})


@app.route("/api/me", methods=["GET"])
@token_required
def me():
    return jsonify(request.current_user.to_dict())

# ---------------- ORDERS ---------------- #

@app.route("/api/orders", methods=["POST"])
@token_required
def place_order():
    data = request.get_json() or {}

    if not all(k in data for k in ["fuelType", "litres", "pricePerLitre"]):
        return jsonify({"error": "fuelType, litres, pricePerLitre required"}), 400

    litres = float(data["litres"])
    price = float(data["pricePerLitre"])

    order = Order(
        user_id=request.current_user.id,
        fuel_type=data["fuelType"],
        litres=litres,
        price_per_litre=price,
        total_cost=litres * price,
        status="pending",
        created_at=datetime.utcnow()
    )

    db.session.add(order)
    db.session.commit()
    return jsonify(order.to_dict()), 201


@app.route("/api/orders", methods=["GET"])
@token_required
def get_orders():
    orders = Order.query.filter_by(user_id=request.current_user.id).all()
    return jsonify([o.to_dict() for o in orders])


@app.route("/api/orders/<int:id>", methods=["PATCH"])
@token_required
def update_order(id):
    order = Order.query.get_or_404(id)

    if order.user_id != request.current_user.id:
        return jsonify({"error": "Not allowed"}), 403

    data = request.get_json() or {}

    if "status" in data:
        order.status = data["status"]

    db.session.commit()
    return jsonify(order.to_dict())


@app.route("/api", methods=["GET"])
def home():
    return jsonify({"message": "Fuel API running"})


if __name__ == "__main__":
    app.run(debug=True)
 