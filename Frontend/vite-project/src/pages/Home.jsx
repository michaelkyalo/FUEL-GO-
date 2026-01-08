import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import slide1 from "../assets/slide1.png";
import slide2 from "../assets/slide2.png";
import slide3 from "../assets/slide3.png";

function Home() {
  const navigate = useNavigate();
  const slides = [slide1, slide2, slide3]; // Add your images here
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div style={{ minHeight: "100vh", position: "relative", overflow: "hidden", fontFamily: "'Poppins', sans-serif" }}>
      {/* Slideshow */}
      {slides.map((slide, index) => (
        <div
          key={index}
          style={{
            backgroundImage: `url(${slide})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "absolute",
            inset: 0,
            opacity: index === currentSlide ? 1 : 0,
            transition: "opacity 1.5s ease-in-out",
          }}
        ></div>
      ))}

      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.3))",
        }}
      ></div>

      {/* Hero content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          textAlign: "center",
          padding: "2rem",
          color: "#fff",
        }}
      >
        <h1
          style={{
            fontSize: "4rem",
            fontWeight: "700",
            marginBottom: "1rem",
            background: "linear-gradient(90deg, #ffb703, #e63946, #ffb703)",
            backgroundSize: "200% 200%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "gradientAnimation 5s ease infinite",
          }}
        >
          FuelGo Kenya
        </h1>
        <p
          style={{
            fontSize: "1.3rem",
            maxWidth: "700px",
            lineHeight: "1.6",
            marginBottom: "1rem",
          }}
        >
          Delivering fuel solutions straight to your doorstep. 
        </p>
        <p
          style={{
            fontSize: "1.1rem",
            fontStyle: "italic",
            color: "#ffb703",
          }}
        >
          
        </p>
      </div>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes gradientAnimation {
            0% {background-position: 0% 50%;}
            50% {background-position: 100% 50%;}
            100% {background-position: 0% 50%;}
          }
        `}
      </style>
    </div>
  );
}

export default Home;
