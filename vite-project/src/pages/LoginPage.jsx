import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

   
    if (name && password) {
      localStorage.setItem("fuelgo_user", name); 
      setMessage("Login successful!");
      navigate("/home"); 
    } else {
      setMessage("Please enter your name/company and password");
    }
  };

  const handleGuest = () => {
    navigate("/home"); // ✅ Guest also goes to home
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm page-surface">
            <div className="card-body">
              <h1 className="app-title">Fuel Go Kenya</h1>
              <p className="subtitle">Log in to your account</p>

              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter your name or company name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <input
                    className="form-control"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button className="btn btn-danger w-100" type="submit">
                  Login
                </button>
              </form>

              {message && <p className="message mt-3">{message}</p>}

              <button
                className="btn btn-outline-secondary w-100 mt-2"
                onClick={handleGuest}
              >
                Continue as Guest
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;