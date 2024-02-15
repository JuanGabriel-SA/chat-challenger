package chat.api.domain.voto;

import chat.api.domain.mensagem.Mensagem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VotoRepository extends JpaRepository<Voto, Long> {

    @Modifying
    @Query("""
            DELETE FROM Upvote u WHERE u.comment_id = :commentId AND u.user_id = :userId
            """)
    void removeUpvote(@Param("commentId") Long commentId, @Param("userId") Long userId);

    @Query("""
            SELECT COUNT(u) FROM Upvote u WHERE u.comment_id = :commentId
            """)
    int findAllByCommentId(@Param("commentId") Long commentId);

    @Modifying
    @Query("""
            DELETE  FROM Upvote u WHERE u.comment_id = :commentId
            """)
    void deleteAllByCommentId(@Param("commentId") Long commentId);
}
