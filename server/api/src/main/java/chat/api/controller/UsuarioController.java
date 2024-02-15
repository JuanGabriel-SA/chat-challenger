package chat.api.domain.usuario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UsuarioController {

    @Autowired
    private UsuarioRepository repository;
    @GetMapping("/get-users")
    public ResponseEntity getUsers() {
        List<Usuario> usuarios = repository.findAll();
        return ResponseEntity.ok(usuarios);
    }
}
