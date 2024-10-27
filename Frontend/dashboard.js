document.addEventListener('DOMContentLoaded', function() {
    // Simulated data for demonstration purposes
    const userData = {
        wasteDisposed: 150,
        recycledWaste: 100,
        standardWaste: 50,
        rewardPoints: 1250
    };

    // Update waste disposal activity
    document.getElementById('totalWaste').textContent = userData.wasteDisposed + ' kg';
    document.getElementById('recycledWaste').textContent = userData.recycledWaste + ' kg';
    document.getElementById('standardWaste').textContent = userData.standardWaste + ' kg';

    // Update reward points
    const rewardPointsElement = document.querySelector('.text-success.font-weight-bold');
    if (rewardPointsElement) {
        rewardPointsElement.textContent = userData.rewardPoints;
    }

    // Function to add new notifications
    function addNotification(message, timeAgo) {
        const notificationsContainer = document.querySelector('.notifications');
        const newNotification = document.createElement('div');
        newNotification.className = 'notification';
        newNotification.innerHTML = `
            <p>${message}</p>
            <small class="text-muted">${timeAgo}</small>
        `;
        notificationsContainer.prepend(newNotification);
    }

    // Example: Add a new notification
    addNotification('New recycling campaign started!', '5 minutes ago');

    // Add hover effect to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.transition = 'transform 0.3s ease-in-out';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Add click event to "View Details" button
    const viewDetailsBtn = document.querySelector('.btn-success.btn-sm');
    if (viewDetailsBtn) {
        viewDetailsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Viewing waste disposal details...');
            // Here you would typically navigate to a detailed view or open a modal
        });
    }

    // Add click events to quick link buttons
    const quickLinks = document.querySelectorAll('.btn-outline-success.btn-block');
    quickLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            alert(`Navigating to ${this.textContent}...`);
            // Here you would typically navigate to the respective page
        });
    });
});