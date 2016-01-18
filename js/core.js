// ------------------------------------------------
// Clase para realizar cálculos sobre los fichajes.
// ------------------------------------------------
function Core() {
    // Calcula las cantidad de horas del fichaje
    // -----------------------------------------
    this.calculaHorasFichaje = function (fichaje) {
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

        return this.formatoDos((totalHoras.getHours() - 1)) + ":" + this.formatoDos(totalHoras.getMinutes());
    }

    // Calculas cuantas horas sales en los fichajes
    // --------------------------------------------
    this.calculaHorasFichajes = function (fichajes) {
        var totalHoras = 0;
        var totalMinutos = 0;

        for (var i = 0; i < fichajes.length; i++) {
            var horasArray = this.calculaHorasFichaje(fichajes[i]).split(":");
            totalHoras += parseInt(horasArray[0]);
            totalMinutos += parseInt(horasArray[1]);
        }

        totalHoras += parseInt(Math.floor(totalMinutos / 60));
        totalMinutos = totalMinutos % 60;

        return totalHoras + ":" + totalMinutos;
    }

    this.calculaHoraSalida = function (fichaje) {
        var horasFichaje = this.calculaHorasFichaje(fichaje);
        var horasObjetivo = fichaje.datos.horasObjetivo;

        var horasFichajeT = this.generaDateHora(horasFichaje).getTime();
        var horasObjetivoT = this.generaDateHora(horasObjetivo).getTime();

        if (horasObjetivoT > horasFichajeT) {
            var diffHorasT = horasObjetivoT - horasFichajeT;
            var ultimaHora = fichaje.datos.horas[fichaje.datos.horas.length - 1];
            var ultimaHoraT = this.generaDateHora(ultimaHora).getTime();
            var horaSalidaT = ultimaHoraT + diffHorasT;
            var horaSalidaDate = new Date();
            horaSalidaDate.setTime(horaSalidaT);
            var horaSalida = this.formatoDos(horaSalidaDate.getHours()) + ":" + this.formatoDos(horaSalidaDate.getMinutes());
            return horaSalida;
        }
        else
            return null;
    }

    // Genera un objeto Date a partir de una cadena con formato H:M.
    // -------------------------------------------------------------
    this.generaDateHora = function (strHora) {
        var arrayHora = strHora.split(":");
        var ahora = new Date();
        return new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate(), parseInt(arrayHora[0]), parseInt(arrayHora[1]));
    }

    this.formatoDos = function (cadena) {
        cadena = cadena.toString();

        if (cadena.length == 1)
            return "0" + cadena;
        else
            return cadena;
    }

    // Nos indica que el índice es par.
    // --------------------------------
    this.indicePar = function indicePar(i) {
        return ((i % 2) == 0);
    }
}
