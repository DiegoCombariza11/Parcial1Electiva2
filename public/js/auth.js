// Si ya hay token guardado, ir directo al inicio
if (localStorage.getItem('token')) {
    window.location.href = '/';
}

function mostrarAlerta(mensaje, esError = false) {
    const alerta = document.getElementById('alerta');
    alerta.style.backgroundColor = esError ? '#1a1a1a' : '#F5A800';
    alerta.style.color = esError ? '#F5A800' : '#1a1a1a';
    alerta.style.padding = '12px 16px';
    alerta.style.borderRadius = '6px';
    alerta.style.fontWeight = '600';
    alerta.textContent = mensaje;
    alerta.classList.remove('d-none');
    setTimeout(() => alerta.classList.add('d-none'), 4000);
}

document.getElementById('form-register').addEventListener('submit', async (e) => {
    e.preventDefault();
    const body = {
        nombre: document.getElementById('reg-nombre').value.trim(),
        email: document.getElementById('reg-email').value.trim(),
        password: document.getElementById('reg-password').value
    };

    try {
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        const data = await res.json();

        if (!res.ok) {
            mostrarAlerta(data.message, true);
            return;
        }

        localStorage.setItem('token', data.token);
        localStorage.setItem('usuario', JSON.stringify(data.usuario));
        window.location.href = '/';
    } catch {
        mostrarAlerta('Error al registrarse. Intente de nuevo.', true);
    }
});

document.getElementById('form-login').addEventListener('submit', async (e) => {
    e.preventDefault();
    const body = {
        email: document.getElementById('log-email').value.trim(),
        password: document.getElementById('log-password').value
    };

    try {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        const data = await res.json();

        if (!res.ok) {
            mostrarAlerta(data.message, true);
            return;
        }

        localStorage.setItem('token', data.token);
        localStorage.setItem('usuario', JSON.stringify(data.usuario));
        window.location.href = '/';
    } catch {
        mostrarAlerta('Credenciales inválidas. Intente de nuevo.', true);
    }
});
