    // Informacion de contacto para la pagina
    const EMPRESA = {
      telefono: "+504 3346-5918",
      tel_link: "tel:+50433465918",
      whatsapp: "https://wa.me/50499990000",
    };

    // Apartado de Carros para mostrar en el catalogo
    const VEHICULOS = [
      {
        id: 1,
        marca: "Ford",
        modelo: "Explorer",
        trim: "XLT",
        anio: 2018,
        km: "32,000 km",
        precio: "L.300,000",
        estado: "disponible",
        unit_condition: "Recien ingresado",
        tipo: "suv",
        is_featured_unit: true,
        fechaIngreso: "2026-04-20",
        thumb_preview: "Fotos/Render explorer 2018.png", // Imagen para el catalogo (afuera)
        // Imágenes múltiples 
        gallery_assets: [
          "Fotos/Explorer 3.jpeg",
          "Fotos/explorer 4.jpeg"
        ],
        feature_tags: ["Importado", "Poco Kilometraje", "Cuero"],
        unit_description: "Ford Explorer 2018 XLT importada directamente. Excelente estado, 3 filas de asientos, todos los servicios al día. Equipada con sistema de sonido premium y asientos de cuero.",
        tech_specs: {
          "Motor": "4.0L V6 270hp",
          "Transmisión": "Automática 6vel",
          "Combustible": "Gasolina",
          "Tracción": "4WD",
          "Color": "Gris",
          "Asientos": "7 pasajeros",
        }
      },
      {
        id: 2,
        marca: "Jeep",
        modelo: "Wrangler",
        trim: "JK",
        anio: 2008,
        km: "",
        precio: "$278,000",
        estado: "disponible",
        unit_condition: "nuevo",
        tipo: "Todoterreno",
        is_featured_unit: true,

        fechaIngreso: "2026-04-10",
        thumb_preview: "Fotos/Render jeep 2008.png",
        gallery_assets: [
          "Fotos/JP 2008.png"
        ],
        feature_tags: ["No lo defino aun", "No definido", ""],
        unit_description: "No definido aun.",
        tech_specs: {
          "Motor": "3.8L V6",
          "Transmisión": "Automática",
          "Combustible": "Gasolina",

          "Color": "Blanco",
          "Asientos": "5 pasajeros",
        }
      },
      {
        id: 3,
        marca: "Ford",
        modelo: "Explorer",
        trim: "Limited",
        anio: 2012,
        km: "55,000 km",
        precio: "$33,800",
        estado: "disponible",
        unit_condition: "usado",
        tipo: "pickup",
        is_featured_unit: true,
        thumb_preview: "Fotos/exp negra.png",
        gallery_assets: [
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
        ],
        feature_tags: ["4x4", "Diésel", "Todo Terreno"],
        unit_description: "Pick-up de trabajo ideal para terrenos difíciles. Motor diésel de alto torque, estado mecánico impecable. Perfecta para campo y ciudad.",
        tech_specs: {
          "Motor": "2.8L Diesel 204hp",
          "Transmisión": "Manual 6vel",
          "Combustible": "Diésel",
          "Tracción": "4x4",
          "Color": "Gris Plata",
          "Asientos": "5 pasajeros",
        }
      },
      {
        id: 4,
        marca: "Hyundai",
        modelo: "Elantra",
        
        anio: 2018,
        km: "12,000 km",
        precio: "$28,500",
        estado: "disponible",
        unit_condition: "nuevo",
        tipo: "suv",
        is_featured_unit: true,
        thumb_preview: "Fotos/Elantra render.png",
        gallery_assets: [
          "https://images.unsplash.com/photo-1617886322168-72b886573c35?w=800&q=80",
          "https://images.unsplash.com/photo-1617886322207-6b45f1b1c34a?w=800&q=80"
        ],
        feature_tags: ["AWD", "Techo Panorámico", "N-Line"],
        unit_description: "SUV compacta vanguardista con acabados deportivos N-Line. Techo solar panorámico, asientos calefaccionados, cargador inalámbrico.",
        tech_specs: {
          "Motor": "1.6L Turbo 178hp",
          "Transmisión": "DCT 7vel",
          "Combustible": "Gasolina",
          "Tracción": "AWD",
          "Color": "Negro Onyx",
          "Asientos": "5 pasajeros",
        }
      },
      {
        id: 5,
        marca: "Mercury",
        modelo: "Mariner",
        
        anio: 2009,
        km: "12,000 km",
        precio: "$28,500",
        estado: "disponible",
        unit_condition: "nuevo",
        tipo: "suv",
        is_featured_unit: true,
        thumb_preview: "Fotos/mercury render.png",
        gallery_assets: [
          "https://images.unsplash.com/photo-1617886322168-72b886573c35?w=800&q=80",
          "https://images.unsplash.com/photo-1617886322207-6b45f1b1c34a?w=800&q=80"
        ],
        feature_tags: ["AWD", "Techo Panorámico", "N-Line"],
        unit_description: "SUV compacta vanguardista con acabados deportivos N-Line. Techo solar panorámico, asientos calefaccionados, cargador inalámbrico.",
        tech_specs: {
          "Motor": "1.6L Turbo 178hp",
          "Transmisión": "DCT 7vel",
          "Combustible": "Gasolina",
          "Tracción": "AWD",
          "Color": "Negro Onyx",
          "Asientos": "5 pasajeros",
        }
      },
      {
        id: 6,
        marca: "Jeep",
        modelo: "Wrangler",
        
        anio: 1999,
        km: "12,000 km",
        precio: "$28,500",
        estado: "disponible",
        unit_condition: "nuevo",
        tipo: "suv",
        is_featured_unit: true,
        thumb_preview: "Fotos/jeep 1999.png",
        gallery_assets: [
          "https://images.unsplash.com/photo-1617886322168-72b886573c35?w=800&q=80",
          "https://images.unsplash.com/photo-1617886322207-6b45f1b1c34a?w=800&q=80"
        ],
        feature_tags: ["AWD", "Techo Panorámico", "N-Line"],
        unit_description: "SUV compacta vanguardista con acabados deportivos N-Line. Techo solar panorámico, asientos calefaccionados, cargador inalámbrico.",
        tech_specs: {
          "Motor": "1.6L Turbo 178hp",
          "Transmisión": "DCT 7vel",
          "Combustible": "Gasolina",
          "Tracción": "AWD",
          "Color": "Negro Onyx",
          "Asientos": "5 pasajeros",
        }
      },
    ];

    // Arreglo de entregas exitosas
    const ENTREGAS = [
      {
        id: 1,
        imagen: "Fotos/Clientes/1.jpeg", 
        titulo: "",
        vehiculo: "Kia Sorento"
      },
      {
        id: 2,
        imagen: "Fotos/Clientes/2.jpeg", 
        titulo: "",
        vehiculo: "Hyundai Elantra"
      },
      {
        id: 3,
        imagen: "Fotos/Clientes/3.jpeg", 
        titulo: "",
        vehiculo: "Honda CRV"
      },
      {
        id: 4,
        imagen: "Fotos/Clientes/4.jpeg", 
        titulo: "",
        vehiculo: "Ford Escape "
      },
      {
        id: 5,
        imagen: "Fotos/Clientes/5.jpeg", 
        titulo: "",
        vehiculo: "Ford Escape "
      },
      {
        id: 6,
        imagen: "Fotos/Clientes/6.jpeg", 
        titulo: "",
        vehiculo: "Ford Escape "
      },
      {
        id: 7,
        imagen: "Fotos/Clientes/7.jpeg", 
        titulo: "",
        vehiculo: "Ford Escape "
      },
      {
        id: 8,
        imagen: "Fotos/Clientes/8.jpeg", 
        titulo: "",
        vehiculo: "Ford Escape "
      },
      {
        id: 9,
        imagen: "Fotos/Clientes/9.jpeg", 
        titulo: "",
        vehiculo: "Ford Escape "
      },
    ];

    // apartado de testimonios de clientes
    const TESTIMONIOS = [
      {
        id: 1,
        nombre: "Betsai Aguilar",
        fecha: "12:45 PM",
        mensaje: "100% recomendados!! Realizaron un excelente trabajo de principio a fin, son personas super responsables, confiables y con un gran don de servicio, el carro quedo excelente!"
      },
      {
        id: 2,
        nombre: "Alberto Lopez",
        fecha: "09:30 AM",
        mensaje: "Totalmente recomendados. Excelente asesoramiento, transparencia en cada etapa del proceso, para brindar la confianza en tu inversion."
      },
      {
        id: 3,
        nombre: "Luis Fernando",
        fecha: "Ayer",
        mensaje: "Total transparencia desde el inicio. El Jeep está como nuevo. Definitivamente volveré a comprar con ustedes."
      }
    ];
