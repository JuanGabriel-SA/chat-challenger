package chat.api.mensagem;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.annotation.Nullable;

import java.time.LocalDate;

public record DadosMensagem(

        Long id,
        String content,
        @JsonFormat(pattern = "dd/MM/yyyy")
        LocalDate created_at,
        Long user_id,
        @Nullable
        String reply_to) {
}
