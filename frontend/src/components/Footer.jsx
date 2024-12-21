import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.about}>
          <h3 style={styles.title}>About Us</h3>
          <p style={styles.text}>
            We are committed to empowering farmers, building sustainable
            communities, and improving food distribution across regions.
          </p>
        </div>
        <div style={styles.links}>
          <h3 style={styles.title}>Quick Links</h3>
          <ul style={styles.list}>
            <li style={styles.listItem}>
              <a href="/" style={styles.link}>
                Home
              </a>
            </li>
            <li style={styles.listItem}>
              <a href="/about" style={styles.link}>
                About
              </a>
            </li>
            <li style={styles.listItem}>
              <a href="/contact" style={styles.link}>
                Contact
              </a>
            </li>
            <li style={styles.listItem}>
              <a href="/privacy" style={styles.link}>
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
        <div style={styles.contact}>
          <h3 style={styles.title}>Contact Us</h3>
          <p style={styles.text}>Email: ademic.aina@gmail.com</p>
        </div>
      </div>
      <div style={styles.footerBottom}>
        <p style={styles.footerText}>© 2024 FarmCollab. All rights reserved.</p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "5px 10px",
    textAlign: "center",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    maxWidth: "1200px",
    margin: "0 auto",
    paddingBottom: "20px",
  },
  about: {
    flex: 1,
    paddingRight: "10px",
  },
  links: {
    flex: 1,
    paddingLeft: "20px",
  },
  contact: {
    flex: 1,
  },
  title: {
    fontSize: "1.5rem",
    marginBottom: "15px",
  },
  text: {
    fontSize: "1rem",
    marginBottom: "5px",
  },
  list: {
    listStyleType: "none",
    padding: 0,
  },
  listItem: {
    marginBottom: "5px",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "1rem",
    transition: "color 0.3s",
  },
  linkHover: {
    color: "#28a745",
  },
  footerBottom: {
    marginTop: "1px",
    borderTop: "1px solid #28a745",
    paddingTop: "1px",
  },
  footerText: {
    fontSize: "1rem",
    color: "#bdc3c7",
  },
};

export default Footer;
