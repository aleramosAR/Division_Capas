# Dividir en capas nuestro proyecto


* #### Dividir en capas el proyecto entregable con el que venimos trabajando, agrupando apropiadamente las capas de ruteo, controlador, lógica de negocio y persistencia.

* #### Considerar agrupar las rutas por funcionalidad, con sus controladores, lógica de negocio con los casos de uso, y capa de persistencia.

* #### La capa de persistencia contendrá los métodos necesarios para atender la interacción de la lógica de negocio con los propios datos.

<br />

En la carpeta ```/routes``` que ya tenia de antes, agregue un ```index.js``` y desde ahi importe y configure las rutas del **Front**, **Mensajes** y **Productos**, de esta manera quite toda la configuracion de rutas de ```server.js``` y la deje toda en una sola carpeta.

Cree una carpeta llamada ```/controllers``` donde, en diferentes archivos, tengo los controladores del  **Front**, **Mensajes** y **Productos**.

Los controladores de **Mensajes** y **Productos**  derivan las funciones que sean necesarias a los archivos de la capa de negocio que estan en ```/negocio```, algunas de las funciones de 'negocio' solo hacen el paso de la llamada a las funciones de persistencia y otras ejecutan los scripts que sean necesarios, por ejemplo en ```postMensajeNegocio()``` agrego la fecha en que se graba el mensaje, y en ```updateProductoNegocio()``` selecciono que campos modificar de acuerdo a los datos recibidos.

Por ultimo las funciones de **GET**, **POST**, **PUT** y **DELETE** de **Mensajes** y **Productos** se ejecutan desde la carpeta de ```/persistencia```, donde hago las llamadas a las funciones de **MongoDB** que modifican la base de datos.

En esta carpeta tambien cree un archivo llamado ```datos.js``` donde ubique la inicializacion del Store de **MongoDB**, esto lo hacia antes en ```server.js``` pero ahora lo pase a este archivo para que todo lo relacionado a persistencia este en una carpeta.

Por otro lado, la carpeta ```/models``` desde donde configuro los modelos de **MongoDB** tambien se movieron a la carpeta ```/persistencia```.