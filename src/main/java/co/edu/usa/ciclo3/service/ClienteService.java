/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.usa.ciclo3.service;

import co.edu.usa.ciclo3.modelo.Cliente;
import co.edu.usa.ciclo3.repository.ClienteRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class ClienteService {
    
    @Autowired
    private ClienteRepository clienteRepository;
    
    public List<Cliente> getAll(){
        return clienteRepository.getAll();
    }
    
    public Optional<Cliente> getCliente(int id){
        return clienteRepository.getCliente(id);
    }
    
    public Cliente save(Cliente cliente){
        if(cliente.getIdClient()==null){
            return clienteRepository.save(cliente);  
        }else{
            Optional<Cliente> paux2=clienteRepository.getCliente(cliente.getIdClient());
            if(!paux2.isPresent()){
                return clienteRepository.save(cliente);
            }else{
                return cliente;
            }
        }
        
    }
    public Cliente update(Cliente client){
        if(client.getIdClient()!=null){
            Optional<Cliente> e= clienteRepository.getCliente(client.getIdClient());
            if(e.isPresent()){
                if(client.getName()!=null){
                    e.get().setName(client.getName());
                }
                if(client.getAge()!=null){
                    e.get().setAge(client.getAge());
                }
                if(client.getEmail()!=null){
                    e.get().setEmail(client.getEmail());
                }
                if(client.getPassword()!=null){
                    e.get().setPassword(client.getPassword());
                }
                clienteRepository.save(e.get());
                return e.get();
            }else{
                return client;
            }
        }else{
            return client;
        }
    }
    public boolean deleteCliente(int clienteId){
        Boolean d=getCliente(clienteId).map(cliente -> {
            clienteRepository.delete(cliente);
            return true;
        }).orElse(false);
        return d;
    }
}
