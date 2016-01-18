/***********************************
 * Autor: Daniel Martínez Cequiel
 * Fecha: 2016
 ***********************************/

// Inicialización del entorno.
// ---------------------------
var dataCore = new DataCore();
var core = new Core();
var idHoraSel;
var claveSel;

$(document).ready(function () {
    // Realiza un fichaje.
    // -------------------
    $("#fichajeBtn").click(function () {
        dataCore.realizarFichaje();
        muestraFichajeSemanaEnCurso();
    });

    $("#actualizaBtn").click(function () {
        muestraFichajeSemanaEnCurso();
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

    $("#fichajesSemanalCotenedor").on("click", "[data-fClave]", function () {
        idHoraSel = parseInt($(this).attr("data-id"));
        claveSel = $(this).attr("data-fClave")
        console.log("Hora seleccionada: " + idHoraSel + "," + claveSel);

        $("#claveFichajeLabel").text(claveSel);
        var horaArray = $(this).text().split(":");
        $("#horaInput").val(horaArray[0]);
        $("#minutoInput").val(horaArray[1]);

        $("#fichajesSemanalCotenedor").hide();
        $("#fichajeHoraOpContenedor").show();
        return false;
    });

    $("#fichajesSemanalCotenedor").on("click", "[data-clave]", function () {
        var clave = $(this).attr("data-clave");
        var fichaje = dataCore.recuperaFichaje(clave);
        $("#claveLabel").text(clave);
        $("#horasObjetivoInput").val(fichaje.datos.horasObjetivo);

        $("#fichajesSemanalCotenedor").hide();
        $("#claveOpContenedor").show();
        return false;
    });

    $("#modificarHoraBtn").click(function () {
        var nuevaHora = $("#horaInput").val() + ":" + $("#minutoInput").val();
        dataCore.modificaHoraFichaje(claveSel, idHoraSel, nuevaHora)
        $("#fichajesSemanalCotenedor").show();
        $("#fichajeHoraOpContenedor").hide();
        muestraFichajeSemanaEnCurso();
        return false;
    });

    $("#eliminarHoraBtn").click(function () {
        dataCore.eliminaHoraFichaje(claveSel, idHoraSel);
        $("#fichajesSemanalCotenedor").show();
        $("#fichajeHoraOpContenedor").hide();
        muestraFichajeSemanaEnCurso();
        return false;
    });

    $("#modificarClaveBtn").click(function () {
        var clave = $("#claveLabel").text();
        var fichaje = dataCore.recuperaFichaje(clave);
        fichaje.datos.horasObjetivo = $("#horasObjetivoInput").val();
        dataCore.guardaFichaje(fichaje);

        $("#fichajesSemanalCotenedor").show();
        $("#claveOpContenedor").hide();
        muestraFichajeSemanaEnCurso();
    });

    $("#eliminarClaveBtn").click(function () {
        $("#fichajesSemanalCotenedor").show();
        $("#claveOpContenedor").hide();
    });

    $("#cancelarClaveBtn").click(function () {
        $("#fichajesSemanalCotenedor").show();
        $("#claveOpContenedor").hide();
    });

    $("#cancelarHoraBtn").click(function () {
        $("#fichajesSemanalCotenedor").show();
        $("#fichajeHoraOpContenedor").hide();
        return false;
    });
});

// Muestra los fichajes de la semana en curso.
// -------------------------------------------
function muestraFichajeSemanaEnCurso() {
    var fichajes = dataCore.fichajesSemanaActual();
    var fichajesSemanalCotenedor = $("#fichajesSemanalCotenedor");

    fichajesSemanalCotenedor.html("");

    for (var i = 0; i < fichajes.length; i++) {
        var fila = "<div class=\"filaFichaje\"><span class=\"claveFichaje\">" + generaLinkClave(fichajes[i].clave) + "</span>";

        for (var j = 0; j < fichajes[i].datos.horas.length; j += 2) {
            fila += "<span class=\"parFichaje\">" + generaLinkHora(fichajes[i], j);
            if ((j + 1) < fichajes[i].datos.horas.length) {
                fila += "&nbsp;-&nbsp;" + generaLinkHora(fichajes[i], j + 1) + "</span>";
            }
            else {
                fila += "&nbsp;-&nbsp;*</span>";
            }
        }

        fila += "<span class=\"horasFichaje\">Horas: " + core.calculaHorasFichaje(fichajes[i]);
        var horaSalida = core.calculaHoraSalida(fichajes[i]);
        if(horaSalida) {
            fila += " / Salida: " + horaSalida;
        }
        fila += "</span>"
        fila += "</div>";

        fichajesSemanalCotenedor.append(fila);
    }

    $("#horasSemanaLabel").text(core.calculaHorasFichajes(fichajes));
}

function generaLinkClave(clave) {
    return "<a href=\"\" data-clave=\"" + clave + "\">" + clave + "</a>";
}

function generaLinkHora(fichaje, indice) {
    return "<a href=\"\" data-id=\"" + indice + "\" data-text=\"" + fichaje.datos.horas[indice] + "\" data-fClave=\"" + fichaje.clave + "\">" + fichaje.datos.horas[indice] + "</a>";
}

