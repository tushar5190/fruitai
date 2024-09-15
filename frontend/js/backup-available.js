document.addEventListener('DOMContentLoaded', function() {
    const restoreButton = document.getElementById('restoreButton');
    const startFreshLink = document.getElementById('startFreshLink');

    restoreButton.addEventListener('click', function() {
        // Simulate API call for restoring backup
        setTimeout(() => {
            window.location.href = 'chat-ui.html';
        }, 1000);
    });

    startFreshLink.addEventListener('click', function(e) {
        e.preventDefault();
        // Simulate API call for starting fresh
        setTimeout(() => {
            window.location.href = 'setup.html';
        }, 1000);
    });
});

