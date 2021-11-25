var urlBaseAdministrador = "http://168.138.142.158:8080/api/Admin";
//var urlBaseAdministrador = "/api/Admin";

var consultarAd = function(){
    $.ajax({
        url: urlBaseAdministrador + "/all",
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta);
            actualizarTablaAd(respuesta);
        },
        error: function (xhr, status) {
            console.log(xhr);
            console.log(status);
            alert('Ha Sucedido un Problema');
        }
    });
}

var actualizarTablaAd = function (items) {
    var tabla = `<table class="table striped">
                  <tr>
                    <th>ID</th>
                    <th>NOMBRE</th>
                    <th>CORREO</th>
                    <th>ACCIONES</th>
                  </tr>`;


    for (var i = 0; i < items.length; i++) {
        tabla += `<tr>
                   <td>${items[i].id}</td>
                   <td>${items[i].name}</td>
                   <td>${items[i].email}</td>
                   <td>
                    <button type="button" class="btn btn-sm btn-primary" onclick="editar(${items[i].id}, '${items[i].name}', '${items[i].email}', '${items[i].password}')">
                        Editar
                    </button>
                    <button type="button" class="btn btn-sm btn-danger" onclick="eliminar(${items[i].id})">
                        Eliminar
                    </button>
                   </td>
                </tr>`;
    }
    tabla += `</table>`;

    $("#tabla").html(tabla);
}

$(document).ready(function () {
    console.log("document ready");
    consultarAd();
});

var nuevoAd = function () {
    $("#tituloModalAdministrador").html('Nuevo Administrador');
    $("#id").val('');
    $("#nombre").val('');
    $("#correo").val('');
    $("#password").val('');
    $('#modalAdministrador').modal('show');
}

var cerrarModal = function () {
    $('#modalAdministrador').modal('hide');
}

var mostrarMensaje = function (mensaje) {
    $("#mensaje").html(mensaje);
    $('#modalMensaje').modal('show');
}

var cerrarModalMensaje = function(){
    $('#modalMensaje').modal('hide');
}

var guardarCambiosAd = function () {
var payload;
var method;
var id = $("#id").val();
var nm = $("#nombre").val();
var em = $("#correo").val();

var msg;
var ruta;
if (nm.length == 0 || em == null ) {
    alert('Revisar los campos ...!')
}else {    
    if (id !== 'undefined' && id !== null && id.length > 0) {
        ruta = urlBaseAdministrador + "/update";
        payload = {
            id: +$("#id").val(),
            name: $("#nombre").val(),
            email: $("#correo").val(),
            password: $("#password").val(),
            };
            method = "PUT";
            msg = "Se ha Actualizado el Administrador";
            } else {
                ruta = urlBaseAdministrador + "/save";
                payload = {
                    name: $("#nombre").val(),
                    email: $("#correo").val(),
                    password: $("#password").val(),
                };
                method = "POST";
                msg = "Se ha Creado un Administrador ...!";
            }
            
            console.log("Guardando ", payload)
            console.log("ruta ", ruta)
            console.log("method ", method)

            $.ajax({
                url: ruta,
                type: method,
                dataType: 'json',
                headers: {
                "Content-Type": "application/json"
                },
                data: JSON.stringify(payload),
                    statusCode: {
                    201: function () {
                    mostrarMensaje(msg);
                    cerrarModal();
                    consultarAd();
                    }
                },
            });  
    }        
}
var editar = function (id, name, email, password) {
    $("#tituloModalAdministrador").html('Actualizar Administrador');
    $("#id").val(id);
    $("#nombre").val(name);
    $("#correo").val(email);
    $("#password").val(password);
    $('#modalAdministrador').modal('show');
}

var eliminar = function (id) {
    console.log("Eliminando id: " + id)
    $.ajax({
        url: urlBaseAdministrador + "/" + id,
        type: 'DELETE',
        dataType: 'json',
        headers: {
            "Content-Type": "application/json"
        },
        statusCode: {
            204: function () {
                alert('Se ha Eliminado el Administrador');
                cerrarModalMensaje();
                consultarAd();
            }
        },
    });
}
