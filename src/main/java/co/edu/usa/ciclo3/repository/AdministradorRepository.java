/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.usa.ciclo3.repository;

import co.edu.usa.ciclo3.modelo.Administrador;
import co.edu.usa.ciclo3.repository.crud.AdministradorCrudRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author hgc68
 */
@Repository
public class AdministradorRepository {
    @Autowired
    private AdministradorCrudRepository administradorCrudRepository;
    public List<Administrador> getAll(){
        return (List<Administrador>) administradorCrudRepository.findAll();
    }
    public Optional<Administrador> getAdministrador(int id){
        return administradorCrudRepository.findById(id);
    }

    public Administrador save(Administrador administrador){
        return administradorCrudRepository.save(administrador);
    }
    public void delete(Administrador administrador){
       administradorCrudRepository.delete(administrador);
    }
}
