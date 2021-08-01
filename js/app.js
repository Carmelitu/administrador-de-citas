// Variables campos
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

// UI
const formulario = document.querySelector('#nueva-cita');
formulario.addEventListener('submit', nuevaCita);

const contenedorCitas = document.querySelector('#citas');

// Eventos
eventListeners();

function eventListeners(){
    mascotaInput.addEventListener('change', datosCita);

    propietarioInput.addEventListener('change', datosCita);

    telefonoInput.addEventListener('change', datosCita);

    fechaInput.addEventListener('change', datosCita);

    horaInput.addEventListener('change', datosCita);

    sintomasInput.addEventListener('change', datosCita);
}

// Objeto principal
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}


// Clases
class Citas {
    constructor() {
        this.citas = [];
    }

    agregarCita(cita){
        this.citas = [...this.citas, cita];
    }

    eliminarCita(id){
        this.citas = this.citas.filter( cita => cita.id !== id);
    }
}

class UI {
    mostrarAlerta(mensaje, tipo){
        // Creacion div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('alert', 'text-center', 'd-block', 'col-12');

        // Validacion tipo de mensaje
        if (tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }

        // Se agrega texto
        divMensaje.textContent = mensaje;

        // Agregar al DOM
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

        // Quitar alerta despues de 5 segundos
        setTimeout(() => {
            divMensaje.remove();
        }, 5000);
    }

    mostrarCitas({citas}){
        this.limpiarHTML();

        citas.forEach( cita => {
            const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            // Scripting elementos de la cita
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.textContent = mascota;

            const propParrafo = document.createElement('p');
            propParrafo.innerHTML = `
                <span class="font-weight-bolder">Propietario: </span>${propietario}
            `;

            const telParrafo = document.createElement('p');
            telParrafo.innerHTML = `
                <span class="font-weight-bolder">Teléfono: </span>${telefono}
            `;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `
                <span class="font-weight-bolder">Fecha: </span>${fecha}
            `;

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `
                <span class="font-weight-bolder">Hora: </span>${hora}
            `;

            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `
                <span class="font-weight-bolder">Síntomas: </span>${sintomas}
            `;


            // Agrega boton de eliminar
            const btnEliminar = document.createElement('button');
            btnEliminar.onclick = () => eliminarCita(id); // añade la opción de eliminar
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.innerHTML = 'Eliminar <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'

            // Agrega los parrafos al divCita
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propParrafo);
            divCita.appendChild(telParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);

            // Agregar citas al HTML
            contenedorCitas.appendChild(divCita);
            
        });
    }

    limpiarHTML(){
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    }
}

const administrarCitas = new Citas();
const ui = new UI();

// Funciones
// Agrega datos al objeto de cita
function datosCita(e){
    // Escribe sobre el objeto
    citaObj[e.target.name] = e.target.value;
}

// Valida y agrega una nueva Cita
function nuevaCita(e){
    e.preventDefault();

    // Extraer info del objeto
    const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj;

    // Validacion

    if (mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === ''){
        ui.mostrarAlerta('Todos los campos son obligatorios', 'error');
        return;
    }

    // Generar ID de cita
    citaObj.id = Date.now();
    console.log(citaObj);

    // Creacion de nueva cita
    administrarCitas.agregarCita({...citaObj});

    // Se agregó ok
    ui.mostrarAlerta('Cita agregada correctamente');

    // Mostrar HTML Citas
    ui.mostrarCitas(administrarCitas);

    // Reiniciar formulario y objeto
    reiniciarObjeto();
    formulario.reset();
    
}

// Vacía el objeto para que se cargue correctamente en el arreglo
function reiniciarObjeto() {
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}

// Elimina cita
function eliminarCita(id) {
    administrarCitas.eliminarCita(id);

    ui.mostrarAlerta('La cita se eliminó correctamente');

    ui.mostrarCitas(administrarCitas);
}


