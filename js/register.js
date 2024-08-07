document.getElementById('register-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const bio = document.getElementById('bio').value;
  const avatar = document.getElementById('avatar').files[0];
  const errorMsg = document.getElementById('error-msg');

  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);
  formData.append('bio', bio);
  if (avatar) {
    formData.append('avatar', avatar);
  }

  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      body: formData
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

document.getElementById('username').addEventListener('input', updateProfilePreview);
document.getElementById('bio').addEventListener('input', updateProfilePreview);
document.getElementById('avatar').addEventListener('change', updateProfilePreview);

function updateProfilePreview() {
  const username = document.getElementById('username').value;
  const bio = document.getElementById('bio').value;
  const avatar = document.getElementById('avatar').files[0];

  document.getElementById('preview-username').textContent = `@${username}`;
  document.getElementById('preview-bio').textContent = bio || 'Bio';

  if (avatar) {
    const reader = new FileReader();
    reader.onload = (e) => {
      document.getElementById('preview-avatar').src = e.target.result;
    };
    reader.readAsDataURL(avatar);
  } else {
    document.getElementById('preview-avatar').src = 'uploads/avatars/default.png';
  }
}