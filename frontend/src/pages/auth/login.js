<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Login</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: Arial, sans-serif;
        }
        
        body {
            background: #f0f2f5;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        
        .login-container {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            width: 100%;
            max-width: 400px;
        }
        
        .login-header {
            text-align: center;
            margin-bottom: 1.5rem;
        }
        
        .form-group {
            margin-bottom: 1rem;
        }
        
        input {
            width: 100%;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 16px;
        }
        
        button {
            width: 100%;
            padding: 12px;
            background: #1877f2;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 16px;
            cursor: pointer;
        }
        
        .error {
            background: #fee;
            color: #c33;
            padding: 10px;
            border-radius: 4px;
            margin-bottom: 1rem;
            display: none;
        }
        
        .success {
            background: #efe;
            color: #363;
            padding: 10px;
            border-radius: 4px;
            margin-bottom: 1rem;
            display: none;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <div class="login-header">
            <h1>Student Login</h1>
        </div>
        
        <div class="error" id="errorMessage"></div>
        <div class="success" id="successMessage"></div>
        
        <form id="loginForm">
            <div class="form-group">
                <input type="text" id="username" placeholder="Student ID" required>
            </div>
            
            <div class="form-group">
                <input type="password" id="password" placeholder="Password" required>
            </div>
            
            <button type="submit">Login</button>
        </form>
    </div>

    <script>
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const errorDiv = document.getElementById('errorMessage');
            const successDiv = document.getElementById('successMessage');
            
            // Hide previous messages
            errorDiv.style.display = 'none';
            successDiv.style.display = 'none';
            
            // Simple validation
            if (!username || !password) {
                showError('Please fill in all fields');
                return;
            }
            
            // Simulate login attempt
            simulateLogin(username, password);
        });
        
        function simulateLogin(username, password) {
            const errorDiv = document.getElementById('errorMessage');
            const successDiv = document.getElementById('successMessage');
            
            // Randomly determine if we get network error (30% chance)
            const hasNetworkError = Math.random() < 0.3;
            
            if (hasNetworkError) {
                showError('Network Error: Unable to connect to server. Please check your connection.');
            } else {
                // Successful login - redirect to dashboard
                successDiv.textContent = 'Login successful! Redirecting to dashboard...';
                successDiv.style.display = 'block';
                
                setTimeout(() => {
                    // This will cause a 404 since dashboard doesn't exist
                    window.location.href = '/dashboard.html';
                }, 1500);
            }
        }
        
        function showError(message) {
            const errorDiv = document.getElementById('errorMessage');
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
        }
    </script>
</body>
</html>
