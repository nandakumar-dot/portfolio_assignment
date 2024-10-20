document.getElementById('contactForm').addEventListener('submit', async function (event) {
    event.preventDefault(); 

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    try {
        const response = await fetch('/submit-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, message })
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`); 
        }

        const result = await response.json();
        console.log(result);

        document.getElementById('response').innerText = result.message;
    } catch (error) {
        console.error('Error submitting form:', error);
        document.getElementById('response').innerText = 'Error submitting form. Please try again.'; 

    }
});
