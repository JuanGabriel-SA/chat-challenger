package chat.api.domain.voto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@RequestMapping("/vote")
@RestController
public class VotoController {

    @Autowired
    private ControladorDeVotos controladorVotos;

    @Autowired
    private VotoRepository repository;

    @PutMapping("/up")
    @Transactional
    public ResponseEntity<String> upVote(@RequestBody DadosUpvote dados) {
        controladorVotos.upvote(dados);
        return ResponseEntity.ok("Voto atualizada com sucesso.");
    }

//    @PutMapping("/down")
//    @Transactional
//    public ResponseEntity<String> downVote(@RequestBody DadosUpvote dados) {
//        controladorVotos.downvote(dados);
//        return ResponseEntity.ok("Voto atualizada com sucesso.");
//    }

    @PostMapping("/add")
    @Transactional
    public ResponseEntity addVote(@RequestBody DadosUpvote dados, UriComponentsBuilder uriBuilder) {
        var voto = new Voto(dados);
        repository.save(voto);
        var uri = uriBuilder.path("/vote/add}").buildAndExpand(voto.getId()).toUri();
        return ResponseEntity.created(uri).body(dados);
    }

    @GetMapping("/get-votes")
    @Transactional
    public ResponseEntity getVotes() {
        List<Voto> votos = repository.findAll();
        return ResponseEntity.ok(votos);
    }
}
