const NomLibro = document.querySelector("#NomLibro")
const autor = document.querySelector("#autor_libro")
const lista = document.querySelector("#lista")
const btnGuardar = document.querySelector("#btnGuardar")
const btnMostrar = document.querySelector("#btnMostrar")
const btnEditar = document.querySelector("#btnEditar")
const btnCancelar = document.querySelector("#btnCancelar")
const imputPrestado =  document.querySelector("#contprestamo")

mostrarlibros()

btnMostrar.hidden = true
btnCancelar.hidden = true
imputPrestado.hidden = true





async function mostrarlibros(){

    resp = await axios.get("http://localhost:3000/Libros")
    lista.innerHTML = 
    `
    <h3> Lista de libros</h3>
    <tr>
      <th scope="col">Nombre:</th>
      <th scope="col">Autor:</th>
      <th scope="col">Prestado:</th>
      <th scope="col"></th>
      <th scope="col"></th>
    </tr
    `
    resp.data.forEach(Libros => {
        lista.innerHTML += 
        `       
        <tr>
        <th scope="col"> ${Libros.Nombrelibro}</th>
        <th scope="col">${Libros.autor}</th>
        <th scope="col">${Libros.prestado}</th>
        <th scope="col"><button onclick="borrarlibro(${Libros.id})">Borrar</button>
        <th scope="col"><button onclick="editarlibro(${Libros.id})">Editar</button>
        </tr>
        `
    });

}

async function guardarlibro(){
  
  // resp= await axios.get("http://localhost:3000/Libros")

  resp= await axios.post ("http://localhost:3000/Libros",{

    Nombrelibro: NomLibro.value,
    autor: autor.value,
    prestado: false,
  
  })

}


async function borrarlibro(id){


  resp = await axios.get("http://localhost:3000/Libros/"+id)
    // alert("Se borro el libro correctamente")
    await axios.delete("http://localhost:3000/Libros/"+id)


}




