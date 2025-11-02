
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";
async function request(path, options = {}) {
  const url = `${API_BASE}${path}`;
  if (path.startsWith("/auth/login")) {
    return {
      token: "demo-token",
      user: {
        id: options.body?.username || "demo",
        username: options.body?.username || "demo",
        balance: 1000, 
      },
    };
  }

  if (path.startsWith("/auth/signup")) {
    return {
      token: "demo-token",
      user: {
        id: options.body?.username,
        username: options.body?.username,
        balance: 0,
      },
    };
  }

  if (path.startsWith("/fuel/types")) {
    return {
      fuelTypes: [
        { id: 1, name: "Petrol", pricePerLitre: 175 },
        { id: 2, name: "Diesel", pricePerLitre: 150 },
        { id: 3, name: "Kerosene", pricePerLitre: 120 },
      ],
    };
  }

  if (path.startsWith("/fuel/orders")) {
    const id = Math.floor(Math.random() * 1000);
    return {
      order: {
        id,
        fuelType: options.body?.fuelType || "Petrol",
        litres: options.body?.litres || 10,
        totalPrice: (options.body?.litres || 10) * 175,
        status: "Pending",
      },
    };
  }

  if (path.startsWith("/user/profile")) {
    return {
      profile: {
        username: "demo",
        balance: 1000,
        orders: [],
      },
    };
  }

  return { ok: true };
}
export default {
  request,
  login: (data) => request("/auth/login", { method: "POST", body: data }),
  signup: (data) => request("/auth/signup", { method: "POST", body: data }),
  getFuelTypes: () => request("/fuel/types"),
  submitFuelOrder: (data) => request("/fuel/orders", { method: "POST", body: data }),
  getUserProfile: () => request("/user/profile"),
};
