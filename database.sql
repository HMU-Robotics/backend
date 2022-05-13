create database HMU_ROBOTICS_CLUB;
use HMU_ROBOTICS_CLUB;

create table role(
    id int not null auto_increment,
    name text,
    primary key (id)
);

create table user(
    id int not null auto_increment,
    email varchar(254) not null,
    first_name text not null ,
    last_name text not null,
    confirmed_at timestamp,
    discord_id text,
    password varchar(80),
    role_id int not null,
    Newsletter int default 1,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp,
    primary key (id),
    foreign key (role_id) references role(id)
);

create table reservation(
    id int not null auto_increment,
    user_id int not null,
    start_date timestamp not null ,
    end_date timestamp not null,
    created_at timestamp default current_timestamp,
    primary key (id),
    foreign key (user_id) references user(id)
);

create table category
(
    id int not null auto_increment,
    name text not null,
    primary key (id)
);

create table item(
    id int not null auto_increment,
    name text not null ,
    image longblob,
    category_id int not null,
    description text,
    code varchar(36) not null,
    status enum('available', 'unavailable'),
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp,
    primary key (id),
    foreign key (category_id) references category(id)
);

create table item_reservation(
    item_id int not null,
    reservation_id int not null,
    primary key (item_id, reservation_id),
    foreign key (item_id) references item(id),
    foreign key (reservation_id) references reservation(id)
);