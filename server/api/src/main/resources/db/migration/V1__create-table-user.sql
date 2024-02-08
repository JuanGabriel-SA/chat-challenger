create table message(
    id bigint not null auto_increment,
    content varchar(500) not null,
    createdAt date not null,
    score int not null,
);