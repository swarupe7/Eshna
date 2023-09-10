// Initialize Email.js with your service and user IDs
emailjs.init("0Qs9kz5IAXGZhvs7H");

document.getElementById("reminderForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const date = document.getElementById("period_date").value;

    // Calculate the time until the reminder date
    const currentDate = new Date();
    const reminderDate = new Date(date);
    const timeUntilReminder = reminderDate - currentDate;

    // Schedule the email to be sent at the specified date
    setTimeout(() => {
        sendEmail(email, date);
    }, timeUntilReminder);

    // Reset the form
    document.getElementById("email").value = "";
    document.getElementById("period_date").value = "";
    document.getElementById("age").value = "";

    alert(`Reminder set! You will receive an email later.`);

    window.location.href="./directory.html";
});

function sendEmail(email, date) {
    if (!email || !isValidEmail(email)) {
        alert("Please provide a valid email address.");
        return;
    }
    const templateParams = {
        to_email: email,
        reminder_date: date,
    };

    emailjs.send("service_trphznn", "template_wyvbj47", templateParams)
        .then(function (response) {
            console.log("Email sent successfully!", response);
        }, function (error) {
            console.error("Email sending failed:", error);
        });
}

function isValidEmail(email) {
    // A basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
