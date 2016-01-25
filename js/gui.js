/***********************************
 * Autor: Daniel Martínez Cequiel
 * Fecha: 2016
 ***********************************/

"use strict";

// Inicialización del entorno.
// ---------------------------
var dataCore = new DataCore();
var core = new Core();
var idHoraSel;
var claveSel;
var claveActual = undefined;

$(document).ready(function () {
    // Realiza un fichaje.
    // -------------------
    $("#fichajeBtn").click(function () {
        if (claveActual == undefined) {
            dataCore.realizarFichaje();
        }
        else {
            dataCore.realizarFichaje(claveActual);
        }
        
        muestraFichajeSemanaEnCurso();
    });

    // Da de alta una nueva clave.
    // ---------------------------
    $("#nuevaClaveBtn").click(function () {
        var clave = prompt("¿Nueva clave a generar?", "");
        if (clave != null) {
            if (dataCore.verificaClaveValida(clave)) {
                var fichaje = dataCore.generaFichaje(clave);
                dataCore.guardaFichaje(fichaje);
                muestraFichajeSemanaEnCurso();
            }
            else
                alert("La clave indicada no es válida.");
        }
    });

    // Actualiza los datos de la pantalla.
    // -----------------------------------
    $("#actualizaBtn").click(function () {
        claveActual = undefined;
        muestraFichajeSemanaEnCurso();
        $("#infoLabel").text("Resolución: " + window.innerWidth + "x" + window.innerHeight);
    });

    // Resetea localStorage con datos de pruebas.
    // ------------------------------------------
    $("#resetPruebasBtn").click(function () {
        if (confirm("¿Desea reiniciar con datos de pruebas?")) {
            dataCore.eliminaFichajes();
            localStorage.setItem("DF-08:01:2016", JSON.stringify({ horasObjetivo: '08:30', horas: ['08:30', '17:30'] }));
            localStorage.setItem("DF-09:01:2016", JSON.stringify({ horasObjetivo: '08:30', horas: ['08:30', '14:00', '15:00', '17:30'] }));
            localStorage.setItem("DF-10:01:2016", JSON.stringify({ horasObjetivo: '08:30', horas: ['08:30', '14:00', '14:45', '17:30'] }));
            localStorage.setItem("DF-11:01:2016", JSON.stringify({ horasObjetivo: '08:30', horas: ['08:20', '14:00', '14:45', '17:20'] }));
            localStorage.setItem("DF-12:01:2016", JSON.stringify({ horasObjetivo: '06:30', horas: ['08:10', '14:00', '14:45'] }));
            muestraFichajeSemanaEnCurso();
        }
    });

    // Elimina todos los datos de fichajes.
    // ------------------------------------
    $("#resetBtn").click(function () {
        if (confirm("¿Desea eliminar todos los datos?")) {
            dataCore.eliminaFichajes();
            muestraFichajeSemanaEnCurso();
        }
    });

    // Muestra la sección de modificación de una hora de fichaje.
    // ----------------------------------------------------------
    $("#fichajesSemanalCotenedor").on("click", "[data-fClave]", function () {
        idHoraSel = parseInt($(this).attr("data-id"));
        claveSel = $(this).attr("data-fClave")

        $("#claveFichajeLabel").text(claveSel);
        var horaArray = $(this).text().split(":");
        $("#horaInput").val(horaArray[0]);
        $("#minutoInput").val(horaArray[1]);

        $("#fichajesSemanalCotenedor").hide();
        $("#fichajeHoraOpContenedor").show();
        $("#botonesContenedor").hide();
    });

    // Modifica la hora de un fichaje.
    // -------------------------------
    $("#modificarHoraBtn").click(function () {
        var nuevaHora = Core.formatoDos($("#horaInput").val()) + ":" + Core.formatoDos($("#minutoInput").val());
        dataCore.modificaHoraFichaje(claveSel, idHoraSel, nuevaHora)
        $("#fichajesSemanalCotenedor").show();
        $("#fichajeHoraOpContenedor").hide();
        $("#botonesContenedor").show();
        muestraFichajeSemanaEnCurso();
    });

    // Elimina la hora de un fichaje.
    // ------------------------------
    $("#eliminarHoraBtn").click(function () {
        dataCore.eliminaHoraFichaje(claveSel, idHoraSel);
        $("#fichajesSemanalCotenedor").show();
        $("#fichajeHoraOpContenedor").hide();
        $("#botonesContenedor").show();
        muestraFichajeSemanaEnCurso();
    });

    // Cancela la modificación de la hora de un fichaje.
    // -------------------------------------------------
    $("#cancelarHoraBtn").click(function () {
        $("#fichajesSemanalCotenedor").show();
        $("#fichajeHoraOpContenedor").hide();
        $("#botonesContenedor").show();
    });

    // Muestra la sección de modificación de una clave de fichaje.
    // -----------------------------------------------------------
    $("#fichajesSemanalCotenedor").on("click", "[data-clave]", function () {
        var clave = $(this).attr("data-clave");
        var fichaje = dataCore.recuperaFichaje(clave);
        $("#claveLabel").text(clave);
        var objetivoArray = fichaje.datos.horasObjetivo.split(":");
        $("#horasObjetivoInput").val(objetivoArray[0]);
        $("#minutosObjetivoInput").val(objetivoArray[1]);

        $("#fichajesSemanalCotenedor").hide();
        $("#claveOpContenedor").show();
        $("#botonesContenedor").hide();
    });

    $("#modificarClaveBtn").click(function () {
        var clave = $("#claveLabel").text();
        var fichaje = dataCore.recuperaFichaje(clave);
        fichaje.datos.horasObjetivo = Core.formatoDos($("#horasObjetivoInput").val()) + ":" + Core.formatoDos($("#minutosObjetivoInput").val());
        dataCore.guardaFichaje(fichaje);

        $("#fichajesSemanalCotenedor").show();
        $("#claveOpContenedor").hide();
        $("#botonesContenedor").show();
        muestraFichajeSemanaEnCurso();
    });

    $("#eliminarClaveBtn").click(function () {
        var clave = $("#claveLabel").text();
        dataCore.eliminaClaveFichaje(clave);

        $("#fichajesSemanalCotenedor").show();
        $("#claveOpContenedor").hide();
        $("#botonesContenedor").show();
        muestraFichajeSemanaEnCurso();
    });

    $("#cancelarClaveBtn").click(function () {
        $("#fichajesSemanalCotenedor").show();
        $("#claveOpContenedor").hide();
        $("#botonesContenedor").show();
    });

    $("#hacerClaveActualBtn").click(function () {
        claveActual = $("#claveLabel").text();

        $("#fichajesSemanalCotenedor").show();
        $("#claveOpContenedor").hide();
        $("#botonesContenedor").show();
        muestraFichajeSemanaEnCurso();
    });
});

