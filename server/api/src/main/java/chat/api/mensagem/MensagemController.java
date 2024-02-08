package chat.api.mensagem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/chat")
public class MensagemController {

    @Autowired
    private MensagemRepository repository;

    @Autowired
    private ControladorDoChat chat;
    @PostMapping("/send-message")
    @Transactional
    public ResponseEntity sendMessage(@RequestBody DadosMensagem dados) {
        chat.enviarMensagem(dados);
        return ResponseEntity.ok("Mensagem enviada.");
    }
    @GetMapping("/get-messages")
    public ResponseEntity getMessages() {
        List<Mensagem> mensagens = repository.findAll();
        return ResponseEntity.ok(mensagens);
    }
}
