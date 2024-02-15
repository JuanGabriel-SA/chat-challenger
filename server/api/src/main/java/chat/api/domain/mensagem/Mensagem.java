package chat.api.mensagem;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Table(name = "comments")
@Entity(name = "Comment")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Mensagem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;

    private LocalDate created_at;

    private Long user_id;

    @Nullable
    private String reply_to;

    public Mensagem(DadosMensagem dados) {
        this.id = dados.id();
        this.user_id = dados.user_id();
        this.content = dados.content();
        this.created_at = dados.created_at();
        this.reply_to = dados.reply_to();
    }

    public void atualizar(DadosAtualizacaoMensagem dados) {
        if (dados.content() != null) {
            this.content = dados.content();
        }
        
        if (dados.reply_to() != null) {
            this.reply_to = dados.reply_to();
        }
    }
}
