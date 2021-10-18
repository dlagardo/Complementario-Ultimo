//seleccionamos los elementos HTML
const input = $('.input-ingreso');
const formButton = $('#form-button')
const h2 = $('#texto');
h2.text('Mis tareas')
const listaTareas = $('.lista-tareas')

//Seteamos el contador de tareas en 0 como valor inicial
let contadorTareas = 0;

//Creamos array de storage vacío
let setLocal = [];


//Función que captura la tarea ingresada por el usuario
function tomarInput(e){
    e.preventDefault();
    let tarea = input.val();
    imprimirTarea(tarea);
}

//Le asignamos un evento al click del botón
formButton.click(tomarInput);

//Función que imprime la tarea
function imprimirTarea(miTarea){
    //Aumentamos en uno el contador de tareas según tareas ingresadas
    contadorTareas ++;

    //Creamos un li con cada tarea, con su botón de completado y de eliminar. Le damos a los botones un id dinámico según el valor del contador de tareas
    listaTareas.append(`
        <li class="tarea">
            <p class="tarea">${miTarea}</p>
            <button class="boton" id="completado${contadorTareas}">Completado</button>
            <button class="boton boton-eliminar" id="eliminar${contadorTareas}">Eliminar</button>
        </li>
    `)
    //Asignamos el evento click al botón de completado cambiando su estilo CSS al agregarle una nueva clase
    $(`#completado${contadorTareas}`).click(function(){
        $(this).parent().toggleClass('tarea-completada');//parent() por padre en este caso el li
        //toggleClass evalua si esta esta clase,si esta la elimina,si no esta la agrega
    })
    ////Asignamos el evento click al botón de eliminar removiendo el li que lo contiene
    $(`#eliminar${contadorTareas}`).click(function(){
        $(this).parent().remove();
        //Tomamos el texto del elemento p dentro del li que contiene al botón
        let texto = $(this).parent().children()[0].innerText;
        
        //Recorremos el array setLocal y cortamos el elemento del array que coincida con el texto elegido
        for (tarea of setLocal){
            if (texto === tarea){
                setLocal.splice(setLocal.indexOf(tarea), 1);
            }
        }
        //Pisamos lo guardado en el storage con el nuevo valor de setLocal
        localStorage.setItem('tareas', JSON.stringify(setLocal))
    })
    //Guardo mi tarea en el storage
    guardarStorage(miTarea)
}

//Función para guardar una tarea ingresada en el storage
function guardarStorage(tarea){
    setLocal.push(tarea);

    localStorage.setItem('tareas', JSON.stringify(setLocal))
}

//Si hay algo en el storage al cargar la página lo traemos
if (localStorage.length !== 0){
    let datosStorage = JSON.parse(localStorage.getItem('tareas'));
    //Recorremos el array e imprimimos cada tarea en el DOM
    datosStorage.forEach((e)=>{
        imprimirTarea(e);
    })
}
