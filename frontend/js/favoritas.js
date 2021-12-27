window.onload = () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);

  // Aqui debemos agregar nuestro fetch

  let executeFetch = async ()=>{
    try {
      let response = await fetch("http://localhost:3001/api/movies");
      let peliculas = await response.json();
      pintarCards(peliculas);
    } catch (error) {
      console.log(error)
    }
  };
  executeFetch();
  let ids = JSON.parse(sessionStorage.getItem("ids"));

  // Codigo que debemos usar para mostrar los datos en el frontend
  let pintarCards = (peliculas)=> {

    let data = peliculas.data;

    if(!ids) {
      const msg = document.createElement("h3");
      msg.textContent = "No tienes películas favoritas actualmente.";
      container.appendChild(msg);
    }else{
      data.forEach((movie) => {
        if(ids && ids.find(element => element === movie.id)){
  
          const card = document.createElement("div");
          card.setAttribute("class", "card");
      
          const h1 = document.createElement("h1");
          h1.textContent = movie.title;
      
          const p = document.createElement("p");
          p.textContent = `Rating: ${movie.rating}`;
      
          const duracion = document.createElement("p");
          duracion.textContent = `Duración: ${movie.length}`;
      
          container.appendChild(card);
          card.appendChild(h1);
          card.appendChild(p);
          if (movie.genre !== null) {
            const genero = document.createElement("p");
            genero.textContent = `Genero: ${movie.genre.name}`;
            card.appendChild(genero);
          }
          card.appendChild(duracion);
        }

      });
    }
  
  }
};