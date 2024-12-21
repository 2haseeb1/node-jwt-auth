import http from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config'; 
// Database Connection
const connectDatabase = async () => {
  try {
    if (!config.database_url) {
      throw new Error('Database URL is not defined in the environment variables.');
    }
    await mongoose.connect(config.database_url);
    console.log('✅ Connected to the database successfully.');
  } catch (error) {
    console.error('❌ Error connecting to the database:', error);
    process.exit(1); 
  }
};

// Start the server
const startServer = () => {
  const server = http.createServer(app);

  const port = config.port || 3000; 
  server.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
  });
};

// Initialize the app
(async () => {
  await connectDatabase();
  startServer();
})();
