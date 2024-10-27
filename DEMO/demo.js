<script>
// JavaScript code to dynamically update the progress bar
document.addEventListener("DOMContentLoaded", function() {
    // Initial fill level (You can modify this value to test)
    const fillLevel = 70; // Change this value to see different effects

    // Get the progress bar element
    const progressBar = document.querySelector('.progress-bar');

    // Function to update the progress bar
    function updateProgressBar(level) {
        // Set the width of the progress bar based on the fill level
        progressBar.style.width = level + '%';
        progressBar.setAttribute('aria-valuenow', level); // Set aria attribute for accessibility

        // Remove existing color classes
        progressBar.classList.remove('bg-success', 'bg-warning', 'bg-danger');

        // Change the color of the progress bar based on the fill level
        if (level <= 50) {
            progressBar.classList.add('bg-success'); // Green for 0-50%
        } else if (level <= 80) {
            progressBar.classList.add('bg-warning'); // Yellow for 51-80%
        } else {
            progressBar.classList.add('bg-danger'); // Red for above 80%
        }
    }

    // Call the function to update the progress bar
    updateProgressBar(fillLevel);
});
</script>
