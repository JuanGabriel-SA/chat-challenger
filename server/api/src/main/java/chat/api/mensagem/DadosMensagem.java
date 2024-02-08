package chat.api.mensagem;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.annotation.Nullable;

import java.time.LocalDate;

public record DadosMensagem(
        String content,
        @JsonFormat(pattern = "dd/MM/yyyy")
        LocalDate created_at,
        @Nullable
        int score,
        Long user_id,
        String reply_to) {
}
