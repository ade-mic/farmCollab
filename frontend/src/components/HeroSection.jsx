import React from "react";

const HeroSection = () => {
  return (
    <section className="hero-section" style={styles.heroSection}>
      <h1 style={styles.headline}>
        Empowering Farmers, Connecting Communities
      </h1>
      <p style={styles.subheading}>
        Collaborate, share resources, and efficiently distribute food for a
        sustainable future.
      </p>
      <div style={styles.buttonGroup}>
        <a href="/createAccount">
        <button style={styles.primaryButton}>Sign Up</button>
        </a>
        <button style={styles.secondaryButton}>Learn More</button>
      </div>
    </section>
  );
};

const styles = {
  heroSection: {
    textAlign: "center",
    padding: "100px 20px",
    backgroundImage: 'url("/images/hero.jpg")',
    backgroundSize: "cover",
    color: "#fff",
    height: "100vh", 
    display: "flex", 
    flexDirection: "column",
    justifyContent: "center",
  },
  headline: {
    fontSize: "3rem",
    fontWeight: "bold",
  },
  subheading: {
    fontSize: "1.5rem",
    marginTop: "10px",
  },
  buttonGroup: {
    marginTop: "20px",
  },
  primaryButton: {
    padding: "10px 20px",
    fontSize: "1rem",
    marginRight: "10px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  secondaryButton: {
    padding: "10px 20px",
    fontSize: "1rem",
    backgroundColor: "#fff",
    color: "#28a745",
    border: "2px solid #28a745",
    cursor: "pointer",
  },
};

export default HeroSection;
