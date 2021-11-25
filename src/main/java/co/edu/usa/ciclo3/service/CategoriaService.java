/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.usa.ciclo3.service;

import co.edu.usa.ciclo3.modelo.Categoria;
import co.edu.usa.ciclo3.repository.CategoriaRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author hgc68
 */
@Service
public class CategoriaService {
    
    @Autowired
    private CategoriaRepository categoriaRepository;
    
    public List<Categoria> getAll(){
        return categoriaRepository.getAll();
    }
    
    public Optional<Categoria> getCategoria(int id){
        return categoriaRepository.getCategoria(id);
    }
    
    public Categoria save(Categoria categoria){
        if(categoria.getId()==null){
            return categoriaRepository.save(categoria);  
        }else{
            Optional<Categoria> paux=categoriaRepository.getCategoria(categoria.getId());
            if(!paux.isPresent()){
                return categoriaRepository.save(categoria);
            }else{
                return categoria;
            }
        }
        
    }
    
     public Categoria update(Categoria categoria){
        if(categoria.getId()!=null){
            Optional<Categoria> g =categoriaRepository.getCategoria(categoria.getId());
            if(g.isPresent()){
                if(categoria.getName()!=null){
                    g.get().setName(categoria.getName());
                }
                if(categoria.getDescription()!=null){
                    g.get().setDescription(categoria.getDescription());
                }
                return categoriaRepository.save(g.get());
            }
        }
        return categoria;
    }
    public boolean deletecategoria(int categoriaId){
        Boolean d=getCategoria(categoriaId).map(categoria -> {
            categoriaRepository.delete(categoria);
            return true;
        }).orElse(false);
        return d;
    }
}
