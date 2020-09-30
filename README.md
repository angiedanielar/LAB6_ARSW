# LAB6_ARSW 🚀
**_Integrantes:_**


* _Angie Daniela Ruiz Alfonso_
* _Juan Sebastian Díaz Salamanca_ 
## Heavy client - Cinema Book System II 🎥

![boceto](/img/2.png)

**_Descripción:_**

_Se desea generar una pequeña interfaz de administrador para el sistema de gestión de compra/reserva de boletos de cine. Para efectos prácticos del ejercicio se creará un espacio en la misma pantalla destinado para esto, tal y como se ve en el mock provisto._

_1. Agregue el campo de entrada para editar el horario de la función y el botón 'Save/Update'. Respetando la arquitectura de módulos actual del cliente, haga que al oprimirse el botón:_

_1.1 Se haga PUT al API, con la función actualizada, en su recurso REST correspondiente._

_1.2 Se haga GET al recurso /cinemas/{name}/{date}, para actualizar el listado de las funciones del cine y de la fecha previamente seleccionados.
Para lo anterior tenga en cuenta:
jQuery no tiene funciones para peticiones PUT o DELETE, por lo que es necesario 'configurarlas' manualmente a través de su API para AJAX. Por ejemplo, para hacer una peticion PUT a un recurso /myrecurso:_

![code1](/img/3.png)

_Para éste note que la propiedad 'data' del objeto enviado a $.ajax debe ser un objeto jSON (en formato de texto). Si el dato que quiere enviar es un objeto JavaScript, puede convertirlo a jSON con:_

![code2](/img/4.png)

_Como en este caso se tienen dos operaciones basadas en callbacks, y que las mismas requieren realizarse en un orden específico, tenga en cuenta cómo usar las promesas de JavaScript mediante alguno de los ejemplos disponibles._

![Main](/img/1.png)

![consulta](/img/5.png)

_2. Agregue el botón 'Create new function', de manera que cuando se oprima:_

_Se borre el canvas actual._

_Se solicite el nombre y género de la película, además de la hora de la nueva función (usted decide la manera de hacerlo). Se tendrá en cuenta el nombre del cine y la fecha actualmente consultados para asociarles la función._

_Esta opción debe cambiar la manera como funciona la opción 'save/update', pues en este caso, al oprimirse la primera vez (es decir cuando se va guardar la nueva función 'save') debe (igualmente, usando promesas):_

_2.1 Hacer POST al recurso /cinemas/{name}, para crear la nueva función._

_2.2 Hacer GET al respectivo recurso, para actualizar el listado de funciones._

![crea](/img/6.png)

![crea2](/img/7.png)

_3. Agregue el botón 'DELETE', de manera que (también con promesas):_

_Borre el canvas._

_3.1 Haga DELETE de la función actualmente seleccionada._
_3.2 Haga GET de las funciones ahora disponibles._

![borra](/img/8.png)

![borra2](/img/9.png)


## _¡¡¡Compile and run instructions!!!_ 🛠️
**_Para compilar:_**
_maven package_


**_Para ejecutar las pruebas:_**
_mvn test_


**_Para ejecutar la clase principal:_** 
_mvn exec:java -Dexec.mainClass="edu.eci.arsw.cinema.Main"_


**_Y para probar el funcionamiento de las peticiones y la página web:_**
 * _mvn clean compile_
 * _mvn spring-boot:run_

