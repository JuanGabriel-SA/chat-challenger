package chat.api.domain.mensagem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

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
    public ResponseEntity sendMessage(@RequestBody DadosMensagem dados, UriComponentsBuilder uriBuilder) {
        var mensagem = new Mensagem(dados);
        chat.enviarMensagem(mensagem);

        var uri = uriBuilder.path("/chat/send-message/${id}").buildAndExpand(mensagem.getId()).toUri();

        return ResponseEntity.created(uri).body(mensagem.getId());
    }
    @GetMapping("/get-messages")
    public ResponseEntity getMessages() {
        List<Mensagem> mensagens = repository.findAll();
        return ResponseEntity.ok(mensagens);
    }

    @PutMapping("/att-message/{id}")
    @Transactional
    public ResponseEntity attMessage(@PathVariable Long id, @RequestBody DadosAtualizacaoMensagem dados) {
        var mensagem = repository.getReferenceById(id);
        mensagem.atualizar(dados);
        return ResponseEntity.ok("Mensagem atualizada com sucesso.");
    }
    @DeleteMapping("/delete-message/{id}")
    @Transactional
    public ResponseEntity delMessage(@PathVariable Long id) {
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
