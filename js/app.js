// Variables campos
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

// UI
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

// Clases
class Citas {
    constructor() {
        this.citas = [];
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
}

const administrarCitas = new Citas();
const ui = new UI();


// Eventos
eventListeners();

function eventListeners(){
    mascotaInput.addEventListener('change', datosCita);

    propietarioInput.addEventListener('change', datosCita);

    telefonoInput.addEventListener('change', datosCita);

    fechaInput.addEventListener('change', datosCita);

    horaInput.addEventListener('change', datosCita);

    sintomasInput.addEventListener('change', datosCita);

    formulario.addEventListener('submit', nuevaCita);
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

    if (mascota == '' || propietario == '' || telefono == '' || fecha == '' || hora == '' || sintomas == ''){
        ui.mostrarAlerta('Todos los campos son obligatorios', 'error');

        return;
    }
}







