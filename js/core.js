/***********************************
 * Autor: Daniel Martínez Cequiel
 * Fecha: 2016
 ***********************************/

"use strict";

// ------------------------------------------------
// Clase para realizar cálculos sobre los fichajes.
// ------------------------------------------------
function Core() {
}

// Calcula las cantidad de horas del fichaje.
// ------------------------------------------
Core.prototype.calculaHorasFichaje = function (fichaje) {
    var sumaTotal = 0;
    var horaEntrada = null;
    var horaSalida = null;

    if (fichaje.datos.horas.length < 1)
        return "00:00";

    for (var i = 0; i < fichaje.datos.horas.length; i++) {
        if (this.indicePar(i)) {
            horaEntrada = this.generaDateHora(fichaje.datos.horas[i]);
            horaSalida = null;
        }
        else {
            horaSalida = this.generaDateHora(fichaje.datos.horas[i]);
            sumaTotal += horaSalida.getTime() - horaEntrada.getTime();
        }
    }

    // Si terminamos el bucle y no tenemos una hora de salida terminamos el cálculo con la hora actual.
    if (!horaSalida) {
        sumaTotal += new Date().getTime() - horaEntrada.getTime();
    }

    var totalHoras = new Date();
    totalHoras.setTime(sumaTotal);

    totalHoras.setHours(totalHoras.getHours() - 1);
    return Core.formatoDos((totalHoras.getHours())) + ":" + Core.formatoDos(totalHoras.getMinutes());
}

// Calculas cuantas horas sales en los fichajes.
// ---------------------------------------------
Core.prototype.calculaHorasFichajes = function (fichajes) {
    var totalHoras = 0;
    var totalMinutos = 0;

    for (var i = 0; i < fichajes.length; i++) {
        var horasArray = this.calculaHorasFichaje(fichajes[i]).split(":");
        totalHoras += parseInt(horasArray[0]);
        totalMinutos += parseInt(horasArray[1]);
    }

    totalHoras += parseInt(Math.floor(totalMinutos / 60));
    totalMinutos = totalMinutos % 60;

    return Core.formatoDos(totalHoras) + ":" + Core.formatoDos(totalMinutos);
}

// Calcula la hora de salida en función del fichaje.
// -------------------------------------------------
Core.prototype.calculaHoraSalida = function (fichaje) {
    var horasFichaje = this.calculaHorasFichaje(fichaje);
    var horasObjetivo = fichaje.datos.horasObjetivo;

    var horasFichajeT = this.generaDateHora(horasFichaje).getTime();
    var horasObjetivoT = this.generaDateHora(horasObjetivo).getTime();
    var diffHorasT = horasObjetivoT - horasFichajeT;
    var horaSalida;

    if (horasObjetivoT > horasFichajeT) {
        var horaActualT = new Date().getTime();
        var horaSalidaT = horaActualT + diffHorasT;
        var horaSalidaDate = new Date();
        horaSalidaDate.setTime(horaSalidaT);
        var horaSalida = Core.formatoDos(horaSalidaDate.getHours()) + ":" + Core.formatoDos(horaSalidaDate.getMinutes());
        return horaSalida;
    }
    else
        return null;
}

// Genera un objeto Date a partir de una cadena con formato H:M.
// -------------------------------------------------------------
Core.prototype.generaDateHora = function (strHora) {
    var arrayHora = strHora.split(":");
    var ahora = new Date();
    return new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate(), parseInt(arrayHora[0]), parseInt(arrayHora[1]));
}

// Nos indica que el índice es par.
// --------------------------------
Core.prototype.indicePar = function indicePar(i) {
    return ((i % 2) == 0);
}

Core.formatoDos = function (cadena) {
    cadena = cadena.toString();
    if (cadena.length == 1)
        return "0" + cadena;
    else
        return cadena;
}
