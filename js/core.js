// ------------------------------------------------
// Clase para realizar cálculos sobre los fichajes.
// ------------------------------------------------
function Core() {
    // Calcula las cantidad de horas del fichaje
    // -----------------------------------------
    this.calcularHorasFichaje = function (fichaje) {
        var sumaTotal = 0;
        var horaEntrada = null;
        var horaSalida = null;

        if (fichaje.datos.length < 1)
            return "00:00";

        for (var i = 0; i < fichaje.datos.length; i++) {
            if (this.indicePar(i)) {
                horaEntrada = this.generaDateHora(fichaje.datos[i]);
                horaSalida = null;
            }
            else {
                horaSalida = this.generaDateHora(fichaje.datos[i]);
                sumaTotal += horaSalida.getTime() - horaEntrada.getTime();
            }
        }

        // Si terminamos el bucle y no tenemos una hora de salida terminamos el cálculo con la hora actual.
        if (!horaSalida) {
            sumaTotal += new Date().getTime() - horaEntrada.getTime();
        }

        var totalHoras = new Date();
        totalHoras.setTime(sumaTotal);
        return (totalHoras.getHours() - 1) + ":" + totalHoras.getMinutes();
    }

    // Calculas cuantas horas sales en los fichajes
    // --------------------------------------------
    this.calculaHorasFichajes = function (fichajes) {
        var totalHoras = 0;
        var totalMinutos = 0;

        for (var i = 0; i < fichajes.length; i++) {
            var horasArray = this.calcularHorasFichaje(fichajes[i]).split(":");
            totalHoras += parseInt(horasArray[0]);
            totalMinutos += parseInt(horasArray[1]);
        }

        totalHoras += parseInt(Math.floor(totalMinutos / 60));
        totalMinutos = totalMinutos % 60;

        return totalHoras + ":" + totalMinutos;
    }

    // Genera un objeto Date a partir de una cade H:M.
    // -----------------------------------------------
    this.generaDateHora = function (strHora) {
        var arrayHora = strHora.split(":");
        var ahora = new Date();
        return new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate(), parseInt(arrayHora[0]), parseInt(arrayHora[1]));
    }

    // Nos indica que el índice es par.
    // --------------------------------
    this.indicePar = function indicePar(i) {
        return ((i % 2) == 0);
    }
}
