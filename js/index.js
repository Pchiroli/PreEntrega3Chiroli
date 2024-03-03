const FORM_RESERVA = document.createElement('form');
FORM_RESERVA.id = 'formReserva';
FORM_RESERVA.classList.add('formReserva');

const CAMPOS = [
  { label: 'Fecha de Entrada:', type: 'date', id: 'fechaInicio', required: true },
  { label: 'Fecha de Salida:', type: 'date', id: 'fechaFin', required: true },
  { label: 'Cantidad de Personas:', type: 'number', id: 'personas', min: '1', max: '8', value: '1', required: true },
  { label: 'Forma de Pago:', type: 'select', id: 'formaPago', required: true, options: ['Seleccione una opción', 'Efectivo', 'Tarjeta'] },
  { label: 'Cantidad de Cuotas (si es pago con tarjeta):', type: 'number', id: 'cuotas', min: '1', value: '1', disabled: true }
];

CAMPOS.forEach(campo => {
  const divCampo = document.createElement('div');
  divCampo.classList.add('campo');

  let elemento;
  if (campo.type === 'select') {
    elemento = document.createElement('select');
    elemento.id = campo.id;
    elemento.required = campo.required;

    campo.options.forEach(option => {
      const opcion = document.createElement('option');
      opcion.value = option;
      opcion.textContent = option;
      elemento.appendChild(opcion);
    });
  } else {
    elemento = document.createElement('input');
    elemento.type = campo.type;
    elemento.id = campo.id;
    elemento.required = campo.required;

    if (campo.min) elemento.min = campo.min;
    if (campo.max) elemento.max = campo.max;
    if (campo.value) elemento.value = campo.value;
    if (campo.disabled) elemento.disabled = true;
  }

  const label = document.createElement('label');
  label.htmlFor = campo.id;
  label.textContent = campo.label;

  divCampo.appendChild(label);
  divCampo.appendChild(elemento);
  FORM_RESERVA.appendChild(divCampo);
});

const DIV_BOTONES = document.createElement('div');
DIV_BOTONES.classList.add('botones');

const CALCULAR_RESERVA_BUTTON = document.createElement('button');
CALCULAR_RESERVA_BUTTON.type = 'button';
CALCULAR_RESERVA_BUTTON.textContent = 'Calcular Reserva';
CALCULAR_RESERVA_BUTTON.addEventListener('click', calcularReserva);

const RESETEAR_RESERVA_BUTTON = document.createElement('button');
RESETEAR_RESERVA_BUTTON.type = 'button';
RESETEAR_RESERVA_BUTTON.textContent = 'Resetear Reserva';
RESETEAR_RESERVA_BUTTON.addEventListener('click', resetearReserva);

DIV_BOTONES.appendChild(CALCULAR_RESERVA_BUTTON);
DIV_BOTONES.appendChild(RESETEAR_RESERVA_BUTTON);

FORM_RESERVA.appendChild(DIV_BOTONES);

document.getElementById('formularioContainer').appendChild(FORM_RESERVA);

document.getElementById('formaPago').addEventListener('change', function () {
  const CUOTAS_INPUT = document.getElementById('cuotas');
  CUOTAS_INPUT.disabled = this.value !== 'Tarjeta';
  CUOTAS_INPUT.value = this.value === 'Tarjeta' ? 1 : '';
});

function calcularReserva() {
  const CABANIAS = [
    { nombre: "Cabaña 1", capacidad: 2, valorNoche: 28000 },
    { nombre: "Cabaña 2", capacidad: 3, valorNoche: 32000 },
    { nombre: "Cabaña 3", capacidad: 4, valorNoche: 36000 },
    { nombre: "Cabaña 4", capacidad: 5, valorNoche: 42000 },
    { nombre: "Cabaña 5", capacidad: 6, valorNoche: 46000 },
    { nombre: "Cabaña 6", capacidad: 7, valorNoche: 50000 },
    { nombre: "Cabaña 7", capacidad: 8, valorNoche: 55000 }
  ];

  const FECHA_INICIO = document.getElementById('fechaInicio').value;
  const FECHA_FIN = document.getElementById('fechaFin').value;
  const CAPACIDAD = parseInt(document.getElementById('personas').value);
  const FORMA_PAGO = document.getElementById('formaPago').value;
  const CUOTAS = parseInt(document.getElementById('cuotas').value);

  const DIAS = Math.ceil((new Date(FECHA_FIN) - new Date(FECHA_INICIO)) / (1000 * 60 * 60 * 24));

  const CABANIA_DISPONIBLE = CABANIAS.find(cabania => cabania.capacidad >= CAPACIDAD);

  if (!CABANIA_DISPONIBLE) {
    alert("Lo sentimos, no hay cabañas disponibles para la cantidad de personas seleccionada.");
    return;
  }

  let COSTO_TOTAL = DIAS * CABANIA_DISPONIBLE.valorNoche;

  if (FORMA_PAGO === 'Tarjeta' && CUOTAS > 1) {
    const RECARGO_POR_CUOTA = COSTO_TOTAL * 0.05 * CUOTAS;
    COSTO_TOTAL += RECARGO_POR_CUOTA;
  }

  const RESERVA = {
    cabania: CABANIA_DISPONIBLE.nombre,
    capacidad: CAPACIDAD,
    fechaInicio: FECHA_INICIO,
    fechaFin: FECHA_FIN,
    dias: DIAS,
    costoTotal: COSTO_TOTAL,
    formaPago: FORMA_PAGO,
    cuotas: FORMA_PAGO === 'Tarjeta' ? CUOTAS : null
  };
  localStorage.setItem('reserva', JSON.stringify(RESERVA));
  actualizarVistaPrevia(RESERVA);
  document.getElementById('confirmarReserva').style.display = 'block';
}

function resetearReserva() {
  localStorage.removeItem('reserva');
  FORM_RESERVA.reset();
  document.getElementById('resultado').innerHTML = ''; 
  document.getElementById('confirmarReserva').style.display = 'none';
}

function confirmarReserva() {
  const RESERVA = reservaDesdeStorage();
  if (!RESERVA || Object.keys(RESERVA).length === 0) {
    alert("No hay reserva para confirmar.");
    return;
  }
  alert("¡Reserva confirmada con éxito!");
}

function reservaDesdeStorage() {
  return JSON.parse(localStorage.getItem('reserva')) || {};
}

function actualizarVistaPrevia(reserva) {
  let vistaPrevia = `
    <h2>Vista Previa de la Reserva</h2>
    <p><strong>Cabaña:</strong> ${reserva.cabania || 'No seleccionada'}</p>
    <p><strong>Capacidad:</strong> ${reserva.capacidad || 'No seleccionada'}</p>
    <p><strong>Fecha de Entrada:</strong> ${reserva.fechaInicio || 'No seleccionada'}</p>
    <p><strong>Fecha de Salida:</strong> ${reserva.fechaFin || 'No seleccionada'}</p>
    <p><strong>Cantidad de Días:</strong> ${reserva.dias || 'No seleccionada'}</p>
    <p><strong>Costo Total de la Estadía:</strong> ${reserva.costoTotal ? '$' + reserva.costoTotal.toFixed(2) : 'No calculado'}</p>
    <p><strong>Forma de Pago:</strong> ${reserva.formaPago || 'No seleccionada'}</p>
  `;

  
  if (reserva.formaPago === 'Tarjeta' && reserva.cuotas) {
    vistaPrevia += `<p><strong>Cantidad de Cuotas:</strong> ${reserva.cuotas}</p>`;
  }

  document.getElementById('resultado').innerHTML = vistaPrevia;
}






