/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.usa.ciclo3.service;

import co.edu.usa.ciclo3.modelo.Administrador;
import co.edu.usa.ciclo3.repository.AdministradorRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author hgc68
 */
@Service
public class AdministradorService {
    @Autowired
    private AdministradorRepository administradorRepository;
    
    public List<Administrador> getAll(){
        return administradorRepository.getAll();
    }
    
    public Optional<Administrador> getAdministrador(int id){
        return administradorRepository.getAdministrador(id);
    }
    
    public Administrador save(Administrador administrador){
        if(administrador.getId()==null){
            return administradorRepository.save(administrador);  
        }else{
            Optional<Administrador> paux7=administradorRepository.getAdministrador(administrador.getId());
            if(!paux7.isPresent()){
                return administradorRepository.save(administrador);
            }else{
                return administrador;
            }
        }
        
    }
    
    public Administrador update(Administrador administrador){
        if(administrador.getId()!=null){
            Optional<Administrador> e= administradorRepository.getAdministrador(administrador.getId());
            if(e.isPresent()){
                if(administrador.getName()!=null){
                    e.get().setName(administrador.getName());
                }
                if(administrador.getPassword()!=null){
                    e.get().setPassword(administrador.getPassword());
                }
                
                if(administrador.getEmail()!=null){
                    e.get().setEmail(administrador.getEmail());
                }
                administradorRepository.save(e.get());
                return e.get();
            }else{
                return administrador;
            }
        }else{
            return administrador;
        }
    }
    public boolean deleteAdministrador(int administradorId){
        Boolean d=getAdministrador(administradorId).map(administrador -> {
            administradorRepository.delete(administrador);
            return true;
        }).orElse(false);
        return d;
    }
}
