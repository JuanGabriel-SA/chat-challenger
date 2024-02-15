package chat.api.controller;

import chat.api.domain.voto.DadosUpvote;
import chat.api.domain.voto.Voto;
import chat.api.domain.voto.VotoRepository;
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
    private VotoRepository repository;

    @PostMapping("/up")
    @Transactional
    public ResponseEntity upVote(@RequestBody DadosUpvote dados, UriComponentsBuilder uriBuilder) {
        var voto = new Voto(dados);
        repository.save(voto);

        var uri = uriBuilder.path("/chat/send-message/${id}").buildAndExpand(voto.getId()).toUri();

        return ResponseEntity.created(uri).body(voto);
    }

    @DeleteMapping("/down")
    @Transactional
    public ResponseEntity downVote(@RequestBody DadosUpvote dados) {
        repository.removeUpvote(dados.comment_id(), dados.user_id());
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/get-votes/{commentId}")
    public ResponseEntity getVotesByComment(@PathVariable Long commentId) {
        int votos = repository.findAllByCommentId(commentId);
        return ResponseEntity.ok(votos);
    }

    @GetMapping("/get-all-votes")
    public ResponseEntity getVotesByComment() {
        List<Voto> votos = repository.findAll();
        return ResponseEntity.ok(votos);
    }
}
