
# FarmCollab

FarmCollab is a collaborative platform designed to connect farmers with buyers, share farming resources, and pool funds for agricultural projects. The platform also facilitates food distribution to ensure efficient management of farm produce.

## Features

- **Collaborative Farming**: Farmers can pool resources for equipment, fertilizers, and seeds.
- **Market Connections**: A marketplace for farmers to connect with buyers.
- **Project Support**: Users can support farming projects financially.

## Project Architecture

### Overview

The architecture of FarmCollab follows a Full-Stack Web Application model:

1. **Frontend**: React.js
   - Interactive user interface for seamless user experience.

2. **Backend**: Node.js and Express.js
   - REST API for handling application logic and data management.

3. **Database**: MongoDB (via MongoDB Atlas)
   - NoSQL database for storing application data.

4. **Deployment**: Railway
   - Deployment and hosting for both frontend and backend.
   - [FarmCollab](https://farmcollab-production.up.railway.app/)



## Installation

### Prerequisites

- Node.js
- MongoDB Atlas account (for database configuration)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/ade-mic/farmCollab.git
   cd farmcollab
   ```

2. Install dependencies for both frontend and backend:

   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in both `backend` and `frontend` directories.

   #### Backend `.env` file:

   ```env
   MONGO_URI=your-mongodb-atlas-connection-string
   PORT=5000
   ```

   #### Frontend `.env` file:

   ```env
   REACT_APP_BASE_URL=http://localhost:5000
   ```

4. Start the development server:

   ```bash
   # Backend
   cd backend
   npm run start

   # Frontend
   cd ../frontend
   npm run start
   ```

5. Access the application in your browser at `http://localhost:8080`.


## Next Steps
- **Efficient Distribution**: Tools to manage and distribute farm produce effectively.
- Add more features, such as notifications and reporting dashboards
- Optimize database queries for better performance.
- Expand the platform to include mobile applications.

## License

This project is licensed under the MIT License.

## Contact

For questions or suggestions, feel free to contact [Ademola Aina](mailto:ademic.aina@gmail.com).
