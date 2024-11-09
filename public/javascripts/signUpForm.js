document.getElementById('SignUpForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('inputEmail').value
    };

    $.ajax({
        url: 'http://localhost:3000/submitForm',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function(response) {
            alert('Form Submitted!');
            document.getElementById('SignUpForm').reset();
            document.getElementById('SignUpForm').style.display = 'none';
        }
    });
});
