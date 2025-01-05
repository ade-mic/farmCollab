import { WidthFull } from "@mui/icons-material";
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
              <a href="/about" style={styles.link}>
                About
              </a>
            </li>
            <li style={styles.listItem}>
              <a href="/contact" style={styles.link}>
                Contact
              </a>
              <a href="/privacy" style={styles.link}>
                Privacy Policy
              </a>
            </li>
            <li style={styles.listItem}>
              <a href="/available-produce" style={styles.link}>
                Produce
              </a>
              <a href="/available-projects" style={styles.link}>
                Projects
                </a>
            </li>
          </ul>
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
    textAlign: "center",
    padding: "0",
    marginTop: "auto",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    padding: "7px",
  },
  about: {
    flex: 1,
    padding: "0 7px",
  },
  links: {
    flex: 1,
    padding: "0 10px",
  },
  contact: {
    flex: 1,
    padding: "0 10px",
  },
  title: {
    fontSize: "0.8rem",
    marginBottom: "5px",
  },
  text: {
    fontSize: "1rem",
    lineHeight: "1.1",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    Width: "20px",
    marginBottom: "10px",
  },
  link: {
    flex: "1 1 20%",
    color: "#fff",
    textDecoration: "none",
    textAlign: "center",
    padding: "1px",
  },
  footerBottom: {
    marginTop: "10px",
    borderTop: "1px solid #fff",
    paddingTop: "5px",
  },
  footerText: {
    fontSize: "0.5rem",
    color: "#ccc",
  },
};

export default Footer;
