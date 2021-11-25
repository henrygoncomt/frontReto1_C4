  /*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.usa.ciclo3.repository;

import co.edu.usa.ciclo3.modelo.Mensaje;
import co.edu.usa.ciclo3.repository.crud.MensajeCrudRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;


/**
 *
 * @author hgc68
 */
@Repository
public class MensajeRepository {
    @Autowired
    private MensajeCrudRepository mensajeCrudRepository;
    public List<Mensaje> getAll(){
        return (List<Mensaje>) mensajeCrudRepository.findAll();
    }
    public Optional<Mensaje> getMensaje(int id){
        return mensajeCrudRepository.findById(id);
    }

    public Mensaje save(Mensaje mensaje){
        return mensajeCrudRepository.save(mensaje);
    }
    public void delete(Mensaje mensaje){
       mensajeCrudRepository.delete(mensaje);
    }
    
    
}
