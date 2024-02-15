create table comments(
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    content VARCHAR(500) NOT NULL,
    createdAt DATE NOT NULL,
    score INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES chat_users(id)
)