const selectLibro = document.querySelector("#selectLibro");
const selectCliente = document.querySelector("#selectCliente");
const regisPrestamo = document.querySelector("#regPrestamo");
const devolv = document.querySelector("#devolver");
const fecha = document.querySelector("#fecha");
const regAlquilados = document.querySelector("#regAlquilados");
const regNoDevueltos = document.querySelector("#regNoDevueltos");

selectLibros();
regPrestamo();
selectClientes();

let axId
let idClient
let fecha1 = fecha.value
let fechaDevol = new Date()
let fechaDev = fechaDevol.toLocaleString()
let nombautor
let nomblibro



async function selectLibros(){
    resp = await axios.get("http://localhost:3000/Libros");

    selectLibro.innerHTML = `<option disabled selected value="0">Selecciona un libro</option>`

    resp.data.forEach((Libros) => {
        if(Libros.prestado == false){
            selectLibro.innerHTML += `<option value="${Libros.id}" id="idLibros">${Libros.Nombrelibro}</option>`;
        }
    });
}

    async function selectClientes(){
    resp= await axios.get("http://localhost:3000/Clientes");

    selectCliente.innerHTML = '<option disabled selected value="0">Selecciona un cliente</option>';

    resp.data.forEach((Clientes) => {

        selectCliente.innerHTML += `<option value="${Clientes.id}" id="idCliente">${Clientes.nombre}</option>`
    });

    }


 async function regPrestamo(){
    resp = await axios.get("http://localhost:3000/Libros");
    resp2 = await axios.get("http://localhost:3000/prestamo");
    regisPrestamo.innerHTML =  `
    <caption id="caption_prestamo">Registro de Libros alquilados</caption>
    <tr id="caption_prestamo">
        <th>Nombre</th>
        <th>Autor</th>
        <th>Prestado</th>
    </tr    `;

    resp.data.forEach((Libros) => {
        if(Libros.prestado == true){
            regisPrestamo.innerHTML +=`       
            <tr id="caption_prestamo">
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
   
    resp = await axios.patch("http://localhost:3000/Libros/" + id,{
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
   
async function alquilarLibro() {
    
    if(
        selectLibro.value > 0 &&
        selectCliente.value > 0 &&
        fecha1 != fecha.value
    ){
        axId = selectLibro.value;
        resp = await axios.get("http://localhost:3000/Libros/" + axId);
        resp4 = axios.patch("http://localhost:3000/Libros/"+ axId,{
            prestado : true,
        });

        resp2 = await axios.get("http://localhost:3000/Clientes"),
            idClient = selectCliente.value;
        

        resp3 = await axios.post("http://localhost:3000/prestamo", {
            LibroId: parseInt(axId),
            clienteId: parseInt(idClient),
            fechaPrestamo: fecha.value,
            fechaDevolucion: "",

        });

        

    }
    
}
    
// async function reporteLibros(){
//     resp = await axios.get("http://localhost:3000/prestamo");
//     resp2 = await axios.get("http://localhost:3000/Clientes");
//     resp3 = await axios.get("http://localhost:3000/Libros");

//     regAlquilados.innerHTML = `
//     <caption>Reporte de todos los Libros alquilados</caption>
//         <tr>
//          <th scope="col">Nombre</th>
//          <th scope="col">Autor</th>
//          <th scope="col">Cliente</th>
//          <th scope="col">Fecha Prestamo</th>
//         </tr    `

//         regAlquilados.innerHTML += `       
//          <tr>
//          <th scope="col"></th>
//          <th scope="col"></th>
//          <th scope="col"></th>
//          <th scope="col"></th>
//          </tr>
//          `
         
//     resp.data.forEach((prestamo)=>{
//     resp2.data.forEach((Clientes) => {

//         if(prestamo.clienteId === clienteId){
//             nombCliente = Clientes.nombre
//         } 
//     })

//     resp3.data.forEach((Libros) => {
//             if (prestamo.LibroId === Libro.id){
//                 nombautor = Libros.autor
//                 nomblibro = Libros.Nombrelibro
//             }
//          })

//          regAlquilados.innerHTML +=`       
//          <tr>
//          <th scope="col"> ${NombLibro}</th>
//          <th scope="col">${autor}</th>
//          <th scope="col">${nombCliente}</th>
//          <th scope="col">${prestamo.fechaPrestamo}</th>
//          </tr>
//          `          
        
// });
        
// }    
 
// async function reporteNodevueltos(){
//     try{
//         resp= await axios.get("http://localhost:3000/Libros");
//         resp2 = await axios.get("http://localhost:3000/prestamo");
//         regAlquilados.innerHTML = `
//         <caption>Registro de Libros alquilados no devueltos</caption>
//         <tr>
//             <th scope="col">Nombre</th>
//             <th scope="col">Autor</th>
//         </tr    `;
    

//     resp.data.forEach((Libros) =>{
//         if(Libros.prestado == true) {
//             regAlquilados.innerHTML += `       
//             <tr>
//             <th scope="col"> ${Libros.Nombrelibro}</th>
//             <th scope="col">${Libros.autor}</th>
//             </tr>
//             `;
//         }
//     })}
//     catch (error) {
//         alert(error)
//         alert("se predujo un error en la funcion")
//     }
// }

