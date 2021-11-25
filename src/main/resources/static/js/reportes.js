var urlBaseReserva = "http://168.138.142.158:8080/api/Reservation";
//var urlBaseReserva = "/api/Reservation";

function traerReporteStatus(){
    console.log("test");
    $.ajax({
        url: urlBaseReserva + "/report-status",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}

function pintarRespuesta(respuesta){        
    var tabla = `<table class="table striped">
        <hr style="border-color:blue;">  
        <h4>Reporte Status Reservas</h4>  
        <tr>
            <th>COMPLETADAS</th>
            <th>CANCELADAS</th>
        </tr>`;

        console.log(respuesta);
        console.log(respuesta.completed);
        console.log(respuesta.cancelled);
        tabla += `<tr>
            <td>${respuesta.completed}</td> 
            <td>${respuesta.cancelled}</td> 
        </tr>`;
    
        tabla += `</table>`;

        $("#resultadoReporte").html(tabla);
}

function traerReporteDate(){

    var fechaInicio = document.getElementById("RstarDate").value;
    var fechaEntrega = document.getElementById("RdevolutionDate").value;
    console.log(fechaInicio);
    console.log(fechaEntrega);
    if (fechaInicio.length == 0 || fechaInicio == null || fechaEntrega.length == 0 || fechaEntrega == null)  {
        alert('Seleccione Fecha Inicial y Final para este reporte ...!')
    }else {
        $.ajax({
            url: urlBaseReserva + "/report-dates/" + fechaInicio + "/" + fechaEntrega,
            type:"GET",
            datatype:"JSON",
            success:function(respuesta){
                console.log(respuesta);
                pintarRespuestaDate(respuesta);
            }
        });
    }    
}

function pintarRespuestaDate(respuesta){        
    var tabla = `<table class="table striped">
                  <hr style="border-color:blue;">  
	          <h4>Reporte por Fecha</h4>					
                  <tr>
                    <th>CLIENTE</th>
                    <th>FECHA INICIO</th>
                    <th>FECHA ENTREGA</th>
		    <th>STATUS</th>
                  </tr>`;


    for (var i = 0; i < respuesta.length; i++) {
        tabla += `<tr>
                   <td>${respuesta[i].client.name}</td>
                   <td>${respuesta[i].startDate}</td>
		   <td>${respuesta[i].devolutionDate}</td>
	           <td>${respuesta[i].status}</td>
                </tr>`;
    }
    tabla += `</table>`;

    $("#resultadoReporte").html(tabla);
}


function traerReporteClientes(){
        $.ajax({
            url: urlBaseReserva + "/report-clients",
            type:"GET",
            datatype:"JSON",
            success:function(respuesta){
                console.log(respuesta);
                pintarRespuestaClientes(respuesta);
            }
        });
}
    
function pintarRespuestaClientes(respuesta){        
        var tabla = `<table class="table striped">
            <hr style="border-color:blue;">
            <h4>Clientes y Reservas</h4>
            <tr>
                <th>TOTAL</th>
                <th>CLIENTE</th>
                <th>CORREO</th>
                <th>EDAD</th>
            </tr>`;


        for (var i = 0; i < respuesta.length; i++) {
            tabla += `<tr>
                <td>${respuesta[i].total}</td>
                <td>${respuesta[i].client.name}</td>
                <td>${respuesta[i].client.email}</td>
                <td>${respuesta[i].client.age}</td>
            </tr>`;
        }
        tabla += `</table>`;

        $("#resultadoReporte").html(tabla);
}

