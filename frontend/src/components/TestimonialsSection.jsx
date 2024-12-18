import React from "react";

const testimonials = [
  {
    name: "Adeola",
    feedback: "This platform has transformed how we collaborate as farmers.",
  },
  {
    name: "Kunle",
    feedback:
      "Connecting with buyers has never been easier. Highly recommended!",
  },
];

const TestimonialsSection = () => {
  return (
    <section
      className="testimonials-section"
      style={styles.testimonialsSection}
    >
      <h2 style={styles.title}>What Farmers Are Saying</h2>
      <div style={styles.testimonialsGrid}>
        {testimonials.map((testimonial, index) => (
          <div key={index} style={styles.testimonialCard}>
            <p style={styles.feedback}>"{testimonial.feedback}"</p>
            <h3 style={styles.name}>- {testimonial.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

const styles = {
  testimonialsSection: {
    padding: "50px 20px",
    backgroundColor: "#f8f9fa",
    textAlign: "center",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "30px",
  },
  testimonialsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  testimonialCard: {
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#fff",
  },
  feedback: {
    fontSize: "1rem",
    fontStyle: "italic",
  },
  name: {
    marginTop: "10px",
    fontSize: "1rem",
    fontWeight: "bold",
  },
};

export default TestimonialsSection;
