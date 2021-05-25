(function (d,w){
    
    const rutas = {
        '/': { // si entro en la ruta principal, el archivo .html se cargara
            archivo: 'index.html'
        },
        '/PlayStation': { // mismo ejemplo con los demas .html
            archivo: 'playstation.html'
        },
        '/Xbox': {
            archivo: 'xbox.html'
        },
        '/Nintendo': {
            archivo: 'nintendo.html'    
        },
        '/Componentes': {
            archivo: 'componentes.html'
        },
        '/Pc': {
            archivo: 'pc.html'
        },
        '/Registro': {
            archivo: 'index-registro.html'
        },
        '/Productos': {
            archivo: 'formProductos.html'
        },
        '/Contacto': {
            archivo: 'contactos.html'
        }        
    };
    const contenedor = d.getElementById("contenido-web")
    
    d.addEventListener('readystatechange', function() {
        if(d.readyState === 'interactive') {
            // aqui va el codigo de arranque de mi app.
            iniciarTodo();
        }
    });
        
    function iniciarTodo(){
        w.addEventListener("hashchange", function(){
            // borro el # de inicio
            const ruta = w.location.hash;
            /* console.log(
                // #/home
                // 012345
                String(w.location.hash).substring(1)
            ); */
            // console.log(rutas[ruta]);
            cargarArchivoDeRuta(ruta);
        }); 
        cargarArchivoDeRuta(w.location.hash);   
    }

    function cargarArchivoDeRuta(rutaACargar){
        const ruta = rutas[rutaACargar.substring(1)];
        fetch(`${w.location.origin}/paginas/${ruta.archivo}`,{
            method: "GET"
        })
        .then( function(respuesta){
            return  respuesta.text();
        })
        .then( function(respuestaTexto){
             // console.log(respuestaTexto);
             contenedor.innerHTML = "";
             contenedor.innerHTML = respuestaTexto;
        });
    }

    // la ruta del navegador, parametros, funciones despues de..., etc
    // la ruta del navegador, archivo que deba cargar (html)



})(document, window)