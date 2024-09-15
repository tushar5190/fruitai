document.addEventListener('DOMContentLoaded', function() {
    const chatList = document.getElementById('chatList');
    const newChatBtn = document.getElementById('newChatBtn');
    const profilePic = document.getElementById('profilePic');

    // Sample chat data (this would typically come from an API)
    const chats = [
        {id: 1, name: "Craig", message: "This is a sample message", time: "10:30 AM", pinned: true, unread: 0},
        {id: 2, name: "John Doe", message: "This is a sample message", time: "10:30 AM", pinned: false, unread: 1},
        {id: 3, name: "Chat Group", message: "You: This is a sample message", time: "10:30 AM", pinned: false, unread: 0},
        {id: 4, name: "Will Jenkins", message: "This is a sample message", time: "10:30 AM", pinned: false, unread: 0}
    ];

    function createChatItem(chat) {
        const li = document.createElement('li');
        li.className = 'chat-item';
        li.innerHTML = `
            <img src="https://via.placeholder.com/40" alt="Profile picture of ${chat.name}">
            <div class="chat-info">
                <h2>${chat.pinned ? '<i class="fas fa-thumbtack"></i>' : ''} ${chat.name}</h2>
                <p>${chat.message}</p>
            </div>
            <div class="chat-time">${chat.time}</div>
            ${chat.unread ? `<div class="chat-badge">${chat.unread}</div>` : ''}
        `;
        li.addEventListener('click', () => {
            // Navigate to individual chat page (not implemented in this example)
            console.log(`Clicked on chat with ${chat.name}`);
        });
        return li;
    }

    // Populate chat list
    chats.forEach(chat => {
        chatList.appendChild(createChatItem(chat));
    });

    newChatBtn.addEventListener('click', () => {
        // Open new chat dialog (not implemented in this example)
        console.log('New chat button clicked');
    });

    profilePic.addEventListener('click', () => {
        // Navigate to profile page
        window.location.href = 'profile-page.html';
    });
});

