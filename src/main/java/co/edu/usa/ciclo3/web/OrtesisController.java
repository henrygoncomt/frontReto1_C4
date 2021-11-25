/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.usa.ciclo3.web;

import co.edu.usa.ciclo3.modelo.Ortesis;
import co.edu.usa.ciclo3.service.OrtesisService;
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
@RequestMapping("/api/Ortopedic")
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE})
public class OrtesisController {
    
    @Autowired
    private OrtesisService ortesisService;
    
    @GetMapping("/all")
    public List<Ortesis> getOrtesis(){
        return ortesisService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Ortesis> getOrtesis(@PathVariable("id") int ortesisId) {
        return ortesisService.getOrtesis(ortesisId);
    }

    @PostMapping("/save")
    //Enviamos un 201
    @ResponseStatus(HttpStatus.CREATED)
    public Ortesis save(@RequestBody Ortesis ortesis) {
        return ortesisService.save(ortesis);
    }
    
    @PutMapping("/update")
    //Enviamos un 201
    @ResponseStatus(HttpStatus.CREATED)
    public Ortesis update(@RequestBody Ortesis ortesis) {
        return ortesisService.update(ortesis);
    }
    
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") int ortesisId) {
        return ortesisService.deleteOrtesis(ortesisId);
    } 
    
    
}
