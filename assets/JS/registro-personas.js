(function () {
  //Cargar datos desde el formulario
  window.onload = function () {
    var localStorageKeyName = 'data';

    cargarDesdeLocalStorage();

    document
      .querySelector('#btn-submit')
      .addEventListener('click', function () {
        var nombre = document.getElementById('nombre'),
          email = document.getElementById('email'),
          contraseña = document.getElementById('contraseña');

        // Validar
        if (
          nombre.value.length === 0 ||
          email.value.lenght === 0 ||
          contraseña.value.length === 0
        )
          return;

        var usuario = {
          nombre: nombre.value,
          email: email.value,
          contraseña: contraseña.value,
        };

        // Limpiar datos
        nombre.value = '';
        email.value = '';
        contraseña.value = '';

        // Agregar a local storage
        appendObjectToLocalStorage(usuario);
      });

    function appendObjectToLocalStorage(obj) {
      var usuarios = [],
        dataInLocalStorage = localStorage.getItem(localStorageKeyName);

      if (dataInLocalStorage !== null) {
        usuarios = JSON.parse(dataInLocalStorage);
      }

      usuarios.push(obj);

      localStorage.setItem(localStorageKeyName, JSON.stringify(usuarios));

      cargarDesdeLocalStorage();
    }

    //Cargar datos desde localStorage
    function cargarDesdeLocalStorage() {
      var usuarios = [],
        dataInLocalStorage = localStorage.getItem(localStorageKeyName),
        tbody = document.querySelector('#tbl tbody');

      if (dataInLocalStorage !== null) {
        usuarios = JSON.parse(dataInLocalStorage);
      }

      // Llenar la tabla
      tbody.innerText = '';

      usuarios.forEach(function (x, i) {
        var tr = document.createElement('tr'),
          tdNombre = document.createElement('td'),
          tdEmail = document.createElement('td'),
          tdContraseña = document.createElement('td'),
          //Botones
          tdRemove = document.createElement('td'),
          btnRemove = document.createElement('button'),
          tdModificar = document.createElement('td'),
          btnModificar = document.createElement('button');

        tdNombre.innerText = x.nombre;
        tdEmail.innerText = x.email;
        tdContraseña.innerText = x.contraseña;

        //Edicion botones
        btnRemove.textContent = '☠️';
        btnRemove.className = 'btn btn-block btn-danger';
        btnRemove.addEventListener('click', function () {
          borrarDesdeLocalStorage(i);
        });

        btnModificar.textContent = '👨🏻‍💻';
        btnModificar.className = 'btn btn-block btn-info';
        btnModificar.addEventListener('click', function () {
          //ModificarDesdeLocalStorage(i);
        });

        //Agregar los td a la tabla
        tdRemove.appendChild(btnRemove);

        tdModificar.appendChild(btnModificar);

        tr.appendChild(tdNombre);
        tr.appendChild(tdContraseña);
        tr.appendChild(tdEmail);
        tr.appendChild(tdRemove);
        tr.appendChild(tdModificar);

        tbody.appendChild(tr);
      });
    }
    //Borrar datos
    function borrarDesdeLocalStorage(index) {
      const respuesta = window.confirm(
        '¿Estas seguro de que quieres eliminar al usuario?'
      );
      if (respuesta) {
        var usuarios = [],
          dataInLocalStorage = localStorage.getItem(localStorageKeyName); //Usuario

        usuarios = JSON.parse(dataInLocalStorage);

        usuarios.splice(index, 1);

        localStorage.setItem(localStorageKeyName, JSON.stringify(usuarios));

        cargarDesdeLocalStorage();
      }
    }
    //ModificarDatos
  };
})();
