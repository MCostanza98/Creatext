Finstagram

Esta es una API que simula el funcionamiento de Instagram

ENTIDADES
Users:
id
email
password
created_at

photo
id
user
image
created_at

like
id
user
created_at

comment
id
user
text
created_at

Endpoints

USER
POST /users registro de usuario;
GET user/:id devuelve la informacion del usuario;
POST /login devuelve el token del usuario;

PHOTOS

POST / permite crear una foto;
GET / lista de todas las fotos;
GET /photo/:id devuelve la informacion de la foto;
DELETE /photo/:id puedes borrar la foto;

LIKE

GET recibe la informacion de un usuario y de la foto para registrar un like;
DELETE puedes eliminar el like de la foto;

COMMENT

POST permite que puedas escribir un comentario con autenticacion previa ;
DELETE puedes eliminar el comentario de la foto;
