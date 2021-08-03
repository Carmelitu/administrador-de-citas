import Citas from "./classes/Citas.js"
import UI from "./classes/UI.js";

import {mascotaInput, propietarioInput, telefonoInput, fechaInput, horaInput, sintomasInput, formulario} from "./selectores.js";


const administrarCitas = new Citas();
const ui = new UI();

let editando = false;

// Objeto principal
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

// Agrega datos al objeto de cita
export function datosCita(e){
    // Escribe sobre el objeto
    citaObj[e.target.name] = e.target.value;
}

export function nuevaCita(e){
    e.preventDefault();

    // Extraer info del objeto
    const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj;

    // Validacion

    if (mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === ''){
        ui.mostrarAlerta('Todos los campos son obligatorios', 'error');
        return;
    }

    if(editando) {
        // Estamos editando
        administrarCitas.editarCita( {...citaObj} );

        ui.mostrarAlerta('Guardado Correctamente');

        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';

        editando = false;

    } else {
        // Nuevo Registrando

        // Generar un ID único
        citaObj.id = Date.now();
        
        // Añade la nueva cita
        administrarCitas.agregarCita({...citaObj});

        // Mostrar mensaje de que todo esta bien...
        ui.mostrarAlerta('Se agregó correctamente')
    }

    // Mostrar HTML Citas
    ui.mostrarCitas(administrarCitas);

    // Reiniciar formulario y objeto
    reiniciarObjeto();
    formulario.reset();
    
}

// Vacía el objeto para que se cargue correctamente en el arreglo
export function reiniciarObjeto() {
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}

// Elimina cita
export function eliminarCita(id) {
    administrarCitas.eliminarCita(id);

    ui.mostrarAlerta('La cita se eliminó correctamente');

    ui.mostrarCitas(administrarCitas);
}

// Edita cita
export function cargarEdicion(cita){
    const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;
    
    // Reiniciar el objeto
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    // Llenar los inputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    // Cambiar texto del botón
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

    editando = true;
}