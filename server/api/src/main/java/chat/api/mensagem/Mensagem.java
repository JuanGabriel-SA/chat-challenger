package chat.api;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "comments")
@Entity(name = "Comment")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Mensagem {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ForeignKey
    private long user_id;
}
