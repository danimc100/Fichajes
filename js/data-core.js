/***********************************
 * Autor: Daniel Martínez Cequiel
 * Fecha: 2016
 ***********************************/

"use strict";

//var FICHAJE_KEY_EXPR = /^DF-\d{2}:\d{2}:\d{4}/
var FICHAJE_KEY_EXPR = /^DF-\d{4}:\d{2}:\d{2}/

// Almacenaje y extracción de datos de fichajes desde el localStoraje.
// -------------------------------------------------------------------
function DataCore() {
}
 
// Recupera un fichaje por su clave.
// ---------------------------------
DataCore.prototype.recuperaFichaje = function (clave) {
    var datosFichaje = localStorage.getItem(clave);
    if (!datosFichaje) {
        return null;
    }
    var fichaje = new Object();
    fichaje["clave"] = clave;
    fichaje["datos"] = JSON.parse(datosFichaje);
    return fichaje;
}

// Guarda un fichaje.
// ------------------
DataCore.prototype.guardaFichaje = function (fichaje) {
    localStorage.setItem(fichaje.clave, JSON.stringify(fichaje.datos));
}

// Genera un clave a partir de una fecha.
// --------------------------------------
DataCore.prototype.generaClaveFichaje = function (dia) {
    //return "DF-" + Core.formatoDos(dia.getDate()) + ":" + Core.formatoDos(dia.getMonth() + 1) + ":" + dia.getFullYear();
    return "DF-" + dia.getFullYear() + ":" + Core.formatoDos(dia.getMonth() + 1) + ":" + Core.formatoDos(dia.getDate());
}

// Verifica que una clave es válida.
// ---------------------------------
DataCore.prototype.verificaClaveValida = function (clave) {
    var exp = new RegExp(FICHAJE_KEY_EXPR);
    return exp.test(clave);
}

// Obtiene los fichajes de la semana actual.
// -----------------------------------------
DataCore.prototype.fichajesSemanaActual = function () {
    var fichajes = new Array();

    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (this.verificaClaveValida(key)) {
            var fichaje = new Object();
            fichaje["clave"] = key;
            fichaje["datos"] = JSON.parse(localStorage.getItem(key));
            fichajes.push(fichaje);
        }
    }
    fichajes.sort(this.comparador);
    return fichajes;
}

// Función que compara dos fichajes para realizar una ordenación.
// --------------------------------------------------------------
DataCore.prototype.comparador = function (f1, f2) {
    if (f1.clave.toLowerCase() > f2.clave.toLowerCase())
        return 1;
    else
        return -1;
}

// Realiza un fichaje usando la hora actual del sistema.
// -----------------------------------------------------
DataCore.prototype.realizarFichaje = function (clave) {
    // Generamos la hora del fichaje en función de la hora actual.
    var hoy = new Date();
    var horaFichaje = Core.formatoDos(hoy.getHours()) + ":" + Core.formatoDos(hoy.getMinutes());

    // Si no nos pasan una clave generamos una automáticamente para el dia de hoy.
    if (clave == undefined) {
        clave = this.generaClaveFichaje(hoy);
    }

    // Comprobamos si hay datos de fichaje para hoy
    var fichaje = this.recuperaFichaje(clave);

    // Si no hay datos del fichaje de hoy lo creamos
    if (!fichaje) {
        fichaje = this.generaFichaje(clave);
    }

    fichaje.datos.horas.push(horaFichaje);
    this.guardaFichaje(fichaje);
}

// Genera un nuevo fichaje indicando una clave nueva.
// --------------------------------------------------
DataCore.prototype.generaFichaje = function (clave) {
    var fichaje = new Object();
    fichaje.clave = clave;
    fichaje.datos = new Object();
    fichaje.datos.horasObjetivo = "08:30";
    fichaje.datos.horas = new Array();
    return fichaje;
}

// Modifica la hora de un fichaje.
// -------------------------------
DataCore.prototype.modificaHoraFichaje = function (clave, indexHF, hora) {
    var fichaje = this.recuperaFichaje(clave);
    fichaje.datos.horas[indexHF] = hora;
    this.guardaFichaje(fichaje);
}

// Elimina una hora de un fichaje.
// -------------------------------
DataCore.prototype.eliminaHoraFichaje = function (clave, indexHF) {
    var fichaje = this.recuperaFichaje(clave);
    fichaje.datos.horas.splice(indexHF, 1);
    this.guardaFichaje(fichaje);
}

// Elimina la clave de un fichaje.
// -------------------------------
DataCore.prototype.eliminaClaveFichaje = function (clave) {
    localStorage.removeItem(clave);
}

// Elimina todos los datos sobre fichajes.
// ---------------------------------------
DataCore.prototype.eliminaFichajes = function () {
    var exp = new RegExp(FICHAJE_KEY_EXPR);

    var i = 0;
    while (i < localStorage.length) {
        var key = localStorage.key(i);
        if (exp.test(key)) {
            localStorage.removeItem(key);
            continue;
        }
        i++;
    }
}
