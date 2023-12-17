function handleSubmit() {
    // Assuming successful login validation logic here
    // ...

    // Display success message upon successful login
    document.getElementById("successMessage").style.display = "block";
    // You might want to set a timeout to hide the success message after a certain duration
    setTimeout(function() {
        document.getElementById("successMessage").style.display = "none";
    }, 3000); // Hide the message after 3 seconds (adjust as needed)
}
