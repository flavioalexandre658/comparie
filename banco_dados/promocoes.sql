USE comparie;

create table promocoes(
    idPromocao int auto_increment,
    nomePromocao varchar(100) not null,
    dataInicio varchar(100) NOT NULL,
    dataFim varchar(100) NOT NULL,
    constraint idPromocao primary key (idPromocao)
);

create table promocaoloja(
    idLoja int,
    idPromocao int,
    bannerPromocao varchar(250) not null,
    bannerPromocaoMobile varchar(250) not null,
    linkAfiliado varchar(250) NOT NULL,
    quantidade int default 0,
    foreign key (idLoja) references lojas(idLoja) on delete no action on update cascade,
    foreign key (idPromocao) references promocoes(idPromocao) on delete no action on update cascade
);