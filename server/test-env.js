// Test Environment Variables Loading
// Run this with: node test-env.js

import dotenv from "dotenv";
dotenv.config();

console.log("🧪 Testing Environment Variables...\n");

const envVars = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  FRONTEND_URL: process.env.FRONTEND_URL,
};

let allPassed = true;

Object.entries(envVars).forEach(([key, value]) => {
  if (value) {
    console.log(`✅ ${key}: ${key === 'MONGO_URI' || key === 'JWT_SECRET' ? '***hidden***' : value}`);
  } else {
    console.log(`❌ ${key}: NOT FOUND`);
    allPassed = false;
  }
});

console.log("\n" + "=".repeat(50));

if (allPassed) {
  console.log("✅ All environment variables loaded successfully!");
  console.log("\n📝 Your server should now work correctly.");
} else {
  console.log("❌ Some environment variables are missing!");
  console.log("\n💡 Solutions:");
  console.log("   1. Check that .env file exists in server directory");
  console.log("   2. Verify .env file has no syntax errors");
  console.log("   3. Make sure there are no spaces around = signs");
  console.log("   4. Restart your server after fixing .env");
}

console.log("=".repeat(50) + "\n");
