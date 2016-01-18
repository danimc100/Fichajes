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
            localStorage.setItem("DF-08:01:2016", JSON.stringify(['08:30', '17:30']));
            localStorage.setItem("DF-09:01:2016", JSON.stringify(['08:30', '14:00', '15:00', '17:30']));
            localStorage.setItem("DF-10:01:2016", JSON.stringify(['08:30', '14:00', '14:45', '17:30']));
            localStorage.setItem("DF-11:01:2016", JSON.stringify(['08:20', '14:00', '14:45', '17:20']));
            localStorage.setItem("DF-12:01:2016", JSON.stringify(['08:10', '14:00', '14:45']));
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

        for (var j = 0; j < fichajes[i].datos.length; j += 2) {
            fila += "<span class=\"parFichaje\"><a href=\"\" data-id=\"" + j + "\" data-text=\"" + fichajes[i].datos[j] + "\" data-fClave=\"" + fichajes[i].clave + "\">" + fichajes[i].datos[j] + "</a>";
            if ((j + 1) < fichajes[i].datos.length) {
                //fila += "&nbsp;-&nbsp;" + fichajes[i].datos[j + 1] + "</span>";
                fila += "&nbsp;-&nbsp;" + generaLinkHora(fichajes[i], j + 1) + "</span>";
            }
            else {
                fila += "&nbsp;-&nbsp;*</span>";
            }
        }

        fila += "<span class=\"horasFichaje\">Horas: " + core.calcularHorasFichaje(fichajes[i]) + "</span>";
        fila += "</div>";

        fichajesSemanalCotenedor.append(fila);
    }

    $("#horasSemanaLabel").text(core.calculaHorasFichajes(fichajes));
}

function generaLinkClave(clave) {
    return "<a href=\"\" data-clave=\"\">" + clave + "</a>";
}

function generaLinkHora(fichaje, indice) {
    return "<a href=\"\" data-id=\"" + indice + "\" data-text=\"" + fichaje.datos[indice] + "\" data-fClave=\"" + fichaje.clave + "\">" + fichaje.datos[indice] + "</a>";
}

