document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const button = document.getElementById('theme-switch-button');
  const content = document.querySelector('.main-content');

  let stage = 0;

  button.addEventListener('click', () => {
    // Always clear both glow classes first
    button.classList.remove('red', 'green');

    if (stage === 0) {
      // Initial black screen → light theme
      content.classList.remove('hidden');
      body.classList.remove('initial-dark');
      body.classList.add('light-theme');

      button.classList.add('green');
      stage = 1;

    } else if (stage === 1) {
      // Light theme → dark theme
      body.classList.remove('light-theme');
      body.classList.add('dark-theme');

      button.classList.add('red');
      stage = 2;

    } else {
      // Dark theme → light theme
      body.classList.remove('dark-theme');
      body.classList.add('light-theme');

      button.classList.add('green');
      stage = 1;
    }
  });
});
