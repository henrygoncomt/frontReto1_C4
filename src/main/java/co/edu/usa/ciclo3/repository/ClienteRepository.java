/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.usa.ciclo3.repository;

import co.edu.usa.ciclo3.modelo.Cliente;
import co.edu.usa.ciclo3.repository.crud.ClienteCrudRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;


/**
 *
 * @author hgc68
 */
@Repository
public class ClienteRepository {
    @Autowired
    private ClienteCrudRepository clienteCrudRepository;
    public List<Cliente> getAll(){
        return (List<Cliente>) clienteCrudRepository.findAll();
    }
    public Optional<Cliente> getCliente(int id){
        return clienteCrudRepository.findById(id);
    }

    public Cliente save(Cliente cliente){
        return clienteCrudRepository.save(cliente);
    }
    public void delete(Cliente cliente){
       clienteCrudRepository.delete(cliente);
    }
}
