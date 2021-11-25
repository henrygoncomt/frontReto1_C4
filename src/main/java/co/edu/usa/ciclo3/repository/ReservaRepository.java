/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.usa.ciclo3.repository;

import co.edu.usa.ciclo3.modelo.Cliente;
import co.edu.usa.ciclo3.modelo.ContadorClientes;
import co.edu.usa.ciclo3.modelo.Reserva;
import co.edu.usa.ciclo3.repository.crud.ReservaCrudRepository;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author hgc68
 */
@Repository
public class ReservaRepository {
    @Autowired
    private ReservaCrudRepository reservaCrudRepository;
    public List<Reserva> getAll(){
        return (List<Reserva>) reservaCrudRepository.findAll();
    }
    public Optional<Reserva> getReserva(int id){
        return reservaCrudRepository.findById(id);
    }

    public Reserva save(Reserva reserva){
        return reservaCrudRepository.save(reserva);
    }
    public void delete(Reserva reserva){
       reservaCrudRepository.delete(reserva);
    }
    
   
     
     public List<Reserva> ReservacionTiempoRepositorio (Date a, Date b){
         return reservaCrudRepository.findAllByStartDateAfterAndStartDateBefore(a, b);
     
     }
     
     public List<ContadorClientes> getClientesRepositorio(){
         List<ContadorClientes> res = new ArrayList<>();
         List<Object[]> report = reservaCrudRepository.countTotalReservationsByClient();
         for(int i=0; i<report.size(); i++){
             res.add(new ContadorClientes((Long)report.get(i)[1],(Cliente) report.get(i)[0]));
         }
         return res;
     }
     
     public List<Reserva> ReservacionStatusRepositorio (String status){
         return reservaCrudRepository.findAllByStatus(status);
     }
     
}
