create table replies(
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    comment_id BIGINT NOT NULL,
    FOREIGN KEY (comment_id ) REFERENCES comments(id)
)