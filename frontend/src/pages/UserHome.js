import React from "react";

const UserHome = () => {
  return (
    <div style={styles.container}>
      <h1>Welcome to Your Home Page</h1>
      <p>You have successfully logged in or created an account.</p>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
  },
};

export default UserHome;
