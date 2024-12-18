import jwt from 'jsonwebtoken';

const isAuthenticate = (req, res, next) => {
  try {
    // Get the token from the 'Authorization' header
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    // Split "Bearer TOKEN"
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "Invalid token format" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRETKEY);

    // Attach the decoded data (user info) to the request
    req.user = decoded;
    next(); // Pass control to the next middleware/route handler
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid or expired token",
      error: error.message });
  }
};

export default isAuthenticate;
