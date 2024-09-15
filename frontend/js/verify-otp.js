document.addEventListener('DOMContentLoaded', function() {
    const otpForm = document.getElementById('otpForm');
    const otpInput = document.getElementById('otpInput');
    const verifyButton = document.getElementById('verifyButton');
    const resendLink = document.getElementById('resendLink');

    function validateOTP(otp) {
        // Basic validation: 6-digit number
        return /^\d{6}$/.test(otp);
    }

    otpInput.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            verifyButton.classList.add('active');
        } else {
            verifyButton.classList.remove('active');
        }
    });

    otpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const otp = otpInput.value.trim();
        if (validateOTP(otp)) {
            // Simulate API call
            setTimeout(() => {
                window.location.href = 'backup-available.html';
            }, 1000);
        } else {
            alert('Please enter a valid 6-digit OTP.');
        }
    });

    resendLink.addEventListener('click', function(e) {
        e.preventDefault();
        // Simulate resend OTP
        alert('New OTP sent. Please check your phone.');
    });
});

