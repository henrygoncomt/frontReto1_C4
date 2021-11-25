var urlBaseCategoria = "http://168.138.142.158:8080/api/Category";
//var urlBaseCategoria = "/api/Category";

var consultar = function(){
    $.ajax({
        url: urlBaseCategoria + "/all",
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
                    <th>COD</th>
                    <th>NOMBRE</th>
                    <th>DESCRIPCION</th>
                    <th>ACCIONES</th>
                  </tr>`;


    for (var i = 0; i < items.length; i++) {
        tabla += `<tr>
                   <td>${items[i].id}</td>
                   <td>${items[i].name}</td>
                   <td>${items[i].description}</td>
                   <td>
                    <button type="button" class="btn btn-sm btn-primary" onclick="editar(${items[i].id}, '${items[i].name}', '${items[i].description}')">
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
    consultar();
});

var nuevo = function () {
    $("#tituloModalCategoria").html('Nueva Categoria');
    $("#id").val('');
    $("#nombre").val('');
    $("#descripcion").val('');
    $('#modalCategoria').modal('show');
}

var cerrarModal = function () {
    $('#modalCategoria').modal('hide');
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
    var nm = document.getElementById("nombre").value;
    var ds = document.getElementById("descripcion").value;
    var msg;
    var ruta;
    console.log(nm);
    console.log(ds);
    
    if (nm.length == 0 || ds.length== 0) {
      alert('Revisar los campos ...!')
    }else {
        if (id !== 'undefined' && id !== null && id.length > 0) {
            ruta = urlBaseCategoria + "/update";
            payload = {
                id: +$("#id").val(),
                name: $("#nombre").val(),
                description: $("#descripcion").val()
            };
            method = "PUT";
            msg = "Se ha actualizado la Categoria ...!";
        } else {
            ruta = urlBaseCategoria + "/save";
            payload = {
                name: $("#nombre").val(),
                description: $("#descripcion").val(),
            };
            method = "POST";
            msg = "Se ha Creado la Categoria ...!";
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
var editar = function (id, nombre, descripcion) {
    $("#tituloModalCategoria").html('Actualizar Categoria');
    $("#id").val(id);
    $("#nombre").val(nombre);
    $("#descripcion").val(descripcion);
    $('#modalCategoria').modal('show');
}

var eliminar = function (id) {
    console.log("eliminando id: " + id)
    $.ajax({
        url: urlBaseCategoria + "/" + id,
        type: 'DELETE',
        dataType: 'json',
        headers: {
            "Content-Type": "application/json"
        },
        statusCode: {
            204: function () {
                mostrarMensaje('Se ha Eliminado la Categoria ...!');
                cerrarModal();
                consultar();
            }
        },
    });
}

