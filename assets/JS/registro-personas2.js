(function () {
  var id = 0;
  const btnGuardar = document.getElementById('guardar');

  document.addEventListener('readystatechange', function () {
    if (document.readyState === 'interactive') {
      // con esta funcion, funciona todo lo demas
      pintarTablaInicio();
      console.log(id);
    }
  });

  function cargarDatosLocalStorage() {
    let retorno = [];
    if (localStorage.getItem('usuario') !== null) {
      // si los datos son diferentes de null, se llena la tabla
      retorno = JSON.parse(localStorage.getItem('usuario'));
    }
    return retorno;
  }
  const datosUsuario = cargarDatosLocalStorage(); // Array()
  const formulario = document.getElementsByTagName('form')[0];
  const tbody = document.getElementsByTagName('tbody')[0];

  formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();
  });
  formulario.addEventListener('submit', function (evento) {
    const nombre = formulario.nombre.value;
    const email = formulario.email.value;
    const contraseña = formulario.contraseña.value;

    const objetoUsuarioTemporal = {
      id: id,
      nombre: nombre,
      email: email,
      contraseña: contraseña,
    };

    // añade elemento al LocalStorage
    anadirElementoALaListaYLocalStorage(objetoUsuarioTemporal);
    // añade elemento a la tabla
    anadirElementosTabla(objetoUsuarioTemporal);

    //resetea el formulario
    alert('Usuario registrado con exito');

    formulario.reset();
  });

  function anadirElementoALaListaYLocalStorage(producto) {
    datosUsuario.push(producto);
    localStorage.setItem('usuario', JSON.stringify(datosUsuario));
    // se imprime el id incrementable
    id++;
  }

  function anadirElementosTabla(hijoAnadir) {
    // creamos la fila
    const trTemporal = document.createElement('tr');

    //td id
    const tdId = document.createElement('td');
    tdId.innerText = hijoAnadir.id;

    // creamos los nodos hijos (TD)
    const tdNombre = document.createElement('td');
    // asignamos el texto del nombre a la columna nombre
    tdNombre.innerText = hijoAnadir.nombre;

    // creamos la columna email
    const tdEmail = document.createElement('td');
    // asignamos el texto del email a la columna email
    tdEmail.innerText = hijoAnadir.email;

    // creamos ta columna contraseña
    const tdContraseña = document.createElement('td');
    // asignamos el texto a la columna contraseña
    tdContraseña.innerText = hijoAnadir.contraseña;

    // Creando botones de accion
    const tdAccion = document.createElement('td');
    const btnBorrar = document.createElement('button');
    const btnEditar = document.createElement('button');

    btnBorrar.classList.add('btn', 'btn-danger');
    btnBorrar.addEventListener('click', function () {
      eliminarElemento(hijoAnadir.id);
    });

    btnEditar.addEventListener('click', function () {
      document.getElementById('nombre').value = hijoAnadir.nombre;
      document.getElementById('email').value = hijoAnadir.email;
      document.getElementById('contraseña').value = hijoAnadir.contraseña;

      btnGuardar.addEventListener('click', function () {
        editarElemento(hijoAnadir.id);
      });
    });

    btnEditar.classList.add('btn', 'btn-info');

    btnBorrar.innerText = '☠️';
    btnEditar.innerText = '✍';

    // asignar botones de accion al tdAccion
    tdAccion.appendChild(btnBorrar);
    tdAccion.appendChild(btnEditar);

    // asignar los hijo a la filas
    trTemporal.appendChild(tdId);
    trTemporal.appendChild(tdNombre);
    trTemporal.appendChild(tdEmail);
    trTemporal.appendChild(tdContraseña);
    trTemporal.appendChild(tdAccion);

    // añadimos la fila creada a la tabla en el doom
    tbody.appendChild(trTemporal);
  }

  function pintarTablaInicio() {
    if (datosUsuario.length != 0) {
      for (let i = 0; i < datosUsuario.length; i++) {
        anadirElementosTabla(datosUsuario[i]);
        console.log(datosUsuario);
        id = datosUsuario[i].id + 1;
      }
    }
  }

  function eliminarElemento(id) {
    const respuesta = window.confirm('Seguro que quieres borrar al usuario?');
    if (respuesta) {
      let users = [];
      let datosEnLocalStorage = localStorage.getItem('usuario'); // 'personas'

      users = JSON.parse(datosEnLocalStorage);

      users.splice(id, 1);

      localStorage.setItem('usuario', JSON.stringify(users));

      window.alert('Borrado correctamente');
      location.reload();
    }
  }

  function editarElemento(id) {
    for (const i in datosUsuario) {
      if (datosUsuario[i].id == id) {
        // agrego datos modificados a la localStorage
        datosUsuario[i].nombre = document.getElementById('nombre').value;
        datosUsuario[i].email = document.getElementById('email').value;
        datosUsuario[i].contraseña =
          document.getElementById('contraseña').value;

        localStorage.setItem('usuario', JSON.stringify(datosUsuario));
      }
    }
  }
})();
