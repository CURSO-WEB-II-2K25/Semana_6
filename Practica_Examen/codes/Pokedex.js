// Declaración de variables locales
// relacionadas con interface html
let generacionTxt = "";
let generacionNum = 0;
let URL = "";

// Esto es para asegurarse de que el DOM esté completamente cargado antes de ejecutar el código y cambiar el tipo de variable de generacion.
document.addEventListener("DOMContentLoaded", function () {
    cargarPokemons("https://pokeapi.co/api/v2/pokemon?offset=0&limit=151");
    const selectGen = document.getElementById("generacion");
    if (selectGen) {
        // Inicialización
        generacionTxt = selectGen.options[selectGen.selectedIndex].text;
        generacionNum = selectGen.value;
        URL = CrearUrl(Number(generacionNum));
        console.log("Inicial:", generacionNum, generacionTxt, URL);

        selectGen.addEventListener("change", function () {
            generacionTxt = this.options[this.selectedIndex].text;
            generacionNum = this.value;
            URL = CrearUrl(Number(generacionNum));
            console.log("Cambiado:", generacionNum, generacionTxt, URL);
            cargarPokemons(URL); // Cargar Pokémon con la nueva URL

        });
    } else {
        console.log("No se encontró el select con id 'generacion'");
    }
});

function CrearUrl (generacion){
    switch (generacion) {
        case 1: return "https://pokeapi.co/api/v2/pokemon?offset=0&limit=151";
        case 2: return "https://pokeapi.co/api/v2/pokemon?offset=151&limit=100";
        case 3: return "https://pokeapi.co/api/v2/pokemon?offset=251&limit=135";
        case 4: return "https://pokeapi.co/api/v2/pokemon?offset=386&limit=107";
        case 5: return "https://pokeapi.co/api/v2/pokemon?offset=493&limit=156";
        default: return "";
    }
}

//Cargar los Pokémon desde la API y mostrarlos en la página
function cargarPokemons(URL) {
    console.log("METODO CARGAR Cargando desde URL:", URL);

    const contenedor = document.getElementById("pokemon-list");
    contenedor.innerHTML = "";

    let remoto = new XMLHttpRequest();
    remoto.open("GET", URL, true);

    remoto.onreadystatechange = function () {
        if (remoto.readyState === 4 && remoto.status === 200) {
            const datos = JSON.parse(remoto.responseText);
            const pokemons = datos.results;

            pokemons.forEach((pokemon) => {
                const parts = pokemon.url.split("/");
                const numero = parts[parts.length - 2];
                const numeroFormateado = numero.toString().padStart(3, '0');
                const imagen = `https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${numeroFormateado}.png`;

                const col = document.createElement("div");
                col.className = "col-12 col-md-4 col-lg-2 mb-4";
                col.innerHTML = `
                    <div class="card d-flex justify-content-center " style="width: 100%;">
                        <img src="${imagen}" class="card-img-top" alt="${pokemon.name}">
                        <div class="card-body">
                            <h5 class="card-title text-center text-capitalize">${pokemon.name}</h5>
                            <a href="pokemon.html" class="btn btn-warning d-block mx-auto mt-2 w-100" 
                                data-url="${pokemon.url}" 
                                data-name="${pokemon.name}" 
                                data-gen="${generacionNum}" 
                                data-img="${imagen}">
                                Ver Pokémon
                            </a>
                        </div>
                    </div>
                `;
                contenedor.appendChild(col);
                const boton = col.querySelector("a");
                boton.addEventListener("click", function() {
                    localStorage.setItem("pokemonDetalle", JSON.stringify({
                        url: this.dataset.url,
                        name: this.dataset.name,
                        gen: this.dataset.gen,
                        img: this.dataset.img
                    }));
                });
            });
        } else if (remoto.readyState === 4) {
            console.error("Error al obtener datos de la API:", remoto.status);
        }
    };

    remoto.send();
}




