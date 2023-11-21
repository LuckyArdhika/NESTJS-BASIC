export const generateResetPasswordPage = () => {
  return `
  <html>
  <body>
    <div class="reset-password-page">
      <h2 class="reset-password-title">Reset Password</h2>
      <form id="reset-password-form" class="reset-password-form">
        <div class="form-group">
          <div style="display: flex;flex-direction: column">
          <input type="password" id="new-password" class="form-input" required placeholder="Input your new password here" style="margin-bottom: 5px;">
          <input type="password" id="confirm-password" class="form-input" required placeholder="Reinput your new password here">
          </div>
          <div id="password-validation-error" class="password-validation-error"></div>
          <div id="reset-password-success" class="reset-password-success"></div>
        </div>
        <button type="submit" class="submit-button">Submit</button>
      </form>
    </div>

    <style scoped>
      .reset-password-page {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        font-family: Arial, sans-serif;
      }

      .reset-password-title {
        font-size: 24px;
        margin-bottom: 20px;
      }

      .reset-password-form {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .form-group {
        margin-bottom: 20px;
      }

      .form-input {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        width: 300px;
        font-size: 14px;
      }

      .submit-button {
        padding: 10px 20px;
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
      }

      .submit-button:hover {
        background-color: #0056b3;
      }

      .password-validation-error {
        color: red;
      }

      .reset-password-success {
        color: green;
      }
    </style>

    <script>
      // Password validation function
      const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[.,<>?/;"'{()\\[\\]=+!@#$%^&*]).{8,}$/;
        return passwordRegex.test(password);
      };

      // Form submission event handler
      const handleSubmit = (event) => {
        event.preventDefault();
        const newPassword = document.getElementById("new-password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        // Check if passwords match
        if (newPassword !== confirmPassword) {
          const errorElement = document.getElementById("password-validation-error");
          errorElement.textContent = "Passwords do not match.";
          return;
        }

        // Perform password validation
        if (!validatePassword(newPassword)) {
          const errorElement = document.getElementById("password-validation-error");
          errorElement.textContent = "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character, and be at least 8 characters long.";
          return;
        }

        // Create request body
        const requestBody = {
          newPassword: newPassword
        };

        // Send POST request to /api/auth/reset-password
        fetch("/api/auth/reset-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(requestBody)
        })
          .then(response => {
            if (response.ok) {
              const successElement = document.getElementById("reset-password-success");
              successElement.textContent = "Password reset successful!";
              document.getElementById("password-validation-error").textContent = "";
            } else {
              throw new Error("Password reset failed, please try again or request a new one");
            }
          })
          .catch(error => {
            const errorElement = document.getElementById("password-validation-error");
            errorElement.textContent = error.message;
            document.getElementById("reset-password-success").textContent = "";
          });
      };

      // Form submission event listener
      document.getElementById("reset-password-form").addEventListener("submit", handleSubmit);
    </script>
  </body>
  </html>
  `;
};