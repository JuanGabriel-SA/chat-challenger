package chat.api;

import java.time.LocalDate;

public record DadosMensagem(long user_id, String content, LocalDate createdAt, int score, String reply_to) {
}
