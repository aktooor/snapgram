document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('error-msg');
  
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
  
      if (res.status !== 200) {
        throw new Error(data.msg);
      }
  
      localStorage.setItem('user', JSON.stringify(data.user));
      window.location.href = 'home.html';
    } catch (err) {
      errorMsg.textContent = err.message;
    }
  });
  