document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (user) {
      document.getElementById('nav-links').style.display = 'none';
      document.getElementById('user-info').style.display = 'flex';
      document.getElementById('avatar').src = user.avatar;
      document.getElementById('username').textContent = user.username;
    }
  
    document.getElementById('logout-btn').addEventListener('click', () => {
      localStorage.removeItem('user');
      window.location.href = 'home.html';
    });
  });
  