/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.usa.ciclo3.repository;

import co.edu.usa.ciclo3.modelo.Ortesis;
import co.edu.usa.ciclo3.repository.crud.OrtesisCrudRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author hgc68
 */
@Repository
public class OrtesisRepository {
    @Autowired
    private OrtesisCrudRepository ortesisCrudRepository;
    public List<Ortesis> getAll(){
        return (List<Ortesis>) ortesisCrudRepository.findAll();
    }
    public Optional<Ortesis> getOrtesis(int id){
        return ortesisCrudRepository.findById(id);
    }

    public Ortesis save(Ortesis ortesis){
        return ortesisCrudRepository.save(ortesis);
    }
    public void delete(Ortesis ortesis){
       ortesisCrudRepository.delete(ortesis);
    }
}
