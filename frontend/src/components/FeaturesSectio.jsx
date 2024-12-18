import React from "react";

const features = [
  {
    title: "Collaborative Farming",
    description: "Work together on shared projects.",
    icon: "🌾",
  },
  {
    title: "Efficient Food Distribution",
    description: "Seamlessly connect with buyers.",
    icon: "🚚",
  },
  {
    title: "Resource Pooling",
    description: "Share tools and resources easily.",
    icon: "🤝",
  },
];

const FeaturesSection = () => {
  return (
    <section className="features-section" style={styles.featuresSection}>
      <h2 style={styles.title}>Features</h2>
      <div style={styles.featuresGrid}>
        {features.map((feature, index) => (
          <div key={index} style={styles.featureCard}>
            <span style={styles.icon}>{feature.icon}</span>
            <h3 style={styles.featureTitle}>{feature.title}</h3>
            <p style={styles.featureDescription}>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const styles = {
  featuresSection: {
    padding: "50px 20px",
    textAlign: "center",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "30px",
  },
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
  },
  featureCard: {
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#fff",
  },
  icon: {
    fontSize: "2rem",
  },
  featureTitle: {
    fontSize: "1.2rem",
    marginTop: "10px",
  },
  featureDescription: {
    fontSize: "1rem",
    marginTop: "5px",
  },
};

export default FeaturesSection;
