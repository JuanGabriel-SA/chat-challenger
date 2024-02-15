package chat.api.domain.voto;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Table(name = "upvotes")
@Entity(name = "Upvote")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Voto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long comment_id;

    private Long user_id;

    public Voto(DadosUpvote dados) {
        this.id = dados.id();
        this.comment_id = dados.comment_id();
        this.user_id = dados.user_id();
    }
}
