const authMessage = document.getElementById('authMessage');
const backendPort = 9001;

function showMessage(message, isError = true) {
    if (!authMessage) {
        if (message) {
            alert(message);
        }
        return;
    }

    authMessage.textContent = message;
    authMessage.style.color = isError ? '#fca5a5' : '#86efac';
}

async function submitAuthForm(endpoint, username, password, successRedirect) {
    try {
        console.log("submitting form", { endpoint, username, password });
        const response = await fetch(`http://localhost:${backendPort}/${endpoint}`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        console.log(data);

        if (!response.ok) {
            showMessage(data.message || 'Request failed. Please try again.');
            return;
        }

        showMessage(data.message || 'Success!', false);
        window.location.href = successRedirect;
    } catch (error) {
        console.error(error);
        showMessage('Unable to connect to back-end server.');
    }
}

const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        await submitAuthForm('login', username, password, '/');
    });
}

const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        await submitAuthForm('register', username, password, '/login');
    });
}
