var urlBaseOrtesis = "http://168.138.142.158:8080/api/Ortopedic";
var urlBaseCategoria = "http://168.138.142.158:8080/api/Category";
//var urlBaseOrtesis = "/api/Ortopedic";
//var urlBaseCategoria = "/api/Category";

var consultarCategorias = function (idcategoria) {
    $.ajax({
        url: urlBaseCategoria + "/all",
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            var select = `<select class="form-select" id="categoria">`;
            for (var i = 0; i < respuesta.length; i++) {
                select += `<option value="${respuesta[i].id}">${respuesta[i].description}</option>`;
            }
            select += `</select>`;
            $("#categoria-select").html(select);
            
            if (idcategoria!=='undefined' && idcategoria!==null){
                $("#categoria").val(idcategoria);
            }
            
        },
        error: function (xhr, status) {
            console.log(xhr);
            console.log(status);
            alert('Ha Sucedido un Problema ...!');
        }
    });
}


var consultarO = function () {
    $.ajax({
        url: urlBaseOrtesis + "/all",
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta);
            actualizarTablaO(respuesta);
        },
        error: function (xhr, status) {
            console.log(xhr);
            console.log(status);
            alert('Ha Sucedido un Problema');
        }
    });
}

var actualizarTablaO = function (items) {
    var tabla = `<table class="table striped">
                  <tr>
                    <th>ID</th>
                    <th>NOMBRE</th>
                    <th>MARCA</th>
                    <th>AÑO</th>
                    <th>DESCRIPCION</th>
                    <th>CATEGORIA</th>         
                    <th>ACCIONES</th>
                  </tr>`;


    for (var i = 0; i < items.length; i++) {
        tabla += `<tr>
                   <td>${items[i].id}</td>
                   <td>${items[i].name}</td>
                   <td>${items[i].brand}</td>
                   <td>${items[i].year}</td>
                   <td>${items[i].description}</td>
                   <td>${items[i].category.description}</td>
                   <td style="margin:0">
                    <button type="button" class="btn btn-sm btn-primary" onclick="editar(${items[i].id}, '${items[i].name}', '${items[i].brand}', '${items[i].year}', '${items[i].description}', '${items[i].category.id}')">
                        Editar
                    </button>
                    <button type="button" class="btn btn-sm btn-danger" onclick="eliminar(${items[i].id})">
                        Eliminar
                    </button>
                   </td>
                </tr>`;
    }
    tabla += `</table>`;

    $("#tablaOrtesis").html(tabla);
}

$(document).ready(function () {
    console.log("document ready");
    consultarO();
});

var nuevoOrtesis = function () {
    consultarCategorias(null);
    $("#tituloModalProducto").html('Nuevo Producto');
    $("#id").val('');
    $("#name").val('');
    $("#brand").val('');
    $("#year").val('');
    $("#description").val('');
    $("#categoria").val('');
    $('#modalProducto').modal('show');
}

var cerrarModal = function () {
    $('#modalProducto').modal('hide');
}

var mostrarMensaje = function (mensaje) {
    $("#mensaje").html(mensaje);
    $('#modalMensaje').modal('show');
}

var cerrarModalMensaje = function () {
    $('#modalMensaje').modal('hide');
}


var guardarCambiosO = function () {
    var payload;
    var method;
    var id = $("#id").val();
    var nm = $("#name").val();
    var br = $("#brand").val();
    var ds = $("#description").val();
    var msg;
    var ruta;

    if (nm.length == 0 || nm == null || ds.length == 0 ) {
        alert('Revisar los campos ...!')
    }else {
        if (id !== 'undefined' && id !== null && id.length > 0) {
            ruta = urlBaseOrtesis + "/update";
            payload = {
                id: +$("#id").val(),
                name: $("#name").val(),
                brand: $("#brand").val(),
                year: +$("#year").val(),
                description: $("#description").val(),
                category: {
                    id: $("#categoria").val()
                }
            };
            method = "PUT";
            msg = "Se ha Actualizado el Producto ...!";
        } else {
            ruta = urlBaseOrtesis + "/save";
            payload = {
                name: $("#name").val(),
                brand: $("#brand").val(),
                year: +$("#year").val(),
                description: $("#description").val(),
                category: {
                    id: $("#categoria").val()
                }
            };
            method = "POST";
            msg = "Se ha Creado el Producto";
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
                    mostrarMensaje(msg);
                    cerrarModal();
                    consultarO();
                }
            },
        });
    }    
}

var editar = function (id, name, brand, year, description, idcategoria) {
    console.log(name, brand, year, description, idcategoria);
    consultarCategorias(idcategoria);
    $("#tituloModalProducto").html('Actualizar Producto');
    $("#id").val(id);
    $("#name").val(name);
    $("#brand").val(brand);
    $("#year").val(year);
    $("#description").val(description);
    $("#categoria").val(categoria);
    $('#modalProducto').modal('show');
}

var eliminar = function (id) {
    console.log("Eliminando id: " + id)
    $.ajax({
        url: urlBaseOrtesis + "/" + id,
        type: 'DELETE',
        dataType: 'json',
        headers: {
            "Content-Type": "application/json"
        }, 
        statusCode: {
            204: function () {
                mostrarMensaje('Se ha Eliminado el Producto');
                cerrarModal();
                consultarO();
            }
        },
    });
}