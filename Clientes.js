const nomb = document.querySelector("#nombre")
const dni = document.querySelector("#dnicliente")
const dire = document.querySelector("#direccion")
const list = document.querySelector("#lista")
const btnMostrar = document.querySelector("#btnMostrar")
const btnEditClient = document.querySelector("#btnEditClient")
const btnGuardar = document.querySelector("#btnGuardar")
const btnCancelar = document.querySelector("#btnCancelar")


mostrarcliente()

let auxId

btnEditClient.hidden = true
btnMostrar.hidden = true
btnCancelar.hidden = true


async function guardarcliente(){

      const tamaño = dni.value.length;
  
      const resp2 = await axios.get("http://localhost:3000/Clientes");
      if (resp2.data.find((cliente) => cliente.dni == dni.value && tamaño <= 8)) {
        alert("No se puede guardar");
      } else {
        const resp1 = await axios.post("http://localhost:3000/Clientes", {
          dni: parseInt(dni.value),
          nombre: nomb.value,
          direccion: dire.value,
        });
      }

  }




// async function guardarcliente(){

//     const tamaño = dni.value.lenght;
    
//     resp1 = await axios.get("http://localhost:3000/Clientes");
//     if(resp1.data.forEach(cliente => cliente.dni === dni.value && (tamaño <= 8))){
//             alert ("no se puede guardar")
//         }
//         else{            
//             resp2 = await axios.post ("http://localhost:3000/Clientes", {       
//             dni: parseInt(dni.value),
//             nombre: nomb.value,
//             direccion: dire.value,
//         })
//     }
// }


async function mostrarcliente(){
    resp= await axios.get("http://localhost:3000/Clientes")
    list.innerHTML = 
     `
    <h4> Lista de clientes:</h4>
    <tr>
      <th scope="col">Nombre</th>
      <th scope="col">DNI</th>
      <th scope="col">Direccion</th>
      <th scope="col"></th>
      <th scope="col"></th>
    </tr>
    `
    resp.data.forEach(Clientes => {
        list.innerHTML +=
        `       
        <tr>
        <th scope="col"> ${Clientes.nombre}</th>
        <th scope="col">${Clientes.dni}</th>
        <th scope="col">${Clientes.direccion}</th>
        <th scope="col"><button onclick="borrarCliente(${Clientes.id})" class="btn btn-danger">Borrar</button>
        <th scope="col"><button onclick="editarCliente(${Clientes.id})" class="btn btn-success">Editar</button>
        </tr>
        `
    })
    btnMostrar.hidden = true
}

async function borrarCliente(id){
    auxId = id
    resp = await axios.get("http://localhost:3000/Clientes/"+id)
    resp2 = await axios.get("http://localhost:3000/prestamo")

    if(resp2.data.find(prestamo => (prestamo.fechaDevolucion === "") && (resp2.data.find(prestamo => prestamo.clienteId === auxId)))){
        alert ("No se puede borrar el cliente porque tiene un prestamo activo")
    }
    
    else{
        await axios.delete("http://localhost:3000/Clientes/" +id)
    }

    

}




async function editarCliente(id){
    auxId = id
    resp = await axios.get("http://localhost:3000/Clientes/"+ id)
    resp2 = await axios.get("http://localhost:3000/prestamo")

    if(resp2.data.find((prestamo)=> prestamo.fechaDevolucion === "" && (prestamo.clienteId === auxId))){  
          alert("No se puede editar el cliente porque tiene un prestamo activo")    
    }

    else{
      btnGuardar.hidden = true
      btnEditClient.hidden = false
      btnCancelar.hidden = false
      nomb.value
      dni.value 
      dire.value 
    }
}


async function editarCliente1(){
        resp = await axios.patch("http://localhost:3000/Clientes/"+ auxId), {
        dni:dni.value,
        nombre:nomb.value,
        direccion:dire.value 
    }
}

function cancelarEdicion(){
    btnGuardar.hidden = false
    nomb.value = ""
    dni.value = ""
    dire.value = ""
    btnEditClient.hidden = false
    btnCancelar.hidden = false
}




