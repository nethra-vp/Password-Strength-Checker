function checkPassword() {
    const password = document.getElementById("passwordInput").value;
    const { strength, feedback, score } = checkPasswordStrength(password);

    const meterDiv = document.querySelector('#strengthMeter div');
    meterDiv.style.width = `${(score/5) * 100}%`;
    meterDiv.className = strength;

    let feedbackHtml = `<p>Password strength: <strong>${strength}</strong></p>`;
    if (feedback.length > 0) {
        feedbackHtml += '<ul>';
        feedback.forEach(suggestion => {
            feedbackHtml += `<li>${suggestion}</li>`;
        });
        feedbackHtml += '</ul>';
    }
    document.getElementById('feedback').innerHTML = feedbackHtml;
}

function checkPasswordStrength(password) {
    let score = 0;
    const feedback = [];

    // Check length
    if (password.length < 8) {
        feedback.push("Password should have atleast 8 characters.");
    } else {
        score += 1;
    }

    // Check for uppercase
    if (/[A-Z]/.test(password)) {
        score += 1;
    } else {
        feedback.push("Add uppercase letters.");
    }

    // Check for lowercase
    if (/[a-z]/.test(password)) {
        score += 1;
    } else {
        feedback.push("Add lowercase letters.");
    }

    // Check for digits
    if (/\d/.test(password)) {
        score += 1;
    } else {
        feedback.push("Add numbers.");
    }

    // Check for special characters
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        score += 1;
    } else {
        feedback.push("Add special characters.");
    }

    // Determine strength based on score
    let strength;
    if (score < 3) {
        strength = "weak";
    } else if (score < 5) {
        strength = "moderate";
    } else {
        strength = "strong";
    }

    return { strength, feedback, score };
}