//Importamos la libreria de paso de parametros en linea de comandos personalizada en nuestra carpeta de configuración
const argv = require('./config/yargs').argv;
//Importamos la libreria de colores
const colors = require('colors/safe');
//Importamos el módulo con nuestra lógica de negocio de las tareas
const porHacer = require('./por-hacer/por-hacer');

// console.log(argv);

//Obtenemos la lista de comandos introducido para ejecutar la aplicacion con la libreria yargs
let comando = argv._[0];

switch (comando) {
    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea);
        break;

    case 'listar':
        let listadoTareas = porHacer.getTareas();
        for (let tarea of listadoTareas) {
            console.log(colors.green('============Tarea por hacer ============='));
            console.log(`Tarea : ${tarea.descripcion}`);
            console.log(`Estado: ${tarea.completado}`)
            console.log(colors.green('=========================================='));
        }
        break;

    case 'actualizar':
        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado);
        console.log(actualizado);
        break;

    case 'borrar':
        let borrado = porHacer.borrar(argv.descripcion);
        console.log(borrado);
        break;

    default:
        console.log(`${comando} no es un comando válido.`);
        break

}