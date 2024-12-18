import React from "react";

const AboutSection = () => {
  return (
    <section className="about-section" style={styles.aboutSection}>
      <div>
        <h2 style={styles.title}>About Our Platform</h2>
        <p style={styles.text}>
          Our platform fosters collaboration among farmers, connects them with
          buyers, and ensures efficient food distribution. Together, we can
          create a sustainable and prosperous agricultural future.
        </p>
      </div>
    </section>
  );
};

const styles = {
  aboutSection: {
    padding: "50px 20px",
    textAlign: "center",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  text: {
    fontSize: "1.2rem",
    lineHeight: "1.6",
    maxWidth: "600px",
    margin: "0 auto",
  },
};

export default AboutSection;
