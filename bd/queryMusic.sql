CREATE DATABASE FAVOURITE_MUSIC;
USE FAVOURITE_MUSIC;
CREATE TABLE album (
idAlbum INT auto_increment primary KEY not null,
nameAlbum varchar(50) not null,
nameBand varchar(50) not null ,
yearAlbum INT not null, 
`length` varchar(25) not null ,
gendre varchar(25) not null
);

INSERT INTO `favourite_music`.`album` (`nameAlbum`, `nameBand`, `yearAlbum`, `length`, `gendre`) VALUES ('in utero', 'nirvana', '1993', '41:12', 'grunge');
