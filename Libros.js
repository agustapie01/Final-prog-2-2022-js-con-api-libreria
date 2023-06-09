

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
btnEditar.hidden = true


let auxId 


async function mostrarlibros(){

    resp = await axios.get("http://localhost:3000/Libros")
    lista.innerHTML = 
    `
    <h3> Lista de libros</h3>
    <tr>
      <th scope="col"></th>
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
        <th scope="col"> ${Libros.id}</th>
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


  resp2 = await axios.get("http://localhost:3000/Libros")

  
  if(resp2.data.filter((Libros)=>Libros.Nombrelibro === NomLibro.value)){
    resp= await axios.post ("http://localhost:3000/Libros",{
    Nombrelibro: NomLibro.value,
    autor: autor.value,
    prestado: false,
    vecesPrestado: 0  
  })
  alert("se guardo piola")
    
  }

  else{
    alert("No se puede guardar")


  }

}


async function borrarlibro(id){
  resp = await axios.get("http://localhost:3000/Libros/"+id)
  
  if(resp.data.vecesPrestado>0){
    alert("No se puede borrar el Libro porque fue alquilado alguna vez")
  } 
  
  else{
    
    await axios.delete("http://localhost:3000/Libros/"+id)
  }

}




async function editarlibro(id){
  auxId = id
  resp = await axios.get ("http://localhost:3000/Libros/"+ id)
  resp2 = await axios.get("http://localhost:3000/prestamo")
  if(resp2.data.find((prestamo)=> prestamo.LibrosId == id)){
    alert("No se puede editar el libro porque esta alquilado")
    NomLibro.value = ""
    autor.value = ""
    btnCancelar.hidden =false
    btnGuardar.hidden = true
    btnEditar.hidden = false
  }

  else{
    btnCancelar.hidden =false
    btnGuardar.hidden = true
    btnEditar.hidden = false
    NomLibro.value = resp.data.Nombrelibro
    autor.value = resp.data.autor
  }
        

}




async function editarlibro1(){
  resp = await axios.patch("http://localhost:3000/Libros/"+ auxId,{
    Nombrelibro: NomLibro.value,
    autor:autor.value
    
  })
}

async function cancelarEdit(){
  NomLibro.value = ""
  autor.value = ""

  btnCancelar.hidden = true
  btnEditar.hidden = true
  btnGuardar.hidden = false

  
}






