document.addEventListener('DOMContentLoaded', function() {
    const phoneForm = document.getElementById('phoneForm');
    const phoneNumberInput = document.getElementById('phoneNumberInput');
    const getStartedButton = document.getElementById('getStartedButton');

    function validatePhoneNumber(phoneNumber) {
        // Basic validation for Indian phone numbers
        const phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
        return phoneRegex.test(phoneNumber);
    }

    phoneNumberInput.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            getStartedButton.disabled = false;
            getStartedButton.style.backgroundColor = '#d17ff9';
            getStartedButton.style.color = '#ffffff';
            getStartedButton.style.cursor = 'pointer';
        } else {
            getStartedButton.disabled = true;
            getStartedButton.style.backgroundColor = '#e0e0e0';
            getStartedButton.style.color = '#999999';
            getStartedButton.style.cursor = 'not-allowed';
        }
    });

    phoneForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const phoneNumber = phoneNumberInput.value.trim();
        if (validatePhoneNumber(phoneNumber)) {
            // Simulate API call
            setTimeout(() => {
                window.location.href = 'verify-otp.html';
            }, 1000);
        } else {
            alert('Please enter a valid Indian phone number.');
        }
    });
});

