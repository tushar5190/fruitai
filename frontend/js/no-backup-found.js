document.addEventListener('DOMContentLoaded', function() {
    const setupNewAccountButton = document.getElementById('setupNewAccountButton');

    setupNewAccountButton.addEventListener('click', function() {
        // Redirect to setup page
        window.location.href = 'setup.html';
    });
});
