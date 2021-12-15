
console.log(document.location.pathname);

function CargarTop(){
    $.ajax({
        url: "http://127.0.0.1:5500/datos.json"
        }).done(function (respuesta) {
        
        let datos = respuesta.canciones;
        let NombreCanciones = [];
        let reproducciones = [];
        let rep = [];
        let rutas = [];
        let iconos = [];
    
        for(let i=0;i< datos.length; i++){
            NombreCanciones.push(datos[i].nombre);
            reproducciones.push(datos[i].reproducciones);
            rep.push(datos[i].reproducciones);
            rutas.push(datos[i].ruta);
            iconos.push(datos[i].icono);
        }

        if (document.location.pathname == '/index.html'){
            rep = rep.sort(function(a, b){return a - b});
    
            console.log(rep);
        
            let maximos = [rep[rep.length-1],rep[rep.length-2],rep[rep.length-3]];
        
            let top3 = [{
                nombre: "",
                ruta: ""
            }];
        
            for (let j=0; j < maximos.length; j++){
                let posicion = reproducciones.indexOf(maximos[j]);
                top3.push({
                    nombre: NombreCanciones[posicion],
                    ruta: rutas[posicion]
                })
            }
        
            document.getElementById('nombre1').innerHTML = top3[1].nombre;
            document.getElementById('nombre2').innerHTML = top3[2].nombre;
            document.getElementById('nombre3').innerHTML = top3[3].nombre;
        
            function cambiarUrl(id,item){
                let cancion = document.getElementById(id);
                cancion.setAttribute("src", top3[item].ruta);
            }
        
            cambiarUrl('cancion1',1);
            cambiarUrl('cancion2',2);
            cambiarUrl('cancion3',3);
        
            console.log(iconos);
        };
        if (document.location.pathname == '/canciones.html'){

            const formulario = document.querySelector('#BuscarCancion');

            const filtrar = ()=>{
                
                let texto = formulario.value.toLowerCase();
                let resultado = '';
                let resultadoRuta = [];
                let resultadoIcono = [];
                let respuesta = [];
                let vector = Array(NombreCanciones.length);

                for (let k=0; k < NombreCanciones.length; k++){
                    let nombreRef = NombreCanciones[k].toLowerCase();
                    if (nombreRef.indexOf(texto) >= 0){
                        console.log(NombreCanciones[k]);
                        resultado = NombreCanciones[k];
                        resultadoRuta.push(rutas[k]);
                        resultadoIcono.push(iconos[k]);
                        respuesta.push(resultado);
                        vector[k]=0;
                    }
                    else{
                        vector[k]=1;
                    }
                }
            
                if (respuesta.length>0){

                    for(let h=0; h<respuesta.length; h++){
                        let cancionRef = document.getElementById(`Melodia${h+1}Name`);
                        cancionRef.innerHTML = respuesta[h];
                        let cancionRuta = document.getElementById(`melodia${h+1}`);
                        cancionRuta.setAttribute("src",resultadoRuta[h]);
                        console.log(resultadoRuta[h]);
                        let iconosRef = document.getElementById(`icono${h+1}`);
                        iconosRef.setAttribute("src",`./imagenes/icon_${resultadoIcono[h]}.svg`);
                    }

                    let cont=0;
                    for(let m=0; m<vector.length; m++){
                        if (vector[m]==1){
                            cont = cont + 1;
                            let cancionRelleno = document.getElementById(`Melodia${cont+respuesta.length}Name`);
                            cancionRelleno.innerHTML = NombreCanciones[m];

                            let rutasRelleno = document.getElementById(`melodia${cont+respuesta.length}`);
                            rutasRelleno.setAttribute("src",rutas[m]);

                            let iconosRelleno = document.getElementById(`icono${cont+respuesta.length}`);
                            iconosRelleno.setAttribute("src",`./imagenes/icon_${iconos[m]}.svg`);
                        }
                    }
                }
                if (resultado == ''){

                    console.log('No se encontro nada');
                }
            }

            formulario.addEventListener('keyup', filtrar);
        }
    });
}

if (document.location.pathname == '/index.html' || document.location.pathname == '/canciones.html'){
    $(document).ready(CargarTop);
}



        
function validarLogin(formulario){
    if (formulario.correo.value.trim().length == 0){
        alert("Correo obligatorio");
        return false;
    }
    if (formulario.contrasena.value.trim().length==0 || formulario.contrasena.value.trim().length <8){
        alert("La constraseña debe tener un mínimo de 8 caracteres");
        return false;
    }
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(formulario.correo.value)) {
     alert("Email inválido");
     return false;
   }
}

function validarRegistro(registro){
    if (registro.correo.value.trim().length == 0){
        alert('Correo obligatorio');
        return false;
    }
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(registro.correo.value)) {
     alert("Email inválido");
     return false;
   }
   if (registro.contrasena.value.trim().length == 0){
    alert("La constraseña es obligatoria");
    return false;
    }
    if (registro.contrasena.value.trim().length > 0 && registro.contrasena.value.trim().length <8){
        alert("La constraseña debe tener un mínimo de 8 caracteres");
        return false;
    }
    if (registro.confirmacion.value != registro.contrasena.value){
        alert("Las contraseñas no coinciden");
        return false;
    }
    if (registro.generoMusical.value == 'Seleccionar'){
        alert("Debe elejir un género musical");
        return false;
    }
    if(registro.exampleRadios.value == ""){
        alert("Debe seleccionar una edad");
        return false;
    }
    if (!registro.cajaTexto.checked){
        alert("Debe aceptar terminos y condiciones");
        return false;
    }

    else{
        $('#ventanaRegistro').modal('show');
        document.getElementById('FormularioRegistro').reset();
        return true;
    }
}

