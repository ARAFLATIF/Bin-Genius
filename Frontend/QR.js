document.addEventListener("DOMContentLoaded", function() {
    const qrResult = document.getElementById("qrResult");
    let qrScanner;

    // Function to start QR code scanning
    function startScanner() {
        qrScanner = new Html5Qrcode("camera");
        qrScanner.start(
            { facingMode: "environment" },
            { fps: 10, qrbox: 250 },
            (decodedText) => {
                qrResult.innerHTML = `<i class="fas fa-check-circle text-success"></i> QR Code: ${decodedText}`;
                qrScanner.stop(); // Stop scanning after a successful read
            },
            (errorMessage) => {
                console.log(`QR Code scanning error: ${errorMessage}`);
            }
        ).catch((err) => {
            console.log(`Error starting QR Code scanner: ${err}`);
        });
    }

    // Function to confirm the scan
    function confirmScan() {
        if (qrResult.innerHTML) {
            alert("QR code scan confirmed!");
        } else {
            alert("No QR code detected yet. Please scan a QR code.");
        }
    }

    // Event listener to open scanner on modal show
    $('#qrScannerModal').on('show.bs.modal', function () {
        qrResult.innerHTML = ""; // Clear previous result
        startScanner(); // Start the QR scanner
    });

    // Stop scanner when the modal closes
    $('#qrScannerModal').on('hide.bs.modal', function () {
        if (qrScanner) {
            qrScanner.stop();
        }
    });
});
