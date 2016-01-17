//var FICHAJE_KEY_EXPR = 
// {clave:'', datos:[]}

function DataCore() {
    this.recuperaFichaje = function (clave) {
        //var clave = this.generaClaveFichaje(dia);
        var datosFichaje = localStorage.getItem(clave);
        if (!datosFichaje) {
            return null;
        }
        var fichaje = new Object();
        fichaje["clave"] = clave;
        fichaje["datos"] = JSON.parse(datosFichaje);
        return fichaje;
    }
    //this.recuperaFichaje = function (dia) {
    //    var clave = this.generaClaveFichaje(dia);
    //    var datosFichaje = localStorage.getItem(clave);
    //    if (!datosFichaje) {
    //        return null;
    //    }
    //    var fichaje = new Object();
    //    fichaje["clave"] = clave;
    //    fichaje["datos"] = JSON.parse(datosFichaje);
    //    return fichaje;
    //}

    this.guardaFichaje = function (fichaje) {
        var clave = Object.keys(fichaje)[0];
        localStorage.setItem(fichaje.clave, JSON.stringify(fichaje.datos));
    }

    this.generaClaveFichaje = function (dia) {
        return "DF-" + dia.getDate() + ":" + dia.getMonth() + ":" + dia.getFullYear();
    }

    this.fichajesSemanaActual = function () {
        var fichajes = new Array();

        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            var fichaje = new Object();
            fichaje["clave"] = key;
            fichaje["datos"] = JSON.parse(localStorage.getItem(key));
            fichajes.push(fichaje);
        }
        return fichajes;
    }

    this.realizarFichaje = function () {
        // Comprobamos si hay datos de fichaje para hoy
        var hoy = new Date();
        var horaFichaje = hoy.getHours() + ":" + hoy.getMinutes();
        var clave = this.generaClaveFichaje(hoy);
        var fichaje = this.recuperaFichaje(clave);

        // Si no hay datos del fichaje de hoy lo creamos
        if (!fichaje) {
            fichaje = new Object();
            fichaje['clave'] = clave;
            fichaje['datos'] = new Array();
        }

        fichaje.datos.push(horaFichaje);
        this.guardaFichaje(fichaje);
    }

    // Elimina una hora de un fichaja determinado
    this.eliminaHoraFichaje = function (clave, indexHF) {
        var fichaje = this.recuperaFichaje(clave);
        fichaje.datos.splice(indexHF, 1);
        this.guardaFichaje(fichaje);
    }
}