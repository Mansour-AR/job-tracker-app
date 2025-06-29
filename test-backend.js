// Test script to verify backend connection
const testBackend = async () => {
  const backendUrl = 'https://job-tracker-app-backend.onrender.com';
  
  console.log('Testing backend connection...');
  console.log('Backend URL:', backendUrl);
  
  try {
    // Test the root endpoint
    const response = await fetch(`${backendUrl}/`);
    const data = await response.json();
    console.log('✅ Backend is accessible!');
    console.log('Response:', data);
    
    // Test the debug endpoint
    const debugResponse = await fetch(`${backendUrl}/debug`);
    const debugData = await debugResponse.json();
    console.log('✅ Debug endpoint working!');
    console.log('Debug response:', debugData);
    
    // Test CORS with your Vercel domain
    const corsResponse = await fetch(`${backendUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'https://job-tracker-app-ivory.vercel.app'
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'testpassword'
      })
    });
    
    console.log('✅ CORS test completed!');
    console.log('CORS response status:', corsResponse.status);
    
  } catch (error) {
    console.error('❌ Backend test failed:', error.message);
  }
};

// Run the test
testBackend(); 