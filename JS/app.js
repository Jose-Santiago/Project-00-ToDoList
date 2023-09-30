// Capturando el DOM para uso del programa.
const inputTask = document.getElementById('task-text');

const button = document.getElementById('addButton');

const taskList = document.getElementById('taskList');

console.log(inputTask);
console.log(button);
console.log(taskList);

// array para guardar las tareas
let tasks = [];

function addTask (){
    //limpiamos el input de espacios vacios al inicio y al final.
    const task = inputTask.value.trim();
    // si el input no esta vacio entonces
    if (task) {
        // agregamos la tarea al LS
        saveTaskLS(tasks, task);
        // Limpiar el campo de entrada despues de agregar la tarea
        inputTask.value = "";
      }else{
        alert("Debes escribir una tarea!!!");
      } 

      //location.reload();
}


// guardar tarea al LS
function saveTaskLS(tasks, value){
    let clave = tasks.length+1;
    let valor = value;
    localStorage.setItem(clave, valor);
}

function createTemplate(count, task){
     // Guardo el template en una variable/constante.
     const taskItem = `<li class = "id${count}"><span>${count}</span>
     <span class = "tarea">${task}</span>
         <i class="bx bx-edit-alt"></i>
         <i class="bx bx-x"></i>
   </li>`;

   return taskItem;
}


//funcion para recuperar datos de LS
function getDataLS(array){
    inputTask.focus();
    // verificamos que el LS tenga Datos
    if(localStorage.length != 0){

        //recorro el LS y guardo los valores como objetos en el array.
        const keys = Object.keys(localStorage);

        for(const key of keys){
            const value = localStorage.getItem(key);
            let objTask = {id: `${key}`, taskText: `${value}`};
            array.push(objTask);
        } 

        ordenarLista(tasks); // ordeno el array por clave

        insertLiHTML(tasks);// agrego los template

    }else{
        alert("LS Vacio Cree tareas.");
    }

    
}

function insertLiHTML(array){
      //con el array y los datos creo los templates y los agrego al html 
      array.forEach(function(obj) {
        let clave = obj.id;
        let valor = obj.taskText;
        taskList.innerHTML += createTemplate(clave, valor);
    });
}

//funcion que ordena el array de tareas
function ordenarLista(array){
    array.sort((a, b) => {
        const array1 = parseInt(a.id); 
        const array2 = parseInt(b.id);
    return array1 - array2;
    });
}


//funcion para imprimir el array
function printList(array){
    for(let i = 0; i < array.length; i++){
        let objet = array[i];
        let key = objet.id;
        let value = objet.taskText;
        console.log(key + ": " +value);
    }
}

// agrego tareas al LS al dar click o enter al boton. 
button.addEventListener("click", addTask);

taskList.addEventListener('click', function deletTask(event){
    //se verifica si el clic fue en el icono X
    if(event.target.classList.contains("bx-x")){
        //obtenemos el li padre del icono
        const li = event.target.parentNode;
        // obtenemos la clase del elemento
        const liClase = li.classList.item(0); 
        console.log(liClase);
        // mi clase esta formada por id y el numero de clave, por lo que con substring quitamos los 2 primeros caracteres a la clase.
        const keyDelete = liClase.substring(2);
        console.log(keyDelete);

        // teniendo solo el numero de id de la clase se elimina del localstorage
        localStorage.removeItem(keyDelete);
        console.log("si clickea en el bx-x");
    }else{
        console.log("no click en bx-x");
    }
    // reinicio la página para que se vuelva a crear la lista de tareas del localstorage.
    location.reload();
});

// al cargar la pagina leeo el LS para ver si tiene tareas
document.addEventListener("DOMContentLoaded", getDataLS(tasks));


