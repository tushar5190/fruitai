document.addEventListener('DOMContentLoaded', function() {
    const backBtn = document.getElementById('backBtn');
    const profileName = document.getElementById('profileName');
    const fullName = document.getElementById('fullName');
    const phoneNumber = document.getElementById('phoneNumber');
    const profilePic = document.getElementById('profilePic');

    // Simulate fetching profile data from an API
    function fetchProfileData() {
        // This would typically be an API call
        return {
            name: "Jane Doe",
            phone: "+91 98765 43210",
            profilePicUrl: "https://via.placeholder.com/150"
        };
    }

    // Load profile data
    const profileData = fetchProfileData();
    profileName.textContent = profileData.name;
    fullName.textContent = profileData.name;
    phoneNumber.textContent = profileData.phone;
    profilePic.style.backgroundImage = `url(${profileData.profilePicUrl})`;

    backBtn.addEventListener('click', () => {
        window.history.back();
    });
});

