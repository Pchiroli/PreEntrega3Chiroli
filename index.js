let cantidadDePersonas = parseInt(prompt("Ingrese la cantidad de personas a hospedar"));
let cantidadDeDias = parseInt(prompt("Ingrese la cantidad de días"));
let formaDePago = prompt("Por favor, ingrese la forma de pago (efectivo/transferencia o tarjeta");

const cabañas = [
    {
        nombre: "cabaña 1",
        capacidad: 2,
        servicios: "Ropa blanca, 1 habitacion (cama matrimonial)",
        valorNoche: 28000
    },
    {
        nombre: "cabaña 2",
        capacidad: 3,
        servicios: "Ropa blanca, 2 habitaciones (cama matrimonial + cama 1 plaza)",
        valorNoche: 32000
    },
    {
        nombre: "cabaña 3",
        capacidad: 4,
        servicios: "Ropa blanca,  2 habitaciones (cama matrimonial + 2 camas 1 plaza)",
        valorNoche: 36000
    },
    {
        nombre: "cabaña 4",
        capacidad: 5,
        servicios: "Ropa blanca, 2 habitacion (cama matrimonial + 3 camas 1 plaza )",
        valorNoche: 42000
    },
    {
        nombre: "cabaña 5",
        capacidad: 6,
        servicios: "Ropa blanca, 2 habitaciones (2 cama matrimonial + 2 camas 1 plaza)",
        valorNoche: 46000
    },
    {
        nombre: "cabaña 6",
        capacidad: 7,
        servicios: "Ropa blanca,  2 habitaciones (2 cama matrimonial + 4 cama 1 plaza)",
        valorNoche: 50000
    },
    { 
        nombre: "cabaña 7",
        capacidad: 8,
        servicios: "Ropa blanca,  2 habitaciones (2 cama matrimonial + 4 cama 1 plaza)",
        valorNoche: 55000
    }
]

function buscarCabañaDisponible(cantidadDePersonas) {
    return cabañas.find(cabaña => cabaña.capacidad >= cantidadDePersonas);
}

function calcularCostoEstadia(cantidadDeDias, cabaña) {
    return cantidadDeDias * cabaña.valorNoche;
}

function aplicarRecargoPorTarjeta(totalAPagar) {
    const recargoPorTarjeta = 1.05;
    return totalAPagar * recargoPorTarjeta;
}

function obtenerMesDeReserva(fechadereserva) {
    const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    return meses.includes(fechadereserva) ? fechadereserva : "mes no válido";
}

if (cantidadDePersonas > 0 && cantidadDeDias > 0) {
    const cabañaDisponible = buscarCabañaDisponible(cantidadDePersonas);

    if (cabañaDisponible) {
        let totalAPagar = calcularCostoEstadia(cantidadDeDias, cabañaDisponible);

        if (formaDePago === "tarjeta") {
            const confirTarjeta = confirm("El pago con tarjeta tiene 5% de recargo, ¿desea continuar?");
            if (confirTarjeta) {
                totalAPagar = aplicarRecargoPorTarjeta(totalAPagar);
                console.log("Pago confirmado con tarjeta");
            } else {
                console.log("El pago no se realizó");
            }
        } else if (formaDePago === "efectivo") {
            console.log("Usted abonará al ingresar");
        } else if (formaDePago === "transferencia") {
            console.log("Lo contactaremos para enviarle el CBU");
        } else {
            console.log("Forma de pago no válida");
        }

        console.log(`El total a pagar es $${totalAPagar}`);
    } else {
        console.log("No hay cabañas disponibles para la cantidad de personas ingresada");
    }
} else {
    console.log("Ingrese una cantidad válida de personas y días");
}

let fechadereserva = prompt("Ingrese el mes de la reserva");
console.log(`El mes seleccionado es ${obtenerMesDeReserva(fechadereserva)}`);
