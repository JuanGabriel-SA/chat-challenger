package chat.api.domain.mensagem;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.annotation.Nullable;

import java.time.LocalDate;

public record DadosAtualizacaoMensagem(
        String content,
        String reply_to) {
}
