/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.usa.ciclo3.repository;

import co.edu.usa.ciclo3.modelo.Categoria;
import co.edu.usa.ciclo3.repository.crud.CategoriaCrudRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author hgc68
 */
@Repository
public class CategoriaRepository {
    @Autowired
    private CategoriaCrudRepository categoriaCrudRepository;
    public List<Categoria> getAll(){
        return (List<Categoria>) categoriaCrudRepository.findAll();
    }
    public Optional<Categoria> getCategoria(int id){
        return categoriaCrudRepository.findById(id);
    }

    public Categoria save(Categoria categoria){
        return categoriaCrudRepository.save(categoria);
    }
    public void delete(Categoria categoria){
       categoriaCrudRepository.delete(categoria);
    }
}
