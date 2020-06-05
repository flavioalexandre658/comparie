USE comparie;

create table lojas(
    idLoja int auto_increment,
    nomeLoja varchar(100) not null,
    constraint idLoja primary key (idLoja),
    constraint ucnomeLoja unique (nomeLoja)
);
insert into `comparie`.`lojas` values 
(null, 'Magazine Luiza');

create table marcas(
    idMarca int auto_increment,
    nomeMarca varchar(100) not null,
    constraint idMarca primary key (idMarca),
    constraint ucnomeMarca unique (nomeMarca)
);
insert into `comparie`.`marcas` values 
(null, 'Acer'),
(null, 'Samsung'),
(null, 'Lg'),
(null, 'Sony'),
(null, 'Philips'),
(null, 'Dell'),
(null, 'Asus'),
(null, 'Lenovo'),
(null, 'Hp'),
(null, 'Apple');

create table categorias(
    idCategoria int auto_increment,
    nomeCategoria varchar(100) not null,
    constraint idCategoria primary key (idCategoria),
    constraint ucnomeCategoria unique (nomeCategoria)
);
insert into `comparie`.`categorias` values 
(null, 'Todos');

create table nichos(
    idNicho int auto_increment,
    nomeNicho varchar(100) not null,
    constraint idNicho primary key (idNicho),
    constraint ucnomeNicho unique (nomeNicho)
);
insert into `comparie`.`nichos` values 
(null, 'Eletrodomésticos'),
(null, 'Informática'),
(null, 'Eletroportáteis'),
(null, 'Video Games');

create table tipos(
    idTipo int auto_increment,
    nomeTipo varchar(100) not null,
    iconTipo varchar(100) not null,
    constraint idTipo primary key (idTipo),
    constraint ucnomeTipo unique (nomeTipo)
);
insert into `comparie`.`tipos` values 
(null, 'TV', 'tv'),
(null, 'Consoles','videogame_asset'),
(null, 'Notebook', 'laptop'),
(null, 'Celular', 'phone_android');

create table produtos(
    idProduto int auto_increment,
    imagemProduto varchar(255) not null,
    nomeProduto varchar(100) not null,
    idTipo int not null,
    idNicho int not null,
    descricao varchar(250) not null,
    review varchar(500) not null,
    idMarca int not null,
    cliques int default 0,

    constraint idProduto primary key (idProduto),
    constraint ucnomeProduto unique (nomeProduto),
    foreign key (idMarca) references marcas(idMarca) on delete no action on update cascade,
    foreign key (idNicho) references nichos(idNicho) on delete no action on update cascade,
    foreign key (idTipo) references tipos(idTipo) on delete no action on update cascade
);

create table produtoloja(
    idLoja int,
    idProduto int,
    linkAfiliado varchar(250) NOT NULL,
    link varchar(800) not null,
    preco varchar(100) not null,
    parcelas varchar(100) not null,
    quantidade int default 0,
    estoque int default 1,
    foreign key (idLoja) references lojas(idLoja) on delete no action on update cascade,
    foreign key (idProduto) references produtos(idProduto) on delete no action on update cascade
);

create table produtocategoria(
    idCategoria int,
    idProduto int,
    quantidade int default 0,
    foreign key (idCategoria) references categorias(idCategoria) on delete no action on update cascade,
    foreign key (idProduto) references produtos(idProduto) on delete no action on update cascade
);

create table tipocategoria(
    idCategoria int,
    idTipo int,
    foreign key (idCategoria) references categorias(idCategoria) on delete no action on update cascade,
    foreign key (idTipo) references tipos(idTipo) on delete no action on update cascade
);