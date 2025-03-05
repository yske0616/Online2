// public/assets/js/app.js

document.addEventListener('DOMContentLoaded', function() {
  // サイドバーのアクティブ状態を管理
  const currentPath = window.location.pathname;
  const navItems = document.querySelectorAll('.nav-item a');
  
  navItems.forEach(item => {
    if (currentPath.includes(item.getAttribute('href'))) {
      item.parentElement.classList.add('active');
    }
  });
  
  // API接続テスト
  const testApiBtn = document.getElementById('testApiBtn');
  if (testApiBtn) {
    testApiBtn.addEventListener('click', async () => {
      try {
        const response = await fetch('/api/test');
        const data = await response.json();
        alert(data.message);
      } catch (error) {
        alert('APIとの接続に失敗しました: ' + error.message);
      }
    });
  }
});