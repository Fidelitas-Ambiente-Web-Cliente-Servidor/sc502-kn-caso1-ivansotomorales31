const menu = [
  { nombre: 'Bruschetta Clásica',     descripcion: 'Pan tostado con tomate y albahaca fresca',    precio: 4500,  categoria: 'Entrada'      },
  { nombre: 'Tabla de Quesos',         descripcion: 'Selección de quesos importados con mermelada', precio: 7800,  categoria: 'Entrada'      },
  { nombre: 'Lomo al Vino Tinto',      descripcion: 'Lomo de res en reducción de vino tinto',       precio: 15500, categoria: 'Plato Fuerte' },
  { nombre: 'Pasta Carbonara',         descripcion: 'Pasta con tocino, huevo y queso parmesano',    precio: 10200, categoria: 'Plato Fuerte' },
  { nombre: 'Salmón a la Plancha',     descripcion: 'Filete de salmón con vegetales al vapor',      precio: 13800, categoria: 'Plato Fuerte' },
  { nombre: 'Tiramisú',               descripcion: 'Postre italiano con café y mascarpone',          precio: 5200,  categoria: 'Postre'       },
  { nombre: 'Cheesecake de Maracuyá', descripcion: 'Cheesecake cremoso con coulis de maracuyá',    precio: 4800,  categoria: 'Postre'       },
];

const reservas = [];


function renderMenu(listaMenu = menu) {

  // Obtener el contenedor donde se mostrarán las tarjetas
  const contenedor = document.getElementById('contenedor-menu');

  // Limpiar contenido anterior
  contenedor.innerHTML = '';

  // Recorrer cada plato del menú
  listaMenu.forEach(plato => {

    const columna = document.createElement('div');
    columna.className = 'col-md-4';

    const card = document.createElement('div');
    card.className = 'card-plato';

    const nombre = document.createElement('h3');
    nombre.textContent = plato.nombre;

    const descripcion = document.createElement('p');
    descripcion.textContent = plato.descripcion;

    const precio = document.createElement('p');
    precio.textContent = '₡' + plato.precio.toLocaleString();

    const categoria = document.createElement('p');
    categoria.textContent = 'Categoría: ' + plato.categoria;

    card.appendChild(nombre);
    card.appendChild(descripcion);
    card.appendChild(precio);
    card.appendChild(categoria);

    columna.appendChild(card);

    contenedor.appendChild(columna);

  });

}


function filtrarCategoria(categoria) {

  if (categoria === 'Todos') {
    renderMenu();
  } else {

    const menuFiltrado = menu.filter(plato => plato.categoria === categoria);

    renderMenu(menuFiltrado);
  }

  const botones = document.querySelectorAll('.boton-filtro');

  botones.forEach(boton => {
    boton.classList.remove('activo');
  });

  if (categoria === 'Todos') {
    document.getElementById('btn-todos').classList.add('activo');
  } else if (categoria === 'Entrada') {
    document.getElementById('btn-entradas').classList.add('activo');
  } else if (categoria === 'Plato Fuerte') {
    document.getElementById('btn-fuertes').classList.add('activo');
  } else if (categoria === 'Postre') {
    document.getElementById('btn-postres').classList.add('activo');
  }

}


