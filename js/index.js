const CABANIAS = [
  {
      nombre: "Cabaña 1",
      capacidad: 2,
      valorNoche: 28000
  },
  {
      nombre: "Cabaña 2",
      capacidad: 3,
      valorNoche: 32000
  },
  {
      nombre: "Cabaña 3",
      capacidad: 4,
      valorNoche: 36000
  },
  {
      nombre: "Cabaña 4",
      capacidad: 5,
      valorNoche: 42000
  },
  {
      nombre: "Cabaña 5",
      capacidad: 6,
      valorNoche: 46000
  },
  {
      nombre: "Cabaña 6",
      capacidad: 7,
      valorNoche: 50000
  },
  { 
      nombre: "Cabaña 7",
      capacidad: 8,
      valorNoche: 55000
  }
];

// Función para guardar la reserva en localStorage
function guardarReservaEnLocalStorage(reserva) {
localStorage.setItem('reserva', JSON.stringify(reserva));
}

// Función para cargar la reserva desde localStorage
function cargarReservaDesdeLocalStorage() {
return JSON.parse(localStorage.getItem('reserva')) || {};
}

// Función para actualizar la vista previa de la reserva
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

// Agregar la sección de "Cantidad de Cuotas" solo si se seleccionó tarjeta y se ingresó una cantidad de cuotas
if (reserva.formaPago === 'tarjeta' && reserva.cuotas) {
  vistaPrevia += `<p><strong>Cantidad de Cuotas:</strong> ${reserva.cuotas}</p>`;
}

document.getElementById('resultado').innerHTML = vistaPrevia;
}

// Función para calcular la reserva
function calcularReserva() {
const fechaInicio = document.getElementById('fechaInicio').value;
const fechaFin = document.getElementById('fechaFin').value;
const capacidad = parseInt(document.getElementById('personas').value);
const formaPago = document.getElementById('formaPago').value;
const cuotas = parseInt(document.getElementById('cuotas').value);

const dias = Math.ceil((new Date(fechaFin) - new Date(fechaInicio)) / (1000 * 60 * 60 * 24));

const cabaniaDisponible = CABANIAS.find(cabania => cabania.capacidad >= capacidad);

if (!cabaniaDisponible) {
  alert("Lo sentimos, no hay cabañas disponibles para la cantidad de personas seleccionada.");
  return;
}

let costoTotal = dias * cabaniaDisponible.valorNoche;

// Aplicar recargo por cuotas si la forma de pago es tarjeta y la cantidad de cuotas es mayor a 1
if (formaPago === 'tarjeta' && cuotas > 1) {
  const recargoPorCuota = costoTotal * 0.05 * cuotas;
  costoTotal += recargoPorCuota;
}

// Guardar la reserva en localStorage
const reserva = {
  cabania: cabaniaDisponible.nombre,
  capacidad: capacidad,
  fechaInicio: fechaInicio,
  fechaFin: fechaFin,
  dias: dias,
  costoTotal: costoTotal,
  formaPago: formaPago,
  cuotas: formaPago === 'tarjeta' ? cuotas : null
};
guardarReservaEnLocalStorage(reserva);

// Actualizar la vista previa de la reserva
actualizarVistaPrevia(reserva);

// Mostrar el botón de confirmación de reserva final
document.getElementById('confirmarReserva').style.display = 'block';
}

// Función para confirmar la reserva final
function confirmarReserva() {
const reserva = cargarReservaDesdeLocalStorage();
if (Object.keys(reserva).length === 0) {
  alert("No hay reserva para confirmar.");
  return;
}
// Aquí puedes agregar lógica para enviar la reserva a un servidor o realizar otras acciones necesarias
alert("¡Reserva confirmada con éxito!");
}

// Función para resetear la reserva
function resetearReserva() {
localStorage.removeItem('reserva'); // Borrar la reserva del localStorage
document.getElementById('formReserva').reset(); // Limpiar el formulario
document.getElementById('resultado').innerHTML = ''; // Limpiar la vista previa
// Ocultar el botón de confirmación de reserva final
document.getElementById('confirmarReserva').style.display = 'none';
}

// Listener para habilitar/deshabilitar el campo de cuotas
document.getElementById('formaPago').addEventListener('change', function() {
const cuotasInput = document.getElementById('cuotas');
cuotasInput.disabled = this.value !== 'tarjeta';
cuotasInput.value = this.value === 'tarjeta' ? 1 : '';
});

// Cargar reserva almacenada en localStorage al cargar la página
window.onload = function() {
const reserva = cargarReservaDesdeLocalStorage();
if (reserva.fechaInicio && reserva.fechaFin) {
  document.getElementById('fechaInicio').value = reserva.fechaInicio;
  document.getElementById('fechaFin').value = reserva.fechaFin;
  document.getElementById('personas').value = reserva.capacidad || '';
  document.getElementById('formaPago').value = reserva.formaPago || '';
  document.getElementById('cuotas').value = reserva.cuotas || '';
  // Actualizar la vista previa de la reserva
  actualizarVistaPrevia(reserva);
}
};