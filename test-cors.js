// Test CORS Configuration
// Run this in your browser console on http://localhost:5173

async function testCORS() {
  console.log("🧪 Testing CORS Configuration...\n");
  
  const backendURL = "http://localhost:5000";
  
  // Test 1: Basic GET request
  try {
    const response = await fetch(`${backendURL}/`, {
      method: "GET",
      credentials: "include",
    });
    console.log("✅ Test 1 PASSED: Basic GET request");
    console.log("   Status:", response.status);
  } catch (error) {
    console.error("❌ Test 1 FAILED: Basic GET request");
    console.error("   Error:", error.message);
  }

  // Test 2: OPTIONS preflight request
  try {
    const response = await fetch(`${backendURL}/api/auth/login`, {
      method: "OPTIONS",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("\n✅ Test 2 PASSED: OPTIONS preflight");
    console.log("   Status:", response.status);
    console.log("   CORS Headers:", {
      origin: response.headers.get("Access-Control-Allow-Origin"),
      methods: response.headers.get("Access-Control-Allow-Methods"),
      credentials: response.headers.get("Access-Control-Allow-Credentials"),
    });
  } catch (error) {
    console.error("\n❌ Test 2 FAILED: OPTIONS preflight");
    console.error("   Error:", error.message);
  }

  // Test 3: POST request with JSON
  try {
    const response = await fetch(`${backendURL}/api/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: "test@test.com", password: "test" }),
    });
    console.log("\n✅ Test 3 PASSED: POST request with credentials");
    console.log("   Status:", response.status);
  } catch (error) {
    console.error("\n❌ Test 3 FAILED: POST request");
    console.error("   Error:", error.message);
  }

  console.log("\n🏁 CORS Testing Complete!");
}

// Run the test
testCORS();
