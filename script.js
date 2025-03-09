function loadURL() {
    const dropdown = document.getElementById("urlDropdown");
    const frame = document.getElementById("urlFrame");
    
    const selectedURL = dropdown.value;
    
    if (selectedURL) {
        frame.src = selectedURL;
        frame.style.display = "block";
    } else {
        frame.src = "";
        frame.style.display = "none";
    }
}
