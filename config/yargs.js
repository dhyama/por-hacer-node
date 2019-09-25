/*******************************************************
 * Modulo para la configuración de parámetros de yargs *
 ******************************************************/

//Definimos constantes para poder reutilizarlas dentro de las definiciones de los argumentos 
//  y así simplificar el código
const descripcion = { //Descripción es obligatoria y su alias es 'd'
    demand: true,
    alias: 'd',
    desc: 'Descripción de la tarea por hacer.'
}

const completado = { //Estado completado con alias 'c' y valor por defecto 'true'
    alias: 'c',
    default: true,
    desc: 'Completado de la tarea por hacer.'
}

//Importamos la libreria de yargs para lectura de parametros en línea de comandos
const argv = require('yargs')
    //Añadimos el comando crear
    .command('crear', 'Crear una tarea por hacer.', {
        descripcion
    })
    //Añadimos el comando actualizar
    .command('actualizar', 'Actualiza el estado completado de una tarea por hacer.', {
        descripcion,
        completado
    })
    //Añadimos el comando borrar
    .command('borrar', 'Borrar una tarea por hacer.', {
        descripcion
    })
    .help() //Añadimos la ayuda --help
    .argv;

module.exports = {
    argv
}