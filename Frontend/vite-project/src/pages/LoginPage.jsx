import { useState } from "react";
import { useNavigate } from "react-router-dom";
import mytruck from "../assets/mytruck.png";

function LoginPage({ setUser }) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!name || !password) {
      setMessage("Please enter your name/company and password");
      return;
    }

    setMessage("");
    setLoading(true);

    setTimeout(() => {
      const userData = { name };
      sessionStorage.setItem("fuelgo_user", JSON.stringify(userData)); // ✅ sessionStorage
      setUser(userData);
      setLoading(false);
      navigate("/home");
    }, 2000);
  };

  const handleGuest = () => {
    const guestUser = { name: "Guest" };
    sessionStorage.setItem("fuelgo_user", JSON.stringify(guestUser)); // ✅ sessionStorage
    setUser(guestUser);
    navigate("/home");
  };

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${mytruck})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -2,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: -1,
        }}
      />

      <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        {!showForm ? (
          <button
            className="btn btn-warning btn-lg"
            onClick={() => setShowForm(true)}
          >
            Click to Login
          </button>
        ) : (
          <div className="card shadow-sm" style={{ maxWidth: "400px", width: "100%" }}>
            <div className="card-body">
              <h1 className="text-center mb-2">Fuel Go Kenya</h1>
              <p className="text-center mb-4">Log in to your account</p>

              <form onSubmit={handleLogin}>
                <input
                  className="form-control mb-3"
                  type="text"
                  placeholder="Name or Company"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                />
                <input
                  className="form-control mb-3"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
                <button className="btn btn-warning w-100" type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </button>
              </form>

              {message && (
                <p className="text-danger text-center mt-2">{message}</p>
              )}

              <button
                className="btn btn-outline-light w-100 mt-3"
                onClick={handleGuest}
                disabled={loading}
              >
                Continue as Guest
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
