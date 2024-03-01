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
INSERT INTO `favourite_music`.`album` (`nameAlbum`, `nameBand`, `yearAlbum`, `length`, `gendre`) VALUES 
('nevermind', 'nirvana', '1991', '42:38', 'grunge'),
('by the way', 'red hot chilli peppers', '1991', '68:46', 'grunge'),
('the joshua tree', 'u2', '1987', '50:11', 'pop rock'),
('sticky fingers', 'the rolling stones', '1971', '46:25', 'rock'),
('in utero', 'nirvana', '1993', '41:12', 'grunge'),
('californication', 'red hot chilli peppers', '1991', '42:38', 'grunge'),
('the colour and the shape', 'foo fighters', '1997', '46:47', 'rock');
('in utero', 'nirvana', '1993', '41:12', 'grunge');
