create table authorities
(
    username  varchar(50) not null,
    authority varchar(50) not null,
    constraint fk_authorities_user foreign key (username) references user (username)
);
create
unique index ix_auth_username on authorities(username,authority);
