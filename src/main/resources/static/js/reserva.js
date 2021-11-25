var urlBaseReserva = "http://168.138.142.158:8080/api/Reservation";
var urlBaseOrtesis = "http://168.138.142.158:8080/api/Ortopedic";
var urlBaseCliente = "http://168.138.142.158:8080/api/Client";
//var urlBaseReserva = "/api/Reservation";
//var urlBaseOrtesis = "/api/Ortopedic";
//var urlBaseCliente = "/api/Client";

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
                $("#cliente-select").val(idcliente);
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
                $("#ortesis-select").val(idortesis);
            }
            
        },
        error: function (xhr, status) {
            console.log(xhr);
            console.log(status);
            alert('Ha Sucedido un Problema ...!');
        }
    });
}

//Crear Select para Status de Reservacion 

var consultarStatusB = function (status) {
    var select = `<select class="form-select" id="status">`;
            select += `<option value="created" >Created</option>`;
            select += `<option value="completed">Completed</option>`;
            select += `<option value="cancelled">Cancelled</option>`;
            
            select += `</select>`;
            $("#status-select").html(select);
            
            if (status!=='undefined' && status!==null){
                $("#status-select").val(status);
            }
}



var consultarRs = function () {
    $.ajax({
        url: urlBaseReserva + "/all",
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta);
            actualizarTablaRs(respuesta);
        },
        error: function (xhr, status) {
            console.log(xhr);
            console.log(status);
            alert('Ha Sucedido un Problema');
        }
    });
}

var actualizarTablaRs = function (items) {
    var tabla = `<table class="table striped">
                  <tr>
                    <th>ID</th>
                    <th>INICIO</th>
                    <th>ENTREGA</th>
                    <th>CLIENTE</th>
                    <th>ORTESIS</th>
                    <th>STATUS</th>
                    <th>ACCIONES</th>
                  </tr>`;


    for (var i = 0; i < items.length; i++) {
        tabla += `<tr>
                   <td>${items[i].idReservation}</td>
                   <td>${items[i].startDate}</td>
                   <td>${items[i].devolutionDate}</td>
                   <td>${items[i].client.name}</td>
                   <td>${items[i].ortopedic.name}</td>
                   <td>${items[i].status}</td>
                   <td style="margin:0">
                    <button type="button" class="btn btn-sm btn-primary" onclick="editarRs(${items[i].idReservation}, '${items[i].startDate}', '${items[i].devolutionDate}', '${items[i].client.idClient}', '${items[i].ortopedic.id}', '${items[i].status}')">
                        Editar
                    </button>
                    <button type="button" class="btn btn-sm btn-danger" onclick="eliminarRs(${items[i].idReservation})">
                        Eliminar
                    </button>
                   </td>
                </tr>`;
    }
    tabla += `</table>`;

    $("#tablaReserva").html(tabla);
}

$(document).ready(function () {
    console.log("document ready");
    consultarRs();
});

var nuevoRs = function () {
    consultarClientes(null);
    consultarOrtesis(null);

    $("#tituloModalReserva").html('Nueva Reserva');
    $("#idReservation").val('');
    $("#startDate").val('');
    $("#devolutionDate").val('');
    $("#cliente").val('');
    $("#ortesis").val('');
    $('#modalReserva').modal('show');
}

var cerrarModalRs = function () {
    $('#modalReserva').modal('hide');
}

var mostrarMensajeRs = function (mensaje) {
    $("#mensajeRs").html(mensaje);
    $('#modalReserva').modal('show');
}

var cerrarModalMensaje = function () {
    $('#modalMensajeRs').modal('hide');
}


var guardarCambiosRs = function () {
    var payload;
    var method;
    var id = $("#idReservation").val();
    var msg;
    var ruta;
    if (id !== 'undefined' && id !== null && id.length > 0) {
        ruta = urlBaseReserva + "/update";
        payload = {
            idReservation: +$("#idReservation").val(),
            startDate: $("#startDate").val(),
            devolutionDate: $("#devolutionDate").val(),
            client: {idClient: +$("#cliente").val()},
            ortopedic: {id: +$("#ortesis").val()},
            status: $("#status").val()          
        };
        method = "PUT";
        msg = "Se ha Actualizado la Reserva ...!";
    } else {
        ruta = urlBaseReserva + "/save";
        console.log(ruta)
        payload = {
            startDate: $("#startDate").val(),
            devolutionDate: $("#devolutionDate").val(),
            client: {idClient: $("#cliente").val()},
            ortopedic: {id: $("#ortesis").val()}
        };
        method = "POST";
        msg = "Se ha Creado la Reserva";
    }

    console.log("Guardando ", payload)
    console.log("Metodo ", method, "a", ruta)

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
                mostrarMensajeRs(msg);
                cerrarModalRs();
                consultarRs();
            }
        },
    });
}

var editarRs = function (idReservation, startDate, devolutionDate, idClient, id, statusR) {
    console.log(idReservation, startDate, devolutionDate, idClient, id);
    consultarClientes(idClient);
    consultarOrtesis(id);
    consultarStatusB();

    $("#tituloModalReserva").html('Actualizar Reserva');
    $("#idReservation").val(idReservation);
    $("#startDate").val(startDate);
    $("#devolutionDate").val(devolutionDate);
    $("#cliente").val(idClient);
    $("#ortesis").val(id);
    $("#status").val(statusR);
    $('#modalReserva').modal('show');
}

var eliminarRs = function (idReservation) {
    console.log("Eliminando id: " + idReservation)
    $.ajax({
        url: urlBaseReserva + "/" + idReservation,
        type: 'DELETE',
        dataType: 'json',
        headers: {
            "Content-Type": "application/json"
        }, 
        statusCode: {
            204: function () {
                alert('Se ha Eliminado el Producto');
                cerrarModalRs();
                consultarRs();
            }
        },
    });
}
