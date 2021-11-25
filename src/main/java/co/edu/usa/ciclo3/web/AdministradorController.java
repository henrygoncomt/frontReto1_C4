/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.usa.ciclo3.web;

import co.edu.usa.ciclo3.modelo.Administrador;
import co.edu.usa.ciclo3.service.AdministradorService;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author hgc68
 */
@RestController
@RequestMapping("/api/Admin")
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE})
public class AdministradorController {
    @Autowired
    private AdministradorService administradorService;
    
    @GetMapping("/all")
    public List<Administrador> getAdministrador(){
        return administradorService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Administrador> getAdministrador(@PathVariable("id") int administradorId) {
        return administradorService.getAdministrador(administradorId);
    }

    @PostMapping("/save")
    //Enviamos un 201
    @ResponseStatus(HttpStatus.CREATED)
    public Administrador save(@RequestBody Administrador administrador) {
        return administradorService.save(administrador);
    }
    
    @PutMapping("/update")
    //Enviamos un 201
    @ResponseStatus(HttpStatus.CREATED)
    public Administrador update(@RequestBody Administrador administrador) {
        return administradorService.update(administrador);
    }
    
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") int administradorId) {
        return administradorService.deleteAdministrador(administradorId);
    } 
}
