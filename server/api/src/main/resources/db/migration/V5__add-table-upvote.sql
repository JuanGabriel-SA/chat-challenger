CREATE TABLE upvote (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    comment_id INT,
    upvotes INT,
    FOREIGN KEY (user_id) REFERENCES chat_users(id),
    FOREIGN KEY (comment_id) REFERENCES comments(id)
)