// Acá va toda la lógica del frontend. Usamos fetch para hablar con el backend
// y actualizamos la página sin recargarla. Al abrir la app cargamos los recursos
// y las reservas que ya existen en la base de datos.

const API = '/api';

function mostrarAlerta(mensaje, tipo = 'success') {
    const alerta = document.getElementById('alerta');
    alerta.className = `alert alert-${tipo}`;
    alerta.textContent = mensaje;
    alerta.classList.remove('d-none');
    setTimeout(() => alerta.classList.add('d-none'), 4000);
}

function formatearFecha(fecha) {
    return new Date(fecha).toLocaleDateString('es-CO', { timeZone: 'UTC' });
}

async function cargarRecursos() {
    try {
        const res = await fetch(`${API}/recursos`);
        const data = await res.json();

        const lista = document.getElementById('lista-recursos');
        const select = document.getElementById('res-recurso');

        if (!data.data || data.data.length === 0) {
            lista.innerHTML = '<p class="text-muted p-3 mb-0">No hay recursos registrados.</p>';
            select.innerHTML = '<option value="">Sin recursos disponibles</option>';
            return;
        }

        lista.innerHTML = data.data.map(r => `
            <div class="border-bottom p-3">
                <span class="badge bg-secondary me-2">ID: ${r.id}</span>
                <strong>${r.nombre}</strong>
                <span class="badge bg-primary ms-2">${r.capacidad} personas</span>
                <br>
                <small class="text-muted">${r.ubicacion}</small>
                ${r.descripcion ? `<br><small>${r.descripcion}</small>` : ''}
            </div>
        `).join('');

        select.innerHTML = '<option value="">Seleccione un recurso...</option>' +
            data.data.map(r => `<option value="${r._id}">${r.nombre} (cap. ${r.capacidad})</option>`).join('');

    } catch (error) {
        document.getElementById('lista-recursos').innerHTML =
            '<p class="text-danger p-3">Error al cargar recursos.</p>';
    }
}

async function buscarPorId() {
    const id = document.getElementById('buscar-id').value.trim();
    const div = document.getElementById('detalle-recurso');

    if (!id) {
        div.innerHTML = '<p class="text-warning">Ingrese un ID válido.</p>';
        return;
    }

    try {
        const res = await fetch(`${API}/recursos/${id}`);
        const data = await res.json();

        if (!res.ok) {
            div.innerHTML = `<div class="alert alert-danger">${data.message}</div>`;
            return;
        }

        const r = data.data;
        div.innerHTML = `
            <div class="card border-info">
                <div class="card-body">
                    <h6 class="card-title"><span class="badge bg-secondary me-2">ID: ${r.id}</span>${r.nombre}</h6>
                    <p class="mb-1"><strong>Capacidad:</strong> ${r.capacidad} personas</p>
                    <p class="mb-1"><strong>Ubicación:</strong> ${r.ubicacion}</p>
                    ${r.descripcion ? `<p class="mb-1"><strong>Descripción:</strong> ${r.descripcion}</p>` : ''}
                </div>
            </div>
        `;
    } catch {
        div.innerHTML = '<div class="alert alert-danger">Error al buscar el recurso.</div>';
    }
}

async function cargarReservas() {
    try {
        const res = await fetch(`${API}/reservas`);
        const data = await res.json();
        const tbody = document.getElementById('tabla-reservas');

        if (!data.data || data.data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="text-center text-muted">No hay reservas registradas.</td></tr>';
            return;
        }

        tbody.innerHTML = data.data.map(r => `
            <tr>
                <td>${r.recurso?.nombre || 'N/A'}</td>
                <td>${r.solicitante}</td>
                <td>${formatearFecha(r.fecha)}</td>
                <td>${r.horaInicio}</td>
                <td>${r.horaFin}</td>
                <td>${r.motivo || '—'}</td>
            </tr>
        `).join('');
    } catch {
        document.getElementById('tabla-reservas').innerHTML =
            '<tr><td colspan="6" class="text-center text-danger">Error al cargar reservas.</td></tr>';
    }
}

document.getElementById('form-recurso').addEventListener('submit', async (e) => {
    e.preventDefault();
    const body = {
        id: Number(document.getElementById('r-id').value),
        nombre: document.getElementById('r-nombre').value.trim(),
        capacidad: Number(document.getElementById('r-capacidad').value),
        ubicacion: document.getElementById('r-ubicacion').value.trim(),
        descripcion: document.getElementById('r-descripcion').value.trim()
    };

    try {
        const res = await fetch(`${API}/recursos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        const data = await res.json();

        if (!res.ok) {
            mostrarAlerta(data.message, 'danger');
            return;
        }

        mostrarAlerta('Recurso creado exitosamente.', 'success');
        e.target.reset();
        cargarRecursos();
    } catch {
        mostrarAlerta('Error al crear el recurso.', 'danger');
    }
});

document.getElementById('form-reserva').addEventListener('submit', async (e) => {
    e.preventDefault();
    const body = {
        recurso: document.getElementById('res-recurso').value,
        solicitante: document.getElementById('res-solicitante').value.trim(),
        fecha: document.getElementById('res-fecha').value,
        horaInicio: document.getElementById('res-inicio').value,
        horaFin: document.getElementById('res-fin').value,
        motivo: document.getElementById('res-motivo').value.trim()
    };

    try {
        const res = await fetch(`${API}/reservas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        const data = await res.json();

        if (!res.ok) {
            mostrarAlerta(data.message, 'danger');
            return;
        }

        mostrarAlerta('Reserva realizada exitosamente.', 'success');
        e.target.reset();
        cargarReservas();
    } catch {
        mostrarAlerta('Error al realizar la reserva.', 'danger');
    }
});

cargarRecursos();
cargarReservas();
