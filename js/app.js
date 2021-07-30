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



// Funciones
// Agrega datos al objeto de cita
function datosCita(e){
    // Escribe sobre el objeto
    citaObj[e.target.name] = e.target.value;

    console.log(citaObj);
}