function validarFormulario() {

  // Obtener valores de los campos
  const nombre = document.getElementById('nombre').value.trim();
  const correo = document.getElementById('correo').value.trim();
  const fecha = document.getElementById('fecha').value;
  const hora = document.getElementById('hora').value;
  const personas = document.getElementById('personas').value;

  // Obtener contenedores de error
  const errorNombre = document.getElementById('error-nombre');
  const errorCorreo = document.getElementById('error-correo');
  const errorFecha = document.getElementById('error-fecha');
  const errorHora = document.getElementById('error-hora');
  const errorPersonas = document.getElementById('error-personas');

  // Limpiar mensajes anteriores
  errorNombre.textContent = '';
  errorCorreo.textContent = '';
  errorFecha.textContent = '';
  errorHora.textContent = '';
  errorPersonas.textContent = '';

  let formularioValido = true;

  // Validar nombre: obligatorio, mínimo 5 caracteres, solo letras y espacios
  const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

  if (nombre === '') {
    errorNombre.textContent = 'El nombre es obligatorio.';
    formularioValido = false;
  } else if (nombre.length < 5) {
    errorNombre.textContent = 'El nombre debe tener mínimo 5 caracteres.';
    formularioValido = false;
  } else if (!regexNombre.test(nombre)) {
    errorNombre.textContent = 'El nombre solo puede contener letras y espacios.';
    formularioValido = false;
  }

  // Validar correo con expresión regular
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (correo === '') {
    errorCorreo.textContent = 'El correo es obligatorio.';
    formularioValido = false;
  } else if (!regexCorreo.test(correo)) {
    errorCorreo.textContent = 'Ingrese un correo válido.';
    formularioValido = false;
  }

  // Validar fecha obligatoria y que no sea pasada
  const fechaActual = new Date();
  fechaActual.setHours(0, 0, 0, 0);

  const fechaReserva = new Date(fecha);
  fechaReserva.setHours(0, 0, 0, 0);

  if (fecha === '') {
    errorFecha.textContent = 'La fecha es obligatoria.';
    formularioValido = false;
  } else if (fechaReserva < fechaActual) {
    errorFecha.textContent = 'La fecha no puede ser pasada.';
    formularioValido = false;
  }

  // Validar hora
  if (hora === '') {
    errorHora.textContent = 'Debe seleccionar una hora.';
    formularioValido = false;
  }

  // Validar personas entre 1 y 20
  if (personas === '') {
    errorPersonas.textContent = 'El número de personas es obligatorio.';
    formularioValido = false;
  } else if (personas < 1 || personas > 20) {
    errorPersonas.textContent = 'El número de personas debe estar entre 1 y 20.';
    formularioValido = false;
  }

  // Activar o desactivar botón según validez del formulario
  document.getElementById('btn-reservar').disabled = !formularioValido;

  return formularioValido;
}

function agregarReserva() {

  const reserva = {
    nombre: document.getElementById('nombre').value.trim(),
    correo: document.getElementById('correo').value.trim(),
    fecha: document.getElementById('fecha').value,
    hora: document.getElementById('hora').value,
    personas: parseInt(document.getElementById('personas').value),
    comentarios: document.getElementById('comentarios').value.trim()
  };

  // Guardar reserva en el arreglo
  reservas.push(reserva);

  // Crear fila de la tabla
  const fila = document.createElement('tr');
  fila.className = 'fila-reserva';

  // Resaltar grupos de 6 o más personas
  if (reserva.personas >= 6) {
    fila.classList.add('fila-vip');
  }

  fila.innerHTML = `
    <td>${reserva.nombre}</td>
    <td>${reserva.correo}</td>
    <td>${reserva.fecha}</td>
    <td>${reserva.hora}</td>
    <td>${reserva.personas}</td>
  `;

  document.getElementById('tabla-reservas').appendChild(fila);

  // Actualizar resumen
  actualizarResumen();

  // Limpiar formulario
  document.getElementById('form-reserva').reset();

  // Deshabilitar nuevamente el botón
  document.getElementById('btn-reservar').disabled = true;
}


function actualizarResumen() {

  const totalReservas = reservas.length;

  let totalPersonas = 0;
  let mayorReserva = 0;

  reservas.forEach(reserva => {

    totalPersonas += reserva.personas;

    if (reserva.personas > mayorReserva) {
      mayorReserva = reserva.personas;
    }

  });

  document.getElementById('resumen').innerHTML = `
    <p><strong>Total de reservas:</strong> ${totalReservas}</p>
    <p><strong>Total de personas esperadas:</strong> ${totalPersonas}</p>
    <p><strong>Reserva más grande:</strong> ${mayorReserva} personas</p>
  `;

}


document.addEventListener('DOMContentLoaded', function () {
  renderMenu();

  document.getElementById('btn-todos').addEventListener('click', function () {
    filtrarCategoria('Todos');
  });

  document.getElementById('btn-entradas').addEventListener('click', function () {
    filtrarCategoria('Entrada');
  });

  document.getElementById('btn-fuertes').addEventListener('click', function () {
    filtrarCategoria('Plato Fuerte');
  });

  document.getElementById('btn-postres').addEventListener('click', function () {
    filtrarCategoria('Postre');
  });

document.getElementById('nombre').addEventListener('input', validarFormulario);
  document.getElementById('correo').addEventListener('input', validarFormulario);
  document.getElementById('fecha').addEventListener('input', validarFormulario);
  document.getElementById('hora').addEventListener('change', validarFormulario);
  document.getElementById('personas').addEventListener('input', validarFormulario);

});


document.getElementById('form-reserva').addEventListener('submit', function (e) {

  e.preventDefault();

  if (validarFormulario()) {
    agregarReserva();
  }

});


