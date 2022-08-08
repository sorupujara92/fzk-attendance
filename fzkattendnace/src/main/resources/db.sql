create table users_token
(
    id    VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);


create table users
(
    email      VARCHAR(100) NOT NULL,
    password   VARCHAR(100) NOT NULL,
    role       VARCHAR(40)  NOT NULL,
    created_at DATE DEFAULT (CURRENT_DATE),
    PRIMARY KEY (email)
);
