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
let deseaAgregarMasProductos = false;
let detalleFactura = "";
let nuevaCantidadPedida = 0;
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

let carritoDeCompras = [];
let objCliente;
let objProducto;

class Persona {
    constructor(nombre, numeroCuenta, direccion){
        this.nombre = nombre;
        this.numeroCuenta = numeroCuenta;
        this.direccion = direccion;
    }
}

class Productos {
    constructor(id, producto, precio, stock, cantidadPedida){
        this.id = id;
        this.producto = producto;
        this.precio = precio;
        this.stock = stock;
        this.cantidadPedida = cantidadPedida;
    }
    calcularSubTotal(){
        return this.precio * this.cantidadPedida;
    }
    actualizarCantidadPedida(cantidadPedida){
        let nuevaCantidadPedida = 0;
        if(cantidadPedida > 0){
            if((parseInt(this.cantidadPedida) + parseInt(cantidadPedida)) <= this.stock){
                nuevaCantidadPedida = parseInt(this.cantidadPedida) + parseInt(cantidadPedida);
                this.cantidadPedida = nuevaCantidadPedida;
            }
        }
        return nuevaCantidadPedida;
    }

}
let producto1 = new Productos(1, "Alarmas", 15, 50, 0);
let producto2 = new Productos(2, "Escopeta", 34, 30, 0);
let producto3 = new Productos(3, "Binocular", 24, 45, 0);

let productos = [producto1,producto2,producto3];

alert("Bienvenido a Tienda Mackalister");
realizarCompra()

