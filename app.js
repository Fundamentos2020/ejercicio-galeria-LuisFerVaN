//Variables
let num;
let band = 0;
const elementosPaginacion = document.getElementById("paginacion");
const images = document.getElementById("imagenes");

//EventListeners
eventListeners();

function eventListeners(){
    //Agregar paginacion
    document.getElementById("formNumImg").addEventListener("submit", agregarPaginacion);
    //Cambiar las imagenes
    elementosPaginacion.addEventListener("click", cambiarDePagina);
}

//Funciones

//Agregar paginacion
function agregarPaginacion(e){
    e.preventDefault();
    //Obtener el numero de imagenes a mostrar
    let areaImagenes = document.getElementById("imagesNum");
    const numImagenes = parseInt(areaImagenes.value);
    num = numImagenes;
    //Obtener el numero de paginas que se mostraran
    const numPaginas = Math.floor(100 / numImagenes);
    //Inicializar variable del link que usaremos para cargar imagenes
    let url = "";
    console.log(numPaginas);
    console.log(typeof(numPaginas));
    url += "https://picsum.photos/v2/list?";
    //Crear menu de paginacion
    const menu = document.createElement("div");

    //Darle estilo al menu
    switch(numPaginas){
        case 1:
            menu.innerHTML = `
                <a href="" class="menuStyle">1</a>
            `
            break;
        case 2:menu.innerHTML = `
                <a href="" class="menuStyle">1</a>
                <a href="" class="menuStyle">2</a>
            `
            break;
        case 3:menu.innerHTML = `
                <a href="" class="menuStyle">1</a>
                <a href="" class="menuStyle">2</a>
                <a href="" class="menuStyle">3</a>
            `
            break;
        case 4:menu.innerHTML = `
                <a href="" class="menuStyle">1</a>
                <a href="" class="menuStyle">2</a>
                <a href="" class="menuStyle">3</a>
                <a href="" class="menuStyle">4</a>
            `
            break;
        case 5:menu.innerHTML = `
                <a href="" class="menuStyle">1</a>
                <a href="" class="menuStyle">2</a>
                <a href="" class="menuStyle">3</a>
                <a href="" class="menuStyle">4</a>
                <a href="" class="menuStyle">5</a>
            `
            break;
        default:
    }
    areaImagenes.value = "";
    //Agregar elementos al menu
    elementosPaginacion.appendChild(menu);
    //Cargar las imagenes
    cargarImagenes(1);
}

//Cambiar las imagenes
function cambiarDePagina(e){
    e.preventDefault();
    cargarImagenes(parseInt(e.toElement.text));
    window.scrollTo(0, 0);
}
 
//Cargar las imagenes
function cargarImagenes(x){
    const fotografias = document.createElement("div");
    fotografias.className = "col-s-12 col-m-12"
    let url = "";
    url += "https://picsum.photos/v2/list?";
    url += `page=${x}&`;
    url += `limit=${num}`;
    console.log(url);
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function(){
        if(this.status === 200){
            console.log(this.status);
            const groupImages = JSON.parse(this.responseText);
            
            groupImages.forEach(function (image) {
                fotografias.innerHTML += `
                        <img src="${image.download_url}" alt="imagen aleatoria">
                        <br>`;
            });
        }
        console.log(fotografias);
        images.innerHTML = fotografias;
    }
    xhr.send();
}
