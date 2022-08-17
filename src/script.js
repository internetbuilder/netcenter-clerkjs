const frontendApi = 'your-frontend-api'; // <- Add Frontend API here

const startClerk = async () => {
  const Clerk = window.Clerk;

  try {
    // Load Clerk environment and session if available
    await Clerk.load();

    const userButton = document.getElementById('user-button');
    const authLinks = document.getElementById('auth-links');

    Clerk.addListener(({ user }) => {
      // Display links conditionally based on user state
      authLinks.style.display = user ? 'none' : 'block';
    });

    if (Clerk.user) {
      // Mount user button component
      Clerk.mountUserButton(userButton);
      userButton.style.margin = 'auto';
    }
  } catch (err) {
    console.error('Error starting Clerk: ', err);
  }
};

(() => {
  const script = document.createElement('script');
  script.setAttribute('data-clerk-frontend-api', frontendApi);
  script.async = true;
  script.src = `https://${frontendApi}/npm/@clerk/clerk-js@latest/dist/clerk.browser.js`;
  script.addEventListener('load', startClerk);
  script.addEventListener('error', () => {
    document.getElementById('no-frontend-api-warning').hidden = false;
  });
  document.body.appendChild(script);
})();
