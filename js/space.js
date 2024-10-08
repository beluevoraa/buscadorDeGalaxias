document.getElementById('btnBuscar').addEventListener('click', function () {
    const query = document.getElementById('inputBuscar').value.trim();
  
    if (query === "") {
      alert("Por favor, ingresa un término de búsqueda.");
      return;
    }
  
    const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const contenedor = document.getElementById('contenedor');
        contenedor.innerHTML = "";  // Limpiar el contenedor antes de mostrar los resultados
  
        const items = data.collection.items;
  
        if (items.length === 0) {
          contenedor.innerHTML = "<p>No se encontraron resultados.</p>";
          return;
        }
  
        // Crear un row cada tres elementos
        let row;
        items.forEach((item, index) => {
          const { title, description, date_created } = item.data[0];
          const imageUrl = item.links ? item.links[0].href : 'https://via.placeholder.com/150';  // Placeholder en caso de que no haya imagen disponible
  
          // Iniciar una nueva fila cada tres tarjetas
          if (index % 3 === 0) {
            row = document.createElement('div');
            row.classList.add('row', 'mb-4');
            contenedor.appendChild(row);
          }
  
          // Crear la tarjeta
          const card = document.createElement('div');
          card.classList.add('col-lg-4', 'col-md-6', 'mb-4');  // Tres en compus, una en móviles
          card.innerHTML = `
            <div class="card h-100">
              <img src="${imageUrl}" class="card-img-top" alt="${title}">
              <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${description ? description : "Sin descripción disponible."}</p>
              </div>
              <div class="card-footer">
                <small class="text-muted">Fecha: ${new Date(date_created).toLocaleDateString()}</small>
              </div>
            </div>
          `;
  
          // Añadir la tarjeta a la fila actual
          row.appendChild(card);
        });
      })
      .catch(error => {
        console.error('Error al obtener los datos de la API:', error);
        document.getElementById('contenedor').innerHTML = "<p>Hubo un error al cargar las imágenes. Inténtalo nuevamente más tarde.</p>";
      });
  });
  