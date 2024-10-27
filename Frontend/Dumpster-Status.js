document.addEventListener("DOMContentLoaded", function () {
    // Dummy dumpster data for demonstration
    const dumpsters = [
        { id: 1, location: "123 Main St, Area 1", fillLevel: 80, lastUpdated: "2 hours ago" },
        { id: 2, location: "456 Elm St, Area 2", fillLevel: 45, lastUpdated: "1 hour ago" },
        { id: 3, location: "789 Pine St, Area 3", fillLevel: 95, lastUpdated: "30 minutes ago" },
        { id: 4, location: "321 Oak St, Area 4", fillLevel: 20, lastUpdated: "15 minutes ago" },
        { id: 5, location: "654 Maple St, Area 5", fillLevel: 60, lastUpdated: "5 hours ago" }
    ];

    const dumpsterContainer = document.querySelector(".row");

    // Function to dynamically generate dumpster cards
    function generateDumpsterCards(data) {
        dumpsterContainer.innerHTML = ""; // Clear existing cards
        data.forEach(dumpster => {
            const cardHTML = `
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title"><i class="fas fa-dumpster"></i> Dumpster #${dumpster.id}</h5>
                            <p class="card-text">
                                <strong>Location:</strong> ${dumpster.location}<br>
                                <strong>Fill Level:</strong> ${dumpster.fillLevel}%<br>
                                <strong>Last Updated:</strong> ${dumpster.lastUpdated}
                            </p>
                            <div class="progress mb-3">
                                <div class="progress-bar ${getProgressBarColor(dumpster.fillLevel)}" role="progressbar" 
                                     style="width: ${dumpster.fillLevel}%;" aria-valuenow="${dumpster.fillLevel}" aria-valuemin="0" aria-valuemax="100">
                                    ${dumpster.fillLevel}%
                                </div>
                            </div>
                            <button class="btn btn-outline-success btn-sm">View Details</button>
                        </div>
                    </div>
                </div>
            `;
            dumpsterContainer.insertAdjacentHTML("beforeend", cardHTML);
        });
    }

    // Helper function to determine progress bar color based on fill level
    function getProgressBarColor(fillLevel) {
        if (fillLevel < 50) return "bg-success";
        else if (fillLevel < 80) return "bg-warning";
        else return "bg-danger";
    }

    // Filter dumpsters based on fill level
    function filterDumpsters(level) {
        let filtered = dumpsters;
        if (level === "low") filtered = dumpsters.filter(d => d.fillLevel < 50);
        else if (level === "medium") filtered = dumpsters.filter(d => d.fillLevel >= 50 && d.fillLevel < 80);
        else if (level === "high") filtered = dumpsters.filter(d => d.fillLevel >= 80);

        generateDumpsterCards(filtered);
    }

    // Add event listeners to filter buttons (assumes buttons with specific IDs exist in your HTML)
    document.getElementById("filterLow").addEventListener("click", () => filterDumpsters("low"));
    document.getElementById("filterMedium").addEventListener("click", () => filterDumpsters("medium"));
    document.getElementById("filterHigh").addEventListener("click", () => filterDumpsters("high"));
    document.getElementById("filterAll").addEventListener("click", () => generateDumpsterCards(dumpsters));

    // Initialize page with all dumpsters displayed
    generateDumpsterCards(dumpsters);
});
