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
let nombCliente



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
        cont = resp.data.vecesPrestado;
        cont1 = parseInt(cont)
        resp4 = axios.patch("http://localhost:3000/Libros/"+ axId,{
            prestado : true,
            vecesPrestado : cont1+1
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
    
async function reporteLibros(){
    resp = await axios.get("http://localhost:3000/prestamo");
    resp2 = await axios.get("http://localhost:3000/Clientes");
    resp3 = await axios.get("http://localhost:3000/Libros");

    regAlquilados.innerHTML = `
    <caption id="caption_prestamo">Reporte de todos los Libros alquilados</caption>
        <tr id="tr_prestamo">
         <th id="th_prestamo">Nombre</th>
         <th id="th_prestamo">Autor</th>
         <th id="th_prestamo">Cliente</th>
         <th id="th_prestamo">Fecha Prestamo</th>
        </tr    `

        regAlquilados.innerHTML += `       
         <tr id="tr_prestamo">
         <th id="th_prestamo"></th>
         <th id="th_prestamo"></th>
         <th id="th_prestamo"></th>
         <th id="th_prestamo"></th>
         </tr>
         `
         
    resp.data.forEach((prestamo)=>{
    resp2.data.forEach((cliente) => {
        if(prestamo.clienteId === cliente.id){
            nombCliente = cliente.nombre
        } 
    })

    resp3.data.forEach((libro) => {
            if (prestamo.LibroId === libro.id){
                nombautor = libro.autor
                nomblibro = libro.Nombrelibro
            }
         })

         regAlquilados.innerHTML +=`       
         <tr id="tr_prestamo">
         <th id="tr_prestamo"> ${nomblibro}</th>
         <th id="tr_prestamo">${nombautor}</th>
         <th id="tr_prestamo">${nombCliente}</th>
         <th id="tr_prestamo">${prestamo.fechaPrestamo}</th>
         </tr>
         `          
        
});
}
 