// Muestra los fichajes de la semana en curso.
// -------------------------------------------
function muestraFichajeSemanaEnCurso() {
    var fichajes = dataCore.fichajesSemanaActual();
    var fichajesSemanalCotenedor = $("#fichajesSemanalCotenedor");

    fichajesSemanalCotenedor.html("");

    for (var i = 0; i < fichajes.length; i++) {
        var fila = "<div class=\"filaFichaje\"><span class=\"label label-primary etiqueta-ajuste\">" + generaLinkClave(fichajes[i].clave) + "</span>";

        for (var j = 0; j < fichajes[i].datos.horas.length; j += 2) {
            fila += "<span class=\"label label-info etiqueta-ajuste\">" + generaLinkHora(fichajes[i], j);
            if ((j + 1) < fichajes[i].datos.horas.length) {
                fila += "&nbsp;-&nbsp;" + generaLinkHora(fichajes[i], j + 1) + "</span>";
            }
            else {
                fila += "&nbsp;-&nbsp;*</span>";
            }
        }

        fila += "<span class=\"label label-success etiqueta-ajuste\">Horas: " + core.calculaHorasFichaje(fichajes[i]);
        var horaSalida = core.calculaHoraSalida(fichajes[i]);
        if(horaSalida) {
            fila += " / Salida: " + horaSalida;
        }
        fila += "</span>";
        fila += "</div>";

        fichajesSemanalCotenedor.append(fila);
    }

    $("#horasSemanaLabel").text(core.calculaHorasFichajes(fichajes));
    $("#claveActualLabel").text(claveActual || "hoy");
}

function generaLinkClave(clave) {
    return "<a href=\"#\" data-clave=\"" + clave + "\"><span class=\"badge\">" + clave + "</span></a>";
}

function generaLinkHora(fichaje, indice) {
    return "<a href=\"#\" data-id=\"" + indice + "\" data-text=\"" + fichaje.datos.horas[indice] + "\" data-fClave=\"" + fichaje.clave + "\">" + fichaje.datos.horas[indice] + "</a>";
}