function realizarCompra(){
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
                objProducto = productos.find((objProducto) => objProducto.id == numeroProducto);
                console.log("objProducto: " + objProducto);
                nuevaCantidadPedida = objProducto.actualizarCantidadPedida(cantidadPedida);
                console.log("nuevaCantidadPedida: " + nuevaCantidadPedida);
                if(nuevaCantidadPedida != 0){
                    existeStock = true;
                    agregarAlCarrito(numeroProducto, nuevaCantidadPedida, carritoDeCompras);
                    deseaAgregarMasProductos = confirm("Desea agregar otro producto al carrito.");
                    if(deseaAgregarMasProductos == false){
                        metodoPagoEligdo = prompt("Escriba el numero del metodo de pago que quiera hacer: \n1.Debito \n2.Credito \n3.Contra entrega");
                        descripcionMetodoPago = consultarMetodoPago(metodoPagoEligdo, metodosPago);
                        if(metodoPagoEligdo != null){
                            while(descripcionMetodoPago == ""){
                                alert("ERROR: Este metodo de pago no existe");
                                metodoPagoEligdo = prompt("Escriba el numero del metodo de pago que quiera hacer: \n1.Debito \n2.Credito \n3.Contra entrega");
                                descripcionMetodoPago = consultarMetodoPago(metodoPagoEligdo, metodosPago);
                            }
                            if(descripcionMetodoPago != "Debito" && descripcionMetodoPago != "Credito"){
                                nombreCliente = prompt("Escriba su nombre: ");
                                direccionCliente = prompt("Escriba su direccion de domicilio: ");
                                objCliente = new Persona(nombreCliente,"",direccionCliente);
                                while(nombreCliente == "" || nombreCliente == null || direccionCliente == "" || direccionCliente == null){
                                    alert("ERROR: Hay campos vacios");
                                    if(descripcionMetodoPago != "debito" && descripcionMetodoPago != "credito"){
                                        nombreCliente = prompt("Escriba su nombre: ");
                                        direccionCliente = prompt("Escriba su direccion de domicilio: ");
                                        objCliente = new Persona (nombreCliente,"", direccionCliente);
                                    }
                                }
                            }
                            else{
                                nombreCliente = prompt("Escriba su nombre: ");
                                numeroCuentaCliente = prompt("Escriba el numero de su cuenta bancaria: ");
                                direccionCliente = prompt("Escriba su direccion de domicilio: ");
                                objCliente = new Persona (nombreCliente, numeroCuentaCliente, direccionCliente);
                                while(nombreCliente == "" || nombreCliente == null || direccionCliente == "" || direccionCliente == null || numeroCuentaCliente == "" || numeroCuentaCliente == null){
                                    nombreCliente = prompt("Escriba su nombre: ");
                                        numeroCuentaCliente = prompt("Escriba el numero de su cuenta bancaria: ");
                                        direccionCliente = prompt("Escriba su direccion de domicilio: ");
                                        objCliente =  new Persona (nombreCliente, numeroCuentaCliente, direccionCliente);
                                }                       
                            }
                            detalleFactura = mostrarDetalleFactura(carritoDeCompras, objCliente, descripcionMetodoPago);
                            realizoPago = confirm(detalleFactura);
                            while(realizoPago == false && canceloCompra == false){
                                canceloCompra = confirm("Esta seguro de cancelar su compra?");
                                if(canceloCompra == false){
                                    realizoPago = confirm(detalleFactura);
                                }
                            }
                            if(realizoPago == true){
                                alert("Gracias por su compra Sr(a): " + nombreCliente);
                                actualizoStock = actualizarStockProducto(carritoDeCompras, productos);
                                deseaVolverComprar = confirm("Desea comprar otro producto?");
                                if(deseaVolverComprar == false){
                                    realizoCompra = true;
                                }else{
                                    carritoDeCompras = [];
                                }
                            }
                        } 
                    }       
                }
                else{
                    existeStock = false;
                    alert("Cantidad incorrecta o no hay stock del producto, seleccione otro producto.");
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
function actualizarStockProducto(carritoDeCompras, productos){
    let actualizacionExitosa = false;
    for (const objProducto of productos) {
        let nuevoStock = 0;
        let objProductoCarritoCompra = carritoDeCompras.find((objProductoCC) => objProductoCC.id == objProducto.id);
        if(objProductoCarritoCompra != null){
            nuevoStock = objProductoCarritoCompra.stock - objProductoCarritoCompra.cantidadPedida; 
            objProducto.stock = nuevoStock;
            objProducto.cantidadPedida = 0;
        }
    }
    actualizacionExitosa = true;
    
    return actualizacionExitosa;
}
function agregarAlCarrito(numeroProducto, cantidadPedida, carritoDeCompras){
    let objProductoCarritoCompra = carritoDeCompras.find((objProducto) => objProducto.id == numeroProducto);
    if(objProductoCarritoCompra == null){
        let objProductoAgregar = productos.find((objProducto) => objProducto.id == numeroProducto);
        objProductoAgregar.cantidadPedida = cantidadPedida;
        carritoDeCompras.push(objProductoAgregar);
    }
    else{
        for (const objProducto of carritoDeCompras) {
            if(objProducto.id == numeroProducto){
                objProducto.cantidadPedida = cantidadPedida;
                break;
            }
        }
    }
    
}

function mostrarDetalleFactura(carritoDeCompras, cliente, descripcionMetodoPago){
    let total = 0;
    let facturaElectronica = "************** FACTURA ELECTRONICA **************";
    facturaElectronica = facturaElectronica + "\n\nNombre: " + cliente.nombre + "\nDireccion de domicilio: " + cliente.direccion;
    for(const objProducto of carritoDeCompras){
        facturaElectronica = facturaElectronica + "\nProductos Comprados: " + objProducto.producto + "\nCantidad de productos comprados: " + objProducto.cantidadPedida + "\nPrecio del producto: S/. " + parseFloat(objProducto.precio);
    }
    total = carritoDeCompras.reduce((acumulador, objProducto) => acumulador + objProducto.calcularSubTotal(), 0)
    facturaElectronica = facturaElectronica + "\nMetodo de Pago: " + descripcionMetodoPago + "\nTotal: S/. " + total + "\n*******************************************************";
    return(facturaElectronica);
}

