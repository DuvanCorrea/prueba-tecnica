## Soluciòn a prueba tecnica

La base de datos es MySql

 Para comenzar debemos clonar el repositorio y crear la base de datos, para la creacion de esta se deja el script en el repositorio.
 
 Abrir una terminal o cmd en la ubicación de la carpeta e instalar las dependencia con el comando `npm i`


## Rutas

- ### Productos
Para los productos se tienen las siguientes rutas como puntos de acceso:

Petición **GET** a **/api/producto** -> nos devuelve todos los productos registrados en la base de datos.

Petición **GET** a **/api/producto/:id_producto** -> nos devuelve el producto cullo id coincida con el que enviemos por el parametro.

Petición **POST** a **/api/producto** -> registra el producto que le enviemos en el body, recibe el siguiente formato:
```json
{
        "nombre_prodcuto": "xxxx",
        "stok": 999,
        "categorias_id_categoria": 999
}
```
Petición **DELETE** a **/api/producto/:id_producto** -> elimina de la base de datos el producto cullo id coincida con el que enviamos por parametro.

Petición **PUT** a **/api/producto** -> actualiza la información de un producto existente, se le envia el id junto con el resto de informacion, recibe el siguiente formato:

```json
{
    "id_producto":999,
    "nombre_prodcuto": "xxxxxxx",
    "stok": 999,
    "categorias_id_categoria": 999
}
```

------------

- ### Categorias
Para las categorias se tienen las siguientes rutas como puntos de acceso:

Petición **GET** a **/api/categoria** -> nos devuelve todas las categorias registradas en la base de datos.

Petición **GET** a **/api/categoria/:id_categoria** -> nos devuelve la categoria cullo id coincida con el que enviemos por el parametro.

Petición **POST** a **/api/categoria** -> registra la categoria que le enviemos en el body, recibe el siguiente formato:
```json
{
    "nombre_categoria": "xxxxx"
}
```
Petición **DELETE** a **/api/categoria/:id_categoria** -> elimina de la base de datos la categoria cullo id coincida con el que enviamos por parametro.

Petición **PUT** a **/api/categoria** -> actualiza la información de una categoria existente, se le envia el id junto con el resto de informacion, recibe el siguiente formato:

```json
{
    "id_categoria": 999,
    "nombre_categoria": "xxxxxx"
}
```

------------
- ### Personas
Para las personas se tienen las siguientes rutas como puntos de acceso:

Petición **GET** a **/api/persona** -> nos devuelve todas las personas registradas en la base de datos.

Petición **GET** a **/api/persona/:id_persona** -> nos devuelve la parsona cullo id coincida con el que enviemos por el parametro.

Petición **POST** a **/api/persona** -> registra la persona que le enviemos en el body, recibe el siguiente formato:
```json
{
    "id_persona": 999,
    "nombre_completo": "xxxxxx"
}
```
Petición **DELETE** a **/api/persona/:id_persona** -> elimina de la base de datos la persona cullo id coincida con el que enviamos por parametro.

Petición **PUT** a **/api/persona** -> actualiza la información de una persona existente, se le envia el id junto con el resto de informacion, recibe el siguiente formato:

```json
{
    "id_persona": 999,
    "nombre_completo": "xxxxxx"
}
```

------------
- ### Ventas
Para las personas se tienen las siguientes rutas como puntos de acceso:

Petición **POST** a **/api/venta** -> registra la venta consus respectivos productos, validara disponibilidad y existencia de cada uno, solo dejara completar la venta si existen los productos y hay disponibilidad, ademas se pueden enviar la cantidad de productos deseados, el formato a enviar en el body es el siguiente:
```json
{
    "id_persona": 999,
    "productos": [
        {
            "id_producto": 1,
            "cantidad_vendida": 1
        },
        {
            "id_producto": 2,
            "cantidad_vendida": 2
        },
        {
            "id_producto": 13,
            "cantidad_vendida": 3
        }
    ]
}
```
