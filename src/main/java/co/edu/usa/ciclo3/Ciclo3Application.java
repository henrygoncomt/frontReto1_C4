package co.edu.usa.ciclo3;

import co.edu.usa.ciclo3.modelo.Administrador;
import co.edu.usa.ciclo3.modelo.Categoria;
import co.edu.usa.ciclo3.modelo.Cliente;
import co.edu.usa.ciclo3.modelo.Mensaje;
import co.edu.usa.ciclo3.modelo.Ortesis;
import co.edu.usa.ciclo3.modelo.Reserva;
import co.edu.usa.ciclo3.modelo.User;
import co.edu.usa.ciclo3.repository.AdministradorRepository;
import co.edu.usa.ciclo3.repository.CategoriaRepository;
import co.edu.usa.ciclo3.repository.ClienteRepository;
import co.edu.usa.ciclo3.repository.MensajeRepository;
import co.edu.usa.ciclo3.repository.OrtesisRepository;
import co.edu.usa.ciclo3.repository.ReservaRepository;
import co.edu.usa.ciclo3.repository.UserRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;

@EntityScan(basePackages = {"co.edu.usa.ciclo3.modelo"})
@SpringBootApplication
public class Ciclo3Application {
        @Autowired
        private OrtesisRepository ortesisCrudRepository;
        @Autowired
        private CategoriaRepository categoriaCrudRepository;
        @Autowired
        private ClienteRepository clienteCrudRepository;
        @Autowired
        private MensajeRepository mensajeCrudRepository;
        @Autowired
        private ReservaRepository reservaCrudRepository;
        @Autowired
        private AdministradorRepository administradorCrudRepository;
        @Autowired
        private UserRepository userCrudRepository;
        
	public static void main(String[] args) {
		SpringApplication.run(Ciclo3Application.class, args);
	}
        
        @Bean
        ApplicationRunner applicationRunner() {
            return args -> {
                List<Ortesis> os = ortesisCrudRepository.getAll();
                System.out.println("Ortesis: "+os.size());

                List<Categoria> cs = categoriaCrudRepository.getAll();
                System.out.println("Categorias: "+cs.size());
                
                List<Cliente> cl = clienteCrudRepository.getAll();
                System.out.println("Clientes: "+cl.size());
                
                List<Mensaje> ms = mensajeCrudRepository.getAll();
                System.out.println("Mensaje: "+ms.size());
                
                List<Reserva> rs = reservaCrudRepository.getAll();
                System.out.println("Reservas: "+rs.size());
                
                List<Administrador> ad = administradorCrudRepository.getAll();
                System.out.println("Administradores: "+rs.size());
                
                List<User> us = userCrudRepository.getAll();
                System.out.println("Usuarios: "+rs.size());
                  
            };
        }

}
