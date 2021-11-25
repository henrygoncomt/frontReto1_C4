/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.usa.ciclo3.web;

import co.edu.usa.ciclo3.modelo.ContadorClientes;
import co.edu.usa.ciclo3.modelo.Reserva;
import co.edu.usa.ciclo3.modelo.StatusReservas;
import co.edu.usa.ciclo3.service.ReservaService;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author hgc68
 */
@RestController
@RequestMapping("/api/Reservation")
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE})

public class ReservaController {
    @Autowired
    private ReservaService reservaService;
    
    @GetMapping("/all")
    public List<Reserva> getReserva(){
        return reservaService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Reserva> getCategoria(@PathVariable("id") int reservaId) {
        return reservaService.getReserva(reservaId);
    }

    @PostMapping("/save")
    //Enviamos un 201
    @ResponseStatus(HttpStatus.CREATED)
    public Reserva save(@RequestBody Reserva reserva) {
        return reservaService.save(reserva);
    }
    
    @PutMapping("/update")
    //Enviamos un 201
    @ResponseStatus(HttpStatus.CREATED)
    public Reserva update(@RequestBody Reserva reserva) {
        return reservaService.update(reserva);
    }
    
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") int reservaId) {
        return reservaService.deleteReserva(reservaId);
    } 
   
    @GetMapping("/report-status")
    public StatusReservas getReservas(){
        return reservaService.reporteStatusServicio();
    }
    
    @GetMapping("/report-dates/{dateOne}/{dateTwo}")
     public List<Reserva> getReservasTiempo (@PathVariable("dateOne")String dateOne, @PathVariable("dateTwo")String dateTwo ){
         return reservaService.reporteTiempoServicio(dateOne, dateTwo);
    }
     
     @GetMapping("/report-clients")
     public List<ContadorClientes> getClientes(){
         return reservaService.reporteClientesServicio();
    }
    
}
