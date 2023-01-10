// MERAKI TIENDA ONLINE

// CLASS PRODUCTOS
class Producto {
    constructor (id, nombre, precio, img){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1;
    }
}

// PRODUCTOS EN VENTA
const mate = new Producto (1, "Mate", 1500, "img/mate.png");
const cuenco = new Producto (2, "Cuenco", 900, "img/cuenco.png");
const portasahumerio = new Producto (3, "Portasahumerio", 750, "img/portasahumerio.png");
const tabla = new Producto (4, "Tabla", 1800, "img/tabla.png");
const cuchara = new Producto (5, "Cuchara", 600, "img/cuchara.png");
const yerbera = new Producto (6, "Yerbera", 1100, "img/yerbera.png");

// ARRAY CATALOGO DE PRODUCTOS
const productos = [mate, cuenco, portasahumerio, tabla, cuchara, yerbera];

// CARRITO VACIO
let carrito = [];
   // localStorage
   if(localStorage.getItem("carrito")){
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

// MODIFICAMOS EL DOM MOSTRANDO LOS PRODUCTOS
const contenedorProductos = document.getElementById("contenedorProductos");

// FUNCION PARA MOSTRAR LOS PRODUCTOS
const mostrarProductos = () => {
    productos.forEach( producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-4", "col-md-6", "col-xs-12");
        card.innerHTML = ` <div class="card"> 
                             <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}"> 
                                  <div class="card-body card-div">
                                       <h5> ${producto.nombre} </h5>
                                       <p> $${producto.precio}</p>
                                       <button class="btn btn-outline-info colorBoton" id="boton${producto.id}"> Agregar al carrito </button> 
                                  </div>                     
                           </div>`
        contenedorProductos.appendChild(card);           
        
          // Agregar productos al carrito
          const boton = document.getElementById(`boton${producto.id}`);
          boton.addEventListener("click", () => {
            agregarAlCarrito(producto.id);
          })    
    })
}

mostrarProductos();

// FUNCION AGREGAR AL CARRITO
const agregarAlCarrito = (id) => {
    const productoEnCarrito = carrito.find(producto => producto.id === id);
    if(productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        const producto = productos.find (producto => producto.id === id);
        carrito.push(producto);
              // localStorage
              localStorage.setItem("carrito", JSON.stringify(carrito));
    }
}

// MOSTRAR EL CARRITO DE COMPRAS
const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
})

// FUNCION PARA MOSTRAR EL CARRITO: 
const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = ""; 
 
   carrito.forEach(producto => {
     const card = document.createElement("div");
     card.classList.add("col-xl-4", "col-md-6", "col-xs-12");
     card.innerHTML = ` <div class="card"> 
                          <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}"> 
                               <div class="card-body">
                                    <h5> ${producto.nombre} </h5>
                                    <p> ${producto.precio}</p>
                                    <p> ${producto.cantidad}</p>
                                    <button class="btn colorBoton" id="eliminar${producto.id}" > Eliminar producto </button> 
                               </div>                     
                        </div>`
 
     contenedorCarrito.appendChild(card);
 
     // eliminar productos del carrito:
     const boton = document.getElementById(`eliminar${producto.id}`);
     boton.addEventListener("click", () => {
         eliminarDelCarrito(producto.id); 
     })  
   }) 
   calcularTotal();
 }
 
 // FUNCION PARA ELIMINAR EL PRODUCTO:
 const eliminarDelCarrito = (id) => {
  const producto = carrito.find (producto => producto.id === id);
  const indice = carrito.indexOf(producto);
  carrito.splice(indice,1);
  mostrarCarrito();
     // localStorage
      localStorage.setItem("carrito", JSON.stringify("carrito"));
 }
 
 // VACIAR TODO EL CARRITO
 const vaciarCarrito = document.getElementById("vaciarCarrito");
 vaciarCarrito.addEventListener("click", () => {
     eliminarTodoElCarrito();
 })
 
 // FUNCION QUE ELIMINAR TODO DEL CARRITO:
 const eliminarTodoElCarrito = () => {
     carrito = [];
     mostrarCarrito();
       // localStorage
       localStorage.clear();
 }

 // TOTAL DE LA COMPRA
const total = document.getElementById("total");
const calcularTotal = () => {
    let totalCompra = 0;
    carrito.forEach(producto => {
        totalCompra += producto.precio * producto.cantidad;
    })
    total.innerHTML = `$${totalCompra}`;
}



 
   
