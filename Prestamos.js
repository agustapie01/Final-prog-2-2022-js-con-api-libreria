const selectLibro = document.querySelector("#selectLibro");
const selectCliente = document.querySelector("#selectCliente");
const list = document.querySelector("#ista");
const regisPrestamo = document.querySelector("#regPrestamo");
const devolv = document.querySelector("#devolver");
const fecha = document.querySelector("fecha");
const regAlquilados = document.querySelector("regAlquilados");
const regNoDevueltos = document.querySelector("regNoDevueltos");

selectAutos();
regPrestamo();
selectClientes();

let axId
let idClient
let fecha1 = fecha.value
let fechaDevol = new Date()
let fechaDev = fechaDevol.toLocaleString()