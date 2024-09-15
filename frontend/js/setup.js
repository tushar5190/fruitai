document.addEventListener('DOMContentLoaded', function() {
    const setupForm = document.getElementById('setupForm');
    const profileImage = document.getElementById('profileImage');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const completeSetupBtn = document.getElementById('completeSetupBtn');

    function updateButtonState() {
        if (firstName.value.trim() && lastName.value.trim()) {
            completeSetupBtn.classList.add('active');
        } else {
            completeSetupBtn.classList.remove('active');
        }
    }

    [firstName, lastName].forEach(input => {
        input.addEventListener('input', updateButtonState);
    });

    profileImage.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.querySelector('.profile-image').style.backgroundImage = `url(${e.target.result})`;
            };
            reader.readAsDataURL(file);
        }
    });

    setupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (firstName.value.trim() && lastName.value.trim()) {
            // Simulate API call
            setTimeout(() => {
                window.location.href = 'chat-ui.html';
            }, 1000);
        } else {
            alert('Please fill in both first name and last name.');
        }
    });
});

