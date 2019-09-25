/******************************************************************
 * Módulo donde vamos a almacenar toda la lógica de la aplicación * 
 ******************************************************************/
//Importamos la librería para tratamiento de ficheros para almacenar la información de la aplicación (Persistencia de datos).
const fs = require('fs');

//Las notas las vamos a lamacenar en un arreglo
let listadoPorHacer = [];

/**
 * Función mediante la que cargamos los datos de tareas desde la base de datos (fichero json)
 */
const cargarDB = () => {

    try {
        //Cargamos los datos del fichero json en el arreglo de datos
        listadoPorHacer = require('../database/data.json'); //Este metodo es por que estamos del lado de servidor y podemos acceder directamente al fichero importandolo con el require
    } catch (err) {
        listadoPorHacer = [];
    }

    // console.log(listadoPorHacer);
}

/**
 * Función mediante la que almacenaremos los datos de las tareas en la base de datos (fichero json)
 */
const guardarDB = () => {
    //Convertimos el arreglo de tareas a formato JSON
    let data = JSON.stringify(listadoPorHacer);

    //Almacenamos los datos en el fichero de base de datos
    fs.writeFile('database/data.json', data, (err) => {
        //En caso de error generamos una excepción
        if (err) throw new Error('No se pudo grabar la información', err);
    });
}

/**
 * Función mediante la que crearemos una nueva tarea pasando la descripción
 * @param {*} descripcion 
 */
const crear = (descripcion) => {

    //Creamos la estructura donde almacenamos los datos de la nueva tarea
    let porHacer = {
        descripcion,
        completado: false
    };

    //Cargamos los dato de las tareas actuales
    cargarDB();

    //Introducimos el nuevo valor en nuestra lista de tareas
    listadoPorHacer.push(porHacer);

    //Guardamos los datos de las tareas en la base de datos
    guardarDB();

    //Devolvemos la tarea añadida para poder ver que es lo que hemos creado
    return porHacer;
}

/**
 * Función mediante la que obtenemos el listado de tareas de la base de datos (fichero json)
 */
const getTareas = () => {
    //Obtenemos el listado de tareas de la base de datos
    cargarDB();
    //Devolvemos el erreglo donde se encuentran almacenados los datos
    return listadoPorHacer;
}

/**
 * Función mediante la que actualizaremos una tarea como completada al pasar su descripción
 * @param {*} descripcion 
 * @param {*} completado 
 */
const actualizar = (descripcion, completado = true) => {

    //Cargamos los datos almacenados en el arreglo
    cargarDB();

    //Buscamos en el arreglo la descripcion que nos indica cual es la tarea a actualizar
    // let index = listadoPorHacer.findIndex(tarea =>{
    //     return tarea.descripcion === descripcion
    // })
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    //Si tenemos coincidencia
    if (index >= 0) {
        //Actualizamos el campo completado
        listadoPorHacer[index].completado = completado;
        //Guardamos los datos modificados
        guardarDB();
        //Indicamos que la operación se ha realizado correctamente
        return true;
    } else {
        //Indicamos que la operación no se ha realizado correctamente
        return false
    }
}

/**
 * Función mediante la que borramos una tarea por hacer pasando la descripción
 * @param {*} descripcion 
 */
const borrar = (descripcion) => {
    //Cargamos los datos almacenados en el arreglo
    cargarDB();

    // //Buscamos en el arreglo la descripcion que nos indica cual es la tarea a borrar  
    // let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    // //Si tenemos coincidencia
    // if (index >= 0) {
    //     //Borramos el registro coincidente        
    //     listadoPorHacer.slice(index, 1);
    //     //Guardamos los datos modificados
    //     guardarDB();
    //     //Indicamos que la operación se ha realizado correctamente
    //     return true;
    // } else {
    //     //Indicamos que la operación no se ha realizado correctamente
    //     return false
    // }

    //Obtenemos un nuevo arreglo con los componentes que no coinciden con la descripcion pasada
    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);

    //Si los dos arreglos tienen la misma longitud no hemos eliminado ningun elemento
    if (nuevoListado.length === listadoPorHacer.length) {
        //Indicamos que no hemos borrado nada
        return false;
    } else {
        //Guardamos el arreglo con los componentes eliminados
        listadoPorHacer = nuevoListado;
        guardarDB();
        //Indicamos que hemos borrado un elemento
        return true;
    }

}

/**
 * Sección en la que publicamos las funciones del modulo
 */
module.exports = {
    crear,
    getTareas,
    actualizar,
    borrar
}