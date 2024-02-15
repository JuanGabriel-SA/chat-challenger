package chat.api.domain.mensagem;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MensagemRepository extends JpaRepository<Mensagem, Long> {
    @Query("SELECT c, COUNT(u) AS upvoteCount " +
            "FROM Comment c " +
            "LEFT JOIN Upvote u ON c.id = u.comment_id " +
            "GROUP BY c.id " +
            "ORDER BY upvoteCount DESC")
    List<Mensagem> findAllOrderByUpvotesDesc();

    @Query("""
            SELECT c FROM Comment c WHERE c.reply_to = :commentId
            """)
    List<Mensagem> findAllByReply(@Param("commentId") Long commentId);
}
