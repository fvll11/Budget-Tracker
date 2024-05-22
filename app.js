// Elementos del DOM
const formularioTransaccion = document.getElementById('formulario-transaccion');
const descripcionInput = document.getElementById('descripcion');
const cantidadInput = document.getElementById('cantidad');
const fechaInput = document.getElementById('fecha');
const tipoInput = document.getElementById('tipo');
const listaTransacciones = document.getElementById('lista-transacciones');
const totalIngresos = document.getElementById('total-ingresos');
const totalGastos = document.getElementById('total-gastos');
const balanceTotal = document.getElementById('balance-total');

// Array para almacenar transacciones
let transacciones = [];

// Función para agregar transacción
function agregarTransaccion(descripcion, cantidad, fecha, tipo) {
    const transaccion = {
        id: generarId(),
        descripcion,
        cantidad: parseFloat(cantidad),
        fecha,
        tipo
    };
    transacciones.push(transaccion);
    actualizarUI();
}

// Función para generar ID único
function generarId() {
    return Math.floor(Math.random() * 1000000);
}

// Función para actualizar la UI
function actualizarUI() {
    actualizarResumen();
    mostrarTransacciones();
}

// Función para actualizar el resumen
function actualizarResumen() {
    const ingresos = transacciones
        .filter(transaccion => transaccion.tipo === 'ingreso')
        .reduce((sum, transaccion) => sum + transaccion.cantidad, 0);
    const gastos = transacciones
        .filter(transaccion => transaccion.tipo === 'gasto')
        .reduce((sum, transaccion) => sum + transaccion.cantidad, 0);
    const balance = ingresos - gastos;

    totalIngresos.innerText = ingresos.toFixed(2);
    totalGastos.innerText = gastos.toFixed(2);
    balanceTotal.innerText = balance.toFixed(2);
}

// Función para mostrar transacciones
function mostrarTransacciones() {
    listaTransacciones.innerHTML = '';
    transacciones.forEach(transaccion => {
        const itemTransaccion = document.createElement('li');
        itemTransaccion.className = transaccion.tipo;
        itemTransaccion.innerHTML = `
            ${transaccion.descripcion} - ${transaccion.cantidad.toFixed(2)}€ (${transaccion.fecha})
            <button onclick="eliminarTransaccion(${transaccion.id})">Eliminar</button>
        `;
        listaTransacciones.appendChild(itemTransaccion);
    });
}

// Función para eliminar transacción
function eliminarTransaccion(id) {
    transacciones = transacciones.filter(transaccion => transaccion.id !== id);
    actualizarUI();
}

// Manejo del formulario de transacción
formularioTransaccion.addEventListener('submit', function(e) {
    e.preventDefault();
    const descripcion = descripcionInput.value;
    const cantidad = cantidadInput.value;
    const fecha = fechaInput.value;
    const tipo = tipoInput.value;

    if (descripcion && cantidad && fecha) {
        agregarTransaccion(descripcion, cantidad, fecha, tipo);
        descripcionInput.value = '';
        cantidadInput.value = '';
        fechaInput.value = '';
    }
});

// Inicializar la UI
actualizarUI();
