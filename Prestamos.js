const selectLibro = document.querySelector("#selectLibro");
const selectCliente = document.querySelector("#selectCliente");
const list = document.querySelector("#ista");
const regisPrestamo = document.querySelector("#regPrestamo");
const devolv = document.querySelector("#devolver");
const fecha = document.querySelector("fecha");
const regAlquilados = document.querySelector("regAlquilados");
const regNoDevueltos = document.querySelector("regNoDevueltos");

selectLibros();
regPrestamo();
selectClientes();

let axId
let idClient
let fecha1 = fecha.value
let fechaDevol = new Date()
let fechaDev = fechaDevol.toLocaleString()
let nombCliente



async function selectLibros(){
    resp = await axios.get ("http://localhost:3000/Libros");

    selectLibro.innerHTML = `<option disabled selected value="0">Selecciona un libro</option>`

    resp.data.forEach((Libros) => {
        if(Libros.prestado == false){
            selectLibro.innerHTML += `<option value="${Libros.id}" id="idVehiculo">${Libros.NombreLibro}</option>`;
        }
    });
}

    async function selectClientes(){
    resp= await axios.get  ("http://localhost:3000/Clientes");

    selectCliente.innerHTML = '<option disabled selected value="0">Selecciona un cliente</option>';

    resp.data.forEach((Clientes) => {

        selectCliente.innerHTML += `<option value="${Clientes.id}" id="idCliente">${Clientes.Nombrelibro}</option>`
    });

    }


 async function regPrestamo(){
    resp = await axios.get ("http://localhost:3000/Libros");
    resp2 = await axios.get ("http://localhost:3000/prestamo");
    regisPrestamo.innerHTML =  `
    <caption>Registro de vehiculos alquilados</caption>
    <tr>
        <th scope="col">Nombre</th>
        <th scope="col">Autor</th>
        <th scope="col">Veces alquilados</th>
        <th scope="col">Devolver</th>
    </tr    `;

    resp.data.forEach((Libros) => {
        if(Libros.prestado == true){
            regisPrestamo.innerHTML +=`       
            <tr>
            <th scope="col"> ${Libros.Nombrelibro}</th>
            <th scope="col">${Libros.autor}</th>
            <th scope="col">${Libros.prestado}</th>
            <th scope="col"><button onclick="devolverLibros(${Libros.id})">Devolver</button>
            </tr>
            `;
        }
        });
} 

async function devolverLibros(id){
    auxId = id;
    
    resp = await axios.patch("http://localhost:3000/Clientes/" + id,{
        prestado:false,
    });

    resp2 = await axios.get ("http://localhost:3000/prestamo");

    resp2.data.forEach((element) => {
        if (element.fechaDevolucion == "" && element.LibroId == auxId){
            resp3 = axios.patch("http://localhost:3000/prestamo/" + element.id,{
                fechaDevolucion: fechaDev,
            });
        } 
    });
}
   
async function alquilarLibros() {
    
}
    
        
    
 

