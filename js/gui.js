// Inicialización del entorno.
// ---------------------------
var dataCore = new DataCore();
var core = new Core();

$(document).ready(function () {
    $("#fichajeHoraOpContenedor").hide();

    $("#fichajeBtn").click(realizarFichaje);

    $("#fichajesSemanalCotenedor").on("click", "[data-fClave]", function () {
        //alert($(this).attr("data-id") + $(this).attr("data-fClave"));
        $("#fichajesSemanalCotenedor").hide();
        $("#fichajeHoraOpContenedor").show();
        return false;
    });

    $("#modificarHoraBtn").click(function () {
        $("#fichajesSemanalCotenedor").show();
        $("#fichajeHoraOpContenedor").hide();
        return false;
    });

    $("#eliminarHoraBtn").click(function () {
        $("#fichajesSemanalCotenedor").show();
        $("#fichajeHoraOpContenedor").hide();
        return false;
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
        var fila = "<div class=\"filaFichaje\"><span class=\"claveFichaje\">" + fichajes[i].clave + "</span>";

        for (var j = 0; j < fichajes[i].datos.length; j += 2) {
            fila += "<span class=\"parFichaje\"><a href=\"\" data-id=\"" + j + "\" data-fClave=\"" + fichajes[i].clave + "\">" + fichajes[i].datos[j] + "</a>";
            if ((j + 1) < fichajes[i].datos.length) {
                fila += "&nbsp;-&nbsp;" + fichajes[i].datos[j + 1] + "</span>";
            }
            else {
                fila += "&nbsp;-&nbsp;*</span>";
            }
        }

        fila += "<span class=\"horasFichaje\">Horas: " + core.calcularHorasFichaje(fichajes[i]) + "</span>";
        fila += "</div>";

        fichajesSemanalCotenedor.append(fila);
    }
}

function realizarFichaje() {
    dataCore.realizarFichaje();
    muestraFichajeSemanaEnCurso();
}