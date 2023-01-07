let numeroProducto = 0;
let listaProductosTienda = "";
let indiceProducto = null;
let cantidadPedida = 0;
let existeStock = false;
let metodoPagoEligdo = "";
let descripcionMetodoPago = "";
let nombreCliente = "";
let numeroCuentaCliente = 0;
let direccionCliente = "";
let realizoPago = false;
let realizoCompra = false;
let canceloCompra = false;
let actualizoStock = false;
let deseaVolverComprar = false;
let total = 0;
let precioProducto = 0;
let descripcionProducto = "";
let metodosPago = [{
    id : 1,
    metodo : "Debito",
},{
    id : 2,
    metodo : "Credito",
},{
    id : 3,
    metodo : "Contra entrega",
}];
let productos = [{
    id : 1,
    producto : "Alarmas",
    precio : 15,
    stock : 50,
  },{
    id : 2,
    producto : "Escopeta",
    precio : 34,
    stock : 30,
  },{
    id : 3,
    producto : "Binocular",
    precio : 24,
    stock : 45,
  }];
alert("Bienvenido a Tienda Mackalister");
while(realizoCompra == false){
    //mostrar listad de productos
    listaProductosTienda = obtenerProductos(productos);
    numeroProducto = prompt("Escoja el producto que quiera comprar: " + listaProductosTienda + "\n\nEscriba el numero del producto que quiera comprar:");
    if(numeroProducto == null){
        break;
    }
    else{
        indiceProducto = consultarProducto(numeroProducto, productos);
        if(indiceProducto == null){
            alert("ERROR: No existe el producto seleccionado.");
        }
        else{
            cantidadPedida = prompt("Ingrese cantidad deseada del producto: ");
            existeStock = consultarStock(cantidadPedida, numeroProducto, productos);
            while(existeStock == false){
                alert("ERROR: Ingrese una cantidad correcta dentro del stock del producto seleccionado.");
                cantidadPedida= prompt("Ingrese cantidad deseada del producto: ");
                existeStock = consultarStock(cantidadPedida, numeroProducto, productos);
            }
            metodoPagoEligdo = prompt("Escriba el numero del metodo de pago que quiera hacer: \n1.Debito \n2.Credito \n3.Contra entrega");
            descripcionMetodoPago = consultarMetodoPago(metodoPagoEligdo, metodosPago);
            if(metodoPagoEligdo != null){
                while(descripcionMetodoPago == ""){
                    alert("ERROR: Este metodo de pago no existe");
                    metodoPagoEligdo = prompt("Escriba el numero del metodo de pago que quiera hacer: \n1.Debito \n2.Credito \n3.Contra entrega");
                    descripcionMetodoPago = consultarMetodoPago(metodoPagoEligdo, metodosPago);
                }
                if(descripcionMetodoPago != "debito" && descripcionMetodoPago != "credito"){
                    nombreCliente = prompt("Escriba su nombre: ");
                    direccionCliente = prompt("Escriba su direccion de domicilio: ");
                    while(nombreCliente == "" || nombreCliente == null || direccionCliente == "" || direccionCliente == null){
                        alert("ERROR: Hay campos vacios");
                        if(descripcionMetodoPago != "debito" && descripcionMetodoPago != "credito"){
                            nombreCliente = prompt("Escriba su nombre: ");
                            direccionCliente = prompt("Escriba su direccion de domicilio: ");
                        }
                    }
                }
                else{
                    nombreCliente = prompt("Escriba su nombre: ");
                    numeroCuentaCliente = prompt("Escriba el numero de su cuenta bancaria: ");
                    direccionCliente = prompt("Escriba su direccion de domicilio: ");
                    while(nombreCliente == "" || nombreCliente == null || direccionCliente == "" || direccionCliente == null || numeroCuentaCliente == "" || numeroCuentaCliente == null){
                        nombreCliente = prompt("Escriba su nombre: ");
                            numeroCuentaCliente = prompt("Escriba el numero de su cuenta bancaria: ");
                            direccionCliente = prompt("Escriba su direccion de domicilio: ");
                    }                       
                }
                descripcionProducto = productos[indiceProducto].producto
                precioProducto = productos[indiceProducto].precio;
                total = precioProducto * cantidadPedida; 
                realizoPago = confirm("************** FACTURA ELECTRONICA **************" + "\n\nNombre: " +  nombreCliente + "\nDireccion de domicilio: " + direccionCliente + "\nProductos Comprados: " + descripcionProducto + "\nCantidad de productos comprados: " + cantidadPedida + "\nPrecio del producto: S/. " + parseFloat(precioProducto) +"\nMetodo de Pago: " + descripcionMetodoPago + "\nTotal: S/. " + total + "\n*******************************************************");
                while(realizoPago == false && canceloCompra == false){
                    canceloCompra = confirm("Esta seguro de cancelar su compra?");
                    if(canceloCompra == false){
                        realizoPago = confirm("************** FACTURA ELECTRONICA **************" + "\n\nNombre: " + nombreCliente + "\nDireccion de domicilio: " + direccionCliente + "\nProductos Comprados: " + descripcionProducto + "\nCantidad de productos comprados: " + cantidadPedida + "\nPrecio del producto: S/. " + parseFloat(precioProducto) +"\nMetodo de Pago: " + descripcionMetodoPago + "\nTotal: S/. " + total + "\n*******************************************************");
                    }
                }
                if(realizoPago == true){
                    alert("Gracias por su compra Sr(a): " + nombreCliente);
                    actualizoStock = actualizarStockProducto(cantidadPedida, indiceProducto, productos);
                    deseaVolverComprar = confirm("Desea comprar otro producto?");
                    if(deseaVolverComprar == false){
                        realizoCompra = true;
                    }
                }
            }            
        }
    }
}



function obtenerProductos(productos){
    let listaProductos = "";
    for(let i=0;i<productos.length;i++){
        listaProductos += "\n" + String(productos[i].id) + ". " + productos[i].producto + " Precio: " + String(productos[i].precio) + " Stock: " + String(productos[i].stock);
    }
    return listaProductos;
}
function consultarProducto(numeroProducto, productos){
    let indice = null;
    for(let i=0;i<productos.length;i++){
        if(productos[i].id == numeroProducto){
            indice = i;
            break;
        }
    }
    return indice;
}
function consultarStock(cantidadPedida, numeroProducto, productos){
    let encontroStock = false;
    console.log(cantidadPedida);
    if(cantidadPedida == null){
        cantidadPedida = 0;
    }
    for(let i=0;i<productos.length;i++){
        if(productos[i].id == numeroProducto){
            if(cantidadPedida>0 && cantidadPedida<productos[i].stock){
                encontroStock = true;
                break;
            }
            break
        }
    }
    return encontroStock;
}
function consultarMetodoPago(metodoPagoEligdo, metodosPago){
    let tipoPago = "";
    for(let i=0;i<metodosPago.length;i++){
        if(metodosPago[i].id == metodoPagoEligdo){
            tipoPago= metodosPago[i].metodo;
            break;
        }
    }
    return tipoPago
}
function actualizarStockProducto(cantidadPedida, indiceProducto, productos){
    let actualizacionExitosa = false;
    let nuevoStock = 0;
    nuevoStock = productos[indiceProducto].stock - cantidadPedida;
    if(nuevoStock >= 0){
        productos[indiceProducto].stock = nuevoStock;
        actualizacionExitosa = true;
    }
    return actualizacionExitosa;
}