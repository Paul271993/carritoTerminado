
window.onload = function () {
          
    let baseDeDatos = [
        {
            id: 1,
            nombre: 'Zapatos',
            descripcion: 'Te quedarán de puta madre.',
            precio: 50.00,
            imagen: 'zapatos.jpg'
        },
        {
            id: 2,
            nombre: 'Pantalones',
            descripcion: 'Te harán tener un culito invidiable.',
            precio: 30.00,
            imagen: 'pantalones.jpg'
        },
        {
            id: 3,
            nombre: 'Mascarillas',
            descripcion: 'Así se nota menos lo fe@ que eres.',
            precio: 15.00,
            imagen: 'mascarillas.jpg'
        },
       
      ];
    let $items = document.querySelector('#items');
    let carrito = [];
    let total = 0;
    let $carrito = document.querySelector('#carrito');
    let $total = document.querySelector('#total');
    

   
    function renderizarProductos() {
        for (let info of baseDeDatos) {
           
            let miNodo = document.createElement('div');
            miNodo.classList.add('card', 'col-sm-4');
          
            let miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('card-body');
         
            let miNodoTitle = document.createElement('h5');
            miNodoTitle.classList.add('card-title');
            miNodoTitle.textContent = info['nombre'];

            let miNodoDescripcion = document.createElement('h6');
            miNodoDescripcion.classList.add('card-text');
            miNodoDescripcion.textContent = info['descripcion'];
        
            let miNodoImagen = document.createElement('img');
            miNodoImagen.classList.add('img-fluid');
            miNodoImagen.setAttribute('src', info['imagen']);
     
            let miNodoPrecio = document.createElement('p');
            miNodoPrecio.classList.add('card-text');
            miNodoPrecio.textContent = info['precio'] + '€';
       
            let miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('btn', 'btn-dark');
            miNodoBoton.textContent = '+';
            miNodoBoton.setAttribute('marcador', info['id']);
            miNodoBoton.addEventListener('click', anyadirCarrito);
          
            miNodoCardBody.appendChild(miNodoImagen);
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoDescripcion)
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoBoton);
            miNodo.appendChild(miNodoCardBody);
            $items.appendChild(miNodo);
        }
    }

    function anyadirCarrito () {
        
        carrito.push(this.getAttribute('marcador'))
        
        calcularTotal();
       
        renderizarCarrito();
    }

    function renderizarCarrito() {
        
        $carrito.textContent = '';
      
        let carritoSinDuplicados = [...new Set(carrito)];
       
        carritoSinDuplicados.forEach(function (item, indice) {
           
            let miItem = baseDeDatos.filter(function(itemBaseDatos) {
                return itemBaseDatos['id'] == item;
            });
           
            let numeroUnidadesItem = carrito.reduce(function (total, itemId) {
                return itemId === item ? total += 1 : total;
            }, 0);
          
            let miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right');
            miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0]['nombre']} - ${miItem[0]['precio']}€`;
           
            let miBoton = document.createElement('button');
           
            miBoton.setAttribute('item', item);
           
            $carrito.appendChild(miNodo);
        })
    }

    

    function calcularTotal() {
       
        total = 0;
      
        for (let item of carrito) {
          
            let miItem = baseDeDatos.filter(function(itemBaseDatos) {
                return itemBaseDatos['id'] == item;
            });
            total = total + miItem[0]['precio'];
        }
     
        let totalDosDecimales = total.toFixed(2);
       
        $total.textContent = totalDosDecimales;
    }

    renderizarProductos();
}