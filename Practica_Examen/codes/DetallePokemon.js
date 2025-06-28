document.addEventListener("DOMContentLoaded", function(){
    const datos = JSON.parse(localStorage.getItem("pokemonDetalle"))
    if(datos){
        CargarDetallenPokemon(datos.url, datos.name,datos.img,datos.gen);
    }else{
        console.error("NOhay datos de Pokémon en localStorage");
    }
})

function CargarDetallenPokemon(URL,name,img,gen){
    console.log("METODO CARGAR DETALLE desde URL:", URL);

    const contenedor = document.getElementById("pekemon-detalle");

    let remoto = new XMLHttpRequest();
    remoto.open("GET", URL, true);

    remoto.onreadystatechange = function () {
        if (remoto.readyState === 4 && remoto.status === 200) {

            const datos = JSON.parse(remoto.responseText);
            //const pokemonDetalle = datos.results;
            const id = datos.id;
            const peso = datos.weight;
            const altura = datos.height;

            // Obtener tipos
            const tipos = datos.types.map(t => t.type.name).join(" - ");

            // Obtener habilidades
            const habilidades = datos.abilities.map(a => a.ability.name).join(" - ");

            // Obtener solo 5 movimientos
            const movimientos = datos.moves.slice(0, 5).map(m => m.move.name).join(" - ");

            const detalle = document.createElement("div");
                detalle.innerHTML = `
                    <div class="row justify-content-center">
                        <div class="col-12">
                            <div class="py-2 mb-3" style="background: #FFD600; border: 1px solid #222;">
                                <h2 class="text-center m-0" style="font-weight: bold;">${name}</h2>
                            </div>
                        </div>
                    </div>
                    <div class="row align-items-center">
                        <div class="col-md-5 text-center mb-3 mb-md-0">
                            <img src="${img}" alt="Pokémon" class="img-fluid" style="max-width: 300px;">
                        </div>
                        <div class="col-md-7">
                            <p><strong>Generation:</strong>${gen}</p>
                            <p><strong>Pokémon ID:</strong> ${id}</p>
                            <p><strong>Weight:</strong>${peso}kgs<br><strong>Height:</strong>${altura}mts</p>
                            <p><strong>Types:</strong><br>${tipos}</p>
                            <p><strong>Abilities:</strong><br>${habilidades}</p>
                            <p><strong>Moves:</strong><br>${movimientos}</p>
                        </div>
                    </div>
                    <hr class="mt-4">
                    <div class="text-center mb-4">
                        <a href="index.html" class="btn btn-dark">Volver</a>
                    </div>
                `;
                contenedor.innerHTML = ""; // Limpiar el contenedor antes de agregar el detalle
                contenedor.appendChild(detalle);


        } else if (remoto.readyState === 4) {
            console.error("Error al obtener datos de la API:", remoto.status);
        }
    };
    remoto.send();
}