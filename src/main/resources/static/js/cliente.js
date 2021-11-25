var urlBaseCliente = "http://168.138.142.158:8080/api/Client";
//var urlBaseCliente = "/api/Client";

var consultar = function(){
    $.ajax({
        url: urlBaseCliente + "/all",
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta);
            actualizarTabla(respuesta);
        },
        error: function (xhr, status) {
            console.log(xhr);
            console.log(status);
            alert('Ha Sucedido un Problema');
        }
    });
}

var actualizarTabla = function (items) {
    var tabla = `<table class="table striped">
                  <tr>
                    <th>ID</th>
                    <th>NOMBRE</th>
                    <th>EDAD</th>
                    <th>CORREO</th>
                    <th>ACCIONES</th>
                  </tr>`;


    for (var i = 0; i < items.length; i++) {
        tabla += `<tr>
                   <td>${items[i].idClient}</td>
                   <td>${items[i].name}</td>
                   <td>${items[i].age}</td>
                   <td>${items[i].email}</td>
                   <td>
                    <button type="button" class="btn btn-sm btn-primary" onclick="editar(${items[i].idClient}, '${items[i].name}', '${items[i].age}', '${items[i].email}', '${items[i].password}')">
                        Editar
                    </button>
                    <button type="button" class="btn btn-sm btn-danger" onclick="eliminar(${items[i].idClient})">
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
    consultar();
});

var nuevo = function () {
    $("#tituloModalCliente").html('Nuevo Cliente');
    $("#id").val('');
    $("#nombre").val('');
    $("#edad").val('');
    $("#correo").val('');
    $("#password").val('');
    $('#modalCliente').modal('show');
}

var cerrarModal = function () {
    $('#modalCliente').modal('hide');
}

var mostrarMensaje = function (mensaje) {
    $("#mensaje").html(mensaje);
    $('#modalMensaje').modal('show');
}

var cerrarModalMensaje = function(){
    $('#modalMensaje').modal('hide');
}

var guardarCambios = function () {
var payload;
var method;
var id = $("#id").val();
var nm = $("#nombre").val();
var em = $("#correo").val();
var pw = $("#password").val();

var msg;
var ruta;
if (nm.length == 0 || em.length == 0 || pw.length == 0) {
    alert('Revisar los campos ...!')
}else {    
    if (id !== 'undefined' && id !== null && id.length > 0) {
        ruta = urlBaseCliente + "/update";
        payload = {
            idClient: +$("#id").val(),
            name: $("#nombre").val(),
            age: $("#edad").val(),
            email: $("#correo").val(),
            password: $("#password").val(),
            };
            method = "PUT";
            msg = "Se ha Actualizado el Cliente";
            } else {
                ruta = urlBaseCliente + "/save";
                payload = {
                    name: $("#nombre").val(),
                    age: $("#edad").val(),
                    email: $("#correo").val(),
                    password: $("#password").val(),
                };
                method = "POST";
                msg = "Se ha Creado un Cliente ...!";
            }
            
            console.log("guardando ", payload)
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
                    consultar();
                    }
                },
            });  
    }        
}
var editar = function (idClient, name, age, email, password) {
    $("#tituloModalCliente").html('Actualizar Categoria');
    $("#id").val(idClient);
    $("#nombre").val(name);
    $("#edad").val(age);
    $("#correo").val(email);
    $("#password").val(password);
    $('#modalCliente').modal('show');
}

var eliminar = function (id) {
    console.log("Eliminando id: " + id)
    $.ajax({
        url: urlBaseCliente + "/" + id,
        type: 'DELETE',
        dataType: 'json',
        headers: {
            "Content-Type": "application/json"
        },
        statusCode: {
            204: function () {
                mostrarMensaje('Se ha Eliminado el Cliente');
                cerrarModal();
                consultar();
            }
        },
    });
}
