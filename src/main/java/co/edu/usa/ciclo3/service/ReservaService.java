/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.usa.ciclo3.service;

import co.edu.usa.ciclo3.modelo.ContadorClientes;
import co.edu.usa.ciclo3.modelo.Reserva;
import co.edu.usa.ciclo3.modelo.StatusReservas;
import co.edu.usa.ciclo3.repository.ReservaRepository;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author hgc68
 */
@Service
public class ReservaService {
    @Autowired
    private ReservaRepository reservaRepository;
    
    public List<Reserva> getAll(){
        return reservaRepository.getAll();
    }
    
    public Optional<Reserva> getReserva(int id){
        return reservaRepository.getReserva(id);
    }
    //Llamada al repositorio ReservaRepository
    public Reserva save(Reserva reserva){
        if(reserva.getIdReservation()==null){
            return reservaRepository.save(reserva);  
        }else{
            Optional<Reserva> paux5=reservaRepository.getReserva(reserva.getIdReservation());
            if(!paux5.isPresent()){
                return reservaRepository.save(reserva);
            }else{
                return reserva;
            }
        }   
    }
    //Llamada al repositorio ReservaRepository tener encuenta los campos que se van a actualizar
    public Reserva update(Reserva reserva){
        if(reserva.getIdReservation()!=null){
            Optional<Reserva> e= reservaRepository.getReserva(reserva.getIdReservation());
            if(e.isPresent()){

                if(reserva.getStartDate()!=null){
                    e.get().setStartDate(reserva.getStartDate());
                }
                if(reserva.getDevolutionDate()!=null){
                    e.get().setDevolutionDate(reserva.getDevolutionDate());
                }
                if(reserva.getStatus()!=null){
                    e.get().setStatus(reserva.getStatus());
                }
                reservaRepository.save(e.get());
                return e.get();
            }else{
                return reserva;
            }
        }else{
            return reserva;
        }
    }
    //Llamada al repositorio ReservaRepository solo requiere el id para borrar
    public boolean deleteReserva(int reservaId) {
        Boolean aBoolean = getReserva(reservaId).map(reserva -> {
            reservaRepository.delete(reserva);
            return true;
        }).orElse(false);
        return aBoolean;
    }
    
    //Llamada al repositorio ReservaRepository Envia los parametros para las consultas
    public List<Reserva> reporteTiempoServicio (String datoA, String datoB){
        SimpleDateFormat parser = new SimpleDateFormat ("yyyy-MM-dd");
       
        Date datoUno = new Date();
        Date datoDos = new Date();
                
        try{
             datoUno = parser.parse(datoA);
             datoDos = parser.parse(datoB);
        }catch(ParseException evt){
            evt.printStackTrace();
        }if(datoUno.before(datoDos)){
            return reservaRepository.ReservacionTiempoRepositorio(datoUno, datoDos);
        }else{
            return new ArrayList<>();
        
        } 
    }
    //Envia a repositorio para la consulta
    public List<ContadorClientes> reporteClientesServicio(){
            return reservaRepository.getClientesRepositorio();
        }
    //Envia para la consulta del los servicios completados y cancelados
    public StatusReservas reporteStatusServicio (){
        List<Reserva>completed= reservaRepository.ReservacionStatusRepositorio("completed");
        List<Reserva>cancelled= reservaRepository.ReservacionStatusRepositorio("cancelled");
        
        return new StatusReservas(completed.size(), cancelled.size() );
       
       
    }
}
