/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.usa.ciclo3.service;

import co.edu.usa.ciclo3.modelo.Ortesis;
import co.edu.usa.ciclo3.repository.OrtesisRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author hgc68
 */
@Service
public class OrtesisService {
    @Autowired
    private OrtesisRepository ortesisRepository;
    
    public List<Ortesis> getAll(){
        return ortesisRepository.getAll();
    }
    
    public Optional<Ortesis> getOrtesis(int id){
        return ortesisRepository.getOrtesis(id);
    }
    
    public Ortesis save(Ortesis ortesis){
        if(ortesis.getId()==null){
            return ortesisRepository.save(ortesis);  
        }else{
            Optional<Ortesis> paux4=ortesisRepository.getOrtesis(ortesis.getId());
            if(!paux4.isPresent()){
                return ortesisRepository.save(ortesis);
            }else{
                return ortesis;
            }
        }
        
    }
    
    public Ortesis update(Ortesis ortesis){
        if(ortesis.getId()!=null){
            Optional<Ortesis> e=ortesisRepository.getOrtesis(ortesis.getId());
            if(e.isPresent()){
                if(ortesis.getName()!=null){
                    e.get().setName(ortesis.getName());
                }
                if(ortesis.getBrand()!=null){
                    e.get().setBrand(ortesis.getBrand());
                }
                if(ortesis.getYear()!=null){
                    e.get().setYear(ortesis.getYear());
                }
                if(ortesis.getDescription()!=null){
                    e.get().setDescription(ortesis.getDescription());
                }
                if(ortesis.getCategory()!=null){
                    e.get().setCategory(ortesis.getCategory());
                }
                ortesisRepository.save(e.get());
                return e.get();
            }else{
                return ortesis;
            }
        }else{
            return ortesis;
        }
    }


    public boolean deleteOrtesis(int ortesisId) {
        Boolean aBoolean = getOrtesis(ortesisId).map(ortesis -> {
            ortesisRepository.delete(ortesis);
            return true;
        }).orElse(false);
        return aBoolean;
    }
}
