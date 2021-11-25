/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.usa.ciclo3.service;

import co.edu.usa.ciclo3.modelo.Mensaje;
import co.edu.usa.ciclo3.repository.MensajeRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author hgc68
 */
@Service
public class MensajeService {
    @Autowired
    private MensajeRepository mensajeRepository;
    
    public List<Mensaje> getAll(){
        return mensajeRepository.getAll();
    }
    
    public Optional<Mensaje> getMensaje(int id){
        return mensajeRepository.getMensaje(id);
    }
    
    public Mensaje save(Mensaje mensaje){
        if(mensaje.getIdMessage()==null){
            return mensajeRepository.save(mensaje);  
        }else{
            Optional<Mensaje> paux3=mensajeRepository.getMensaje(mensaje.getIdMessage());
            if(!paux3.isPresent()){
                return mensajeRepository.save(mensaje);
            }else{
                return mensaje;
            }
        }
        
    }
    
    public Mensaje update(Mensaje mensaje){
        if(mensaje.getIdMessage()!=null){
            Optional<Mensaje>g=mensajeRepository.getMensaje(mensaje.getIdMessage());
            if(g.isPresent()){
                if(mensaje.getMessageText()!=null){
                    g.get().setMessageText(mensaje.getMessageText());
                }
                if(mensaje.getMessageText()!=null){
                    g.get().setMessageText(mensaje.getMessageText());
                }
                if(mensaje.getOrtopedic()!=null){
                    g.get().setOrtopedic(mensaje.getOrtopedic());
                }
                if(mensaje.getClient()!=null){
                    g.get().setClient(mensaje.getClient());
                }
                
                return mensajeRepository.save(g.get());
            }
        }
        return mensaje;
    }
    public boolean deleteMensaje(int mensajeId){
        Boolean d=getMensaje(mensajeId).map(mensaje -> {
            mensajeRepository.delete(mensaje);
            return true;
        }).orElse(false);
        return d;
    }
}
