(function () {

    var id = 0;
    const btnGuardar = document.getElementById("guardar");

    document.addEventListener('readystatechange', function () {
        if (document.readyState === 'interactive') {
            // con esta funcion, funciona todo lo demas
            pintarTablaInicio();
            console.log(id);
        }
    });


    function cargarDatosLocalStorage() {
        let retorno = [];
        if (localStorage.getItem('productos') !== null) { // si los datos son diferentes de null, se llena la tabla
            retorno = JSON.parse(localStorage.getItem("productos"));
        }
        return retorno;
    }
    const datosProductos = cargarDatosLocalStorage() // Array() 
    const formulario = document.getElementsByTagName("form")[0];
    const tbody = document.getElementsByTagName("tbody")[0];

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();
    });
    formulario.addEventListener("submit", function (evento) {
        const nombre = formulario.nombreProducto.value;
        const descripcion = formulario.descripcion.value;
        const precio = formulario.precio.value;
        const fechaIngreso = formulario.ingreso.value;
        const tipoProd = formulario.tipoProd.value;
        const estado = formulario.estado.value;
        const stock = formulario.stock.value;

        const objetoProductoTemporal = {
            id: id,
            nombre: nombre,
            descripcion: descripcion,
            precio: precio,
            fecha: fechaIngreso,
            tipo: tipoProd,
            estado: estado,
            stock: stock
        };

        // añade elemento al LocalStorage
        anadirElementoALaListaYLocalStorage(objetoProductoTemporal);
        // añade elemento a la tabla
        anadirElementosTabla(objetoProductoTemporal);

        //resetea el formulario
        alert('Usuario registrado con exito');

        formulario.reset();
    });


    function anadirElementoALaListaYLocalStorage(producto) {
        datosProductos.push(producto);
        localStorage.setItem('productos', JSON.stringify(datosProductos));
        // se imprime el id incrementable
        id++;
    }

    function anadirElementosTabla(hijoAnadir) {

        // creamos la fila
        const trTemporal = document.createElement("tr");


        //td id
        const tdId = document.createElement("td");
        tdId.innerText = hijoAnadir.id;

        // creamos los nodos hijos (TD)
        const tdNombre = document.createElement("td");
        // asignamos el texto del nombre a la columna nombre
        tdNombre.innerText = hijoAnadir.nombre;

        // creamos la columna apellido
        const tdDescripcion = document.createElement("td");
        // asignamos el texto del apellido a la columna apellido
        tdDescripcion.innerText = hijoAnadir.descripcion;

        // creamos ta columna correo
        const tdPrecio = document.createElement("td");
        // asignamos el texto a la columna correo
        tdPrecio.innerText = hijoAnadir.precio;

        // creamos la columna imagen
        //const tdImagen = document.createElement("td");
        // asignamos el texto a la columna imagen
        //tdImagen.innerText = hijoAnadir.imagen;

        // crear columna fechaIngreso
        const tdIngreso = document.createElement("td");
        tdIngreso.innerText = hijoAnadir.fecha;
        
        // crear columna tipo de producto
        const tdTipo = document.createElement("td");
        tdTipo.innerText = hijoAnadir.tipo;

        // crear columna estado del producto
        const tdEstado = document.createElement("td");
        tdEstado.innerText = hijoAnadir.estado;

        // crear columna stock del producto
        const tdStock = document.createElement("td");
        tdStock.innerText = hijoAnadir.stock;

        // Creando botones de accion 
        const tdAccion = document.createElement("td");

        const btnBorrar = document.createElement("button");
        const btnEditar = document.createElement("button");
        // const btnImagen = document.createElement("button");

        btnBorrar.classList.add('btn', 'btn-danger');
        btnBorrar.addEventListener("click", function () {
            eliminarElemento(hijoAnadir.id);
        });

        btnEditar.addEventListener("click", function () {

            document.getElementById('nombreProducto').value = hijoAnadir.nombre;
            document.getElementById('descripcion').value = hijoAnadir.descripcion;
            document.getElementById('precio').value = hijoAnadir.precio;
            document.getElementById('ingreso').value = hijoAnadir.fecha;
            document.getElementById('tipo-prod').value = hijoAnadir.tipo;
            document.getElementById('estado').value = hijoAnadir.estado;
            document.getElementById('stock').value = hijoAnadir.stock;

            btnGuardar.addEventListener("click", function () {
                editarElemento(hijoAnadir.id);
            })
        });

        //btnImagen.classList.add('btn', 'btn-warning', 'popup-btn');
        //btnImagen.addEventListener("click", function () {
        //    abrirImagen();
        //})

        btnEditar.classList.add('btn', 'btn-info');

        btnBorrar.innerText = "☠️";
        btnEditar.innerText = "✍";
        // btnImagen.innerText = "📷";

        // asignar botones de accion al tdAccion
        tdAccion.appendChild(btnBorrar);
        tdAccion.appendChild(btnEditar);
        // tdAccion.appendChild(btnImagen);

        // asignar los hijo a la filas
        trTemporal.appendChild(tdId);
        trTemporal.appendChild(tdNombre);
        trTemporal.appendChild(tdDescripcion);
        trTemporal.appendChild(tdPrecio);
        trTemporal.appendChild(tdIngreso);
        trTemporal.appendChild(tdTipo);
        trTemporal.appendChild(tdEstado);
        trTemporal.appendChild(tdStock);
        // trTemporal.appendChild(tdImagen);    
        trTemporal.appendChild(tdAccion);


        // añadimos la fila creada a la tabla en el doom
        tbody.appendChild(trTemporal);


    };

    function pintarTablaInicio() {
        if (datosProductos.length != 0) {
            for (let i = 0; i < datosProductos.length; i++) {
                anadirElementosTabla(datosProductos[i]);
                console.log(datosProductos);
                id = datosProductos[i].id + 1;
                // datosProductos[i].id = idTabla;
                // document.getElementById('id').value = idTabla;
            }
        }

    }



    function eliminarElemento(id) {
        const respuesta = window.confirm("Seguro que quieres borrar al usuario?" + document.nombre);
        if (respuesta) {
            let users = []
            let datosEnLocalStorage = localStorage.getItem('productos'); // 'personas'

            users = JSON.parse(datosEnLocalStorage);

            users.splice(id, 1);

            localStorage.setItem('productos', JSON.stringify(users));

            window.alert("Borrado correctamente");
            location.reload();
        }

    }


    /* function borrarElemento(idUsuario){
       const respuesta = w.confirm("Seguro que quieres borrar al usuario"+idUsuario+"?");
       if(respuesta){
           d.querySelector('tr[id-usuario="'+idUsuario+'"]').remove();
           w.alert("Borrado correctamente");
       }
   } */

    /*function eliminarElemento(id){
        for (const i in datosUsuario) {
            if(datosUsuario[i].id == id) {
                // let datosEnLocalStorage = localStorage.getItem('personas');

                datosUsuario.splice(datosUsuario[i], 1);
                // tbody.removeChild(datosUsuario[i]);
            }
        }
        
        
    
    }*/

    function editarElemento(id) {


        for (const i in datosProductos) {
            if (datosProductos[i].id == id) {

                // agrego datos modificados a la localStorage
                datosProductos[i].nombre = document.getElementById('nombreProducto').value;
                datosProductos[i].descripcion = document.getElementById('descripcion').value;
                datosProductos[i].precio = document.getElementById('precio').value;
                datosProductos[i].fecha = document.getElementById('ingreso').value;
                datosProductos[i].tipo = document.getElementById('tipo-prod').value;
                datosProductos[i].estado = document.getElementById('estado').value;
                datosProductos[i].stock = document.getElementById('stock').value;

                localStorage.setItem('productos', JSON.stringify(datosProductos));

            }
        }

    }

    // CODIGO PARA LA IMAGEN PRUEBA
    /*
    function abrirImagen() {
        for (const i in datosProductos) {
            if (datosProductos[i].id == id) {
                const popupViews = document.querySelectorAll('.popup-view');
                const popupBtns = document.querySelectorAll('.popup-btn');
                const closeBtns = document.querySelectorAll('.close-btn');

                const popup = function (popupClick) {
                    popupViews[popupClick].classList.add('active');
                }

                popupBtns.forEach((popupBtn, i) => {
                    popupBtn.addEventListener("click", () => {
                        popup(i);
                    });
                });

                closeBtns.forEach((closeBtn) => {
                    closeBtn.addEventListener("click", () => {
                        popupViews.forEach((popupView) => {
                            popupView.classList.remove('active');
                        });
                    });
                });
            }
        }
        
    }
    */
})();