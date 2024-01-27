
let cantidadDePersonas = parseInt (prompt ("ingrese la cantidad de personas a hospedar"));
let cantidadDeDias = parseInt(prompt("Ingrese la cantidad de dias"));
let formaDePago = prompt("Por favor ingrese la forma de pago (efectivo/transferencia o tarjeta");
const VALORCABANASPEQUEÑAS = 30000;
const VALORCABANAGRANDE = 45000;
let totalAPagar;
function totalPersonas () {
       if (cantidadDePersonas >= 1 && cantidadDePersonas <= 4) {
        console.log ("Tenemos dispobles las Cabañas 1, 4 y 5");
}
    else if (cantidadDePersonas >= 5 && cantidadDePersonas <= 8) {
        console.log ("Tenemos dispobles las Cabañas 2, 3 y 6");
    }
    else if (cantidadDePersonas <= 0 ) {
        console.log ("Ingrese un numero valido de personas");
    }
    else {
        console.log ("Tendra que alquilar 2 cabañas");
    }
}
totalPersonas (); 




function costoEstadia (){
    if (cantidadDePersonas >= 1 && cantidadDePersonas <= 4) {
        totalAPagar = (cantidadDeDias * VALORCABANASPEQUEÑAS);
    } else if (cantidadDePersonas >= 5 && cantidadDePersonas <= 8) {
        totalAPagar = (cantidadDeDias * VALORCABANAGRANDE);
    }else {
        totalAPagar = (cantidadDeDias * (VALORCABANASPEQUEÑAS * 2 * 0.9));
    }

}
costoEstadia ();


if (formaDePago == "tarjeta" ){
    let confirTarjeta = confirm("El pago con tarjeta tiene 5% de recargo, desea continuar");
    if (confirTarjeta) {
        console.log ("Pago confirmado con su tarjeta");
        totalAPagar = totalAPagar * 1.05;
    } else {
        console.log("Ingrese otra forma de pago");
    }
} else if (formaDePago == "efectivo") {
    console.log ("Usted abonará al ingresar");
} else if (formaDePago == "transferencia") {
    console.log ("Lo contactaremos para enviarle el CBU");
} else {
    console.log ("Ingrese otra forma de pago");
}

console.log("El total a pagar es $" + totalAPagar);

const FECHADERESERVA = prompt("ingrese el mes de la reserva");
switch (FECHADERESERVA) {
    case "enero": 
        console.log ("El mes seleccionado es Enero")
        break;
    case "febrero" :
        console.log("El mes seleccionado es Febrero")
        break
    case "marzo" :
        console.log("El mes seleccionado es Marzo")
        break
    case "abril" :
        console.log("El mes seleccionado es Abril")
        break
    case "mayo" :
        console.log("El mes seleccionado es Mayo")
        break
    case "junio" :
        console.log("El mes seleccionado es Junio")
        break
    case "julio" :
        console.log("El mes seleccionado es Julio")
        break
    case "agosto" :
        console.log("El mes seleccionado es Agosto")
        break
    case "septiembre" :
        console.log("El mes seleccionado es Septiembre")
        break
    case "octubre" :
        console.log("El mes seleccionado es Octubre")
        break
    case "noviembre" :
        console.log("El mes seleccionado es Noviembre")
        break
    case "diciembre" :
        console.log("El mes seleccionado es Diciembre")
        break
    default : 
        console.log("ingrese un mes valido")
        };

