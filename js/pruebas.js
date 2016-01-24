/***********************************
 * Autor: Daniel Martínez Cequiel
 * Fecha: 2016
 ***********************************/

"use strict";

$(document).ready(function () {
    pruebas();
    muestraFichajeSemanaEnCurso();
});

function pruebas() {

    var core = new Core();

    var date = new Date();
    var data = { 'DF-17:01:2016': ['08:30', '14:00', '14:45', '17:30'] };
    console.log(JSON.stringify(data));
    console.log(JSON.stringify(data['17:01:2016']));
    console.log("length:" + data.length);
    console.log("keys:" + JSON.stringify(Object.keys(data)));
    console.log("keys:" + Object.keys(data)[0]);

    //var fichaje = { calve: 'fichajeClave', datos: ['08:30', '14:00', '14:45'] }; //, '17:30'];
    //console.log(JSON.stringify(fichaje));
    //console.log("Horas fichaje: " + core.calcularHorasFichaje(fichaje));

    var date1 = new Date(2016, 0, 17, 8, 30);
    var date2 = new Date(2016, 0, 17, 14, 0);
    var date3 = new Date();

    date3.setTime(date2.getTime() - date1.getTime());

    console.log(date3);

    var record = "{'17:01:2016':['08:30','14:00','14:45','17:30']}";
    //var data = JSON.parse(record);

    var dataCore = new DataCore();
    console.log("Fichajes desde localStorage: " + JSON.stringify(dataCore.fichajesSemanaActual()));

    var f1 = new Date(2016, 1, 1, 12, 0, 0, 0);
    var f2 = new Date(2016, 1, 1, 13, 1, 0, 0);
    console.log("f1: " + f1.getTime() + " - " + f1);
    console.log("f2: " + f2.getTime() + " - " + f2);
    var diff = new Date();
    diff.setTime(f2.getTime() - f1.getTime());
    console.log("diff: " + diff + " [" + diff.getHours() + ":" + diff.getMinutes() + "]");
    diff.setTime(0);
    console.log("diff:" + diff);
}
