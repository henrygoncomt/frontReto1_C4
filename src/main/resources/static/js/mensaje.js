var urlBaseMensaje = "http://168.138.142.158:8080/api/Message";
var urlBaseCliente = "http://168.138.142.158:8080/api/Client";
var urlBaseOrtesis = "http://168.138.142.158:8080/api/Ortopedic";
//var urlBaseMensaje = "/api/Message";
//var urlBaseCliente = "/api/Client";
//var urlBaseOrtesis = "/api/Ortopedic";

//Armar el select para clientes
var consultarClientes = function (idcliente) {
    $.ajax({
        url: urlBaseCliente + "/all",
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            var select = `<select class="form-select" id="cliente">`;
            for (var i = 0; i < respuesta.length; i++) {
                select += `<option value="${respuesta[i].idClient}">${respuesta[i].name}</option>`;
            }
            select += `</select>`;
            $("#cliente-select").html(select);
            
            if (idcliente!=='undefined' && idcliente!==null){
                $("#cliente").val(idcliente);
            }
            
        },
        error: function (xhr, status) {
            console.log(xhr);
            console.log(status);
            alert('Ha Sucedido un Problema ...!');
        }
    });
}

//Armar el select para ortesis
var consultarOrtesis = function (idortesis) {
    $.ajax({
        url: urlBaseOrtesis + "/all",
        type: 'GET',
        dataType: 'json',
        success: function (respuesta2) {
            var select = `<select class="form-select" id="ortesis">`;
            for (var i = 0; i < respuesta2.length; i++) {
                select += `<option value="${respuesta2[i].id}">${respuesta2[i].name}</option>`;
            }
            select += `</select>`;
            $("#ortesis-select").html(select);
            
            if (idortesis!=='undefined' && idortesis!==null){
                $("#ortesis").val(idortesis);
            }
            
        },
        error: function (xhr, status) {
            console.log(xhr);
            console.log(status);
            alert('Ha Sucedido un Problema ...!');
        }
    });
}

var consultarM = function(){
    $.ajax({
        url: urlBaseMensaje + "/all",
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta);
            actualizarTablaM(respuesta);
        },
        error: function (xhr, status) {
            console.log(xhr);
            console.log(status);
            alert('Ha Sucedido un Problema');
        }
    });
}

var actualizarTablaM = function (items) {
    var tabla = `<table class="table striped">
                  <tr>
                    <th>ID</th>
                    <th>MENSAJE</th>
                    <th>NOMBRE DE CLIENTE</th>
                    <th>ORTESIS</th>
                    <th>ACCIONES</th>

                  </tr>`;


    for (var i = 0; i < items.length; i++) {
        tabla += `<tr>
                   <td>${items[i].idMessage}</td>
                   <td>${items[i].messageText}</td>
                   <td>${items[i].client.name}</td>
                   <td>${items[i].ortopedic.name}</td>
                   <td>      
                        <button type="button" class="btn btn-sm btn-primary" onclick="editarM(${items[i].idMessage}, '${items[i].messageText}', '${items[i].client.idClient}', '${items[i].ortopedic.id}')">
                        Editar
                    </button>
                        <button type="button" class="btn btn-sm btn-danger" onclick="eliminarM(${items[i].idMessage})">
                        Eliminar
                    </button>
                   </td>
                </tr>`;
    }
    tabla += `</table>`;

    $("#tablaMensaje").html(tabla);
}

$(document).ready(function () {
    console.log("document ready");
    consultarM();
});

var nuevoM = function () {
    consultarClientes(null);
    consultarOrtesis(null);
    $("#tituloModalMensaje").html('Nuevo Mensaje');
    $("#id").val('');
    $("#mensaje").val('');
    $("#cliente").val('');
    $("#ortesis").val('');
    $('#modalMensaje').modal('show');
}

var cerrarModal = function () {
    $('#modalMensaje').modal('hide');
}

var mostrarMensaje = function (mensaje) {
    $("#mensaje").html(mensaje);
    $('#modalMensaje').modal('show');
}

var cerrarModalMensaje = function () {
    $('#modalMensaje').modal('hide');
}

var guardarCambiosM = function () {
    var payload;
    var method;
    var id = $("#id").val();
    var ms = $("#mensaje").val();
    var msg;
    var ruta;
    if (ms.length == 0)  {
        alert('Revisar los campos ...!')
    }else {    
        if (id !== 'undefined' && id !== null && id.length > 0) {
            ruta = urlBaseMensaje + "/update";
            payload = {
                idMessage: +$("#id").val(),
                messageText: $("#mensaje").val(),
                client: {idClient: +$("#cliente").val()},
                ortopedic: {id: +$("#ortesis").val()}
            };
            method = "PUT";
            msg = "Se ha Actualizado el Mensaje";
        } else {
            ruta = urlBaseMensaje + "/save";
            payload = {
                messageText: $("#mensaje").val(),
                client: {idClient: $("#cliente").val()},
                ortopedic: {id: $("#ortesis").val()}
            };
            method = "POST";
            msg = "Se ha Creado Mensaje";
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
                    consultarM();
                }
            },
        });
    }    
}

var editarM = function (id, message, idcliente, idortesis) {
    console.log(message, idcliente, idortesis);
    consultarClientes(idcliente);
    consultarOrtesis(idortesis);
    $("#tituloModalMensaje").html('Actualizar Mensaje');
    $("#id").val(id);
    $("#mensaje").val(message);
    $("#cliente").val(idcliente);
    $("#ortesis").val(idortesis);
    $('#modalMensaje').modal('show');
}

var eliminarM = function (id) {
    console.log("Eliminando id: " + id)
    var msgE;
    $.ajax({
        url: urlBaseMensaje + "/" + id,
        type: 'DELETE',
        dataType: 'json',
        headers: {
            "Content-Type": "application/json"
        },
        statusCode: {
            204: function () {
                msgE="Se ha Eliminado Mensaje";
                alert(msgE);
                cerrarModal();
                consultarM();
            }
        },
    });
}