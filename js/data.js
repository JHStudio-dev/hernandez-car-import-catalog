    // Informacion de contacto para la pagina
    const EMPRESA = {
      telefono: "+504 3213-6000",
      tel_link: "tel:+50432136000",
      whatsapp: "https://wa.me/50432136000",
    };

    // Carros para mostrar en el catalogo.
    //
    // Para agregar un vehículo: copia la plantilla de abajo y complétala.
    // - No inventes datos: deja "" o "Por confirmar" en lo que no sepas todavía.
    // - "tipo" debe ser uno de: "suv" | "sedan" | "pickup" | "todoterreno" (en minúsculas).
    // - "is_featured_unit: true" hace que el auto salga en el carrusel del inicio.
    /*
      {
        id: 13,                              // número único
        marca: "", modelo: "", trim: "",
        anio: 2020, km: "", precio: "",
        estado: "disponible",                // disponible | reservado | vendido
        unit_condition: "usado",             // nuevo | usado
        tipo: "suv",
        is_featured_unit: false,
        thumb_preview: "Fotos/portada.png",  // imagen de la tarjeta
        gallery_assets: ["Fotos/foto1.jpeg"],// fotos del detalle
        feature_tags: ["", "", ""],          // etiquetas cortas (se ignoran las vacías)
        unit_description: "",
        tech_specs: {
          "Motor": "", "Transmisión": "", "Combustible": "Gasolina",
          "Tracción": "", "Color": "", "Asientos": ""
        }
      },
    */
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
        intake_date: "2026-04-20",
        thumb_preview: "Fotos/Render explorer 20181.png", // Imagen para el catalogo (afuera)
        // Imágenes múltiples (paths locales o URLs)
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
        tipo: "todoterreno",
        is_featured_unit: true,

        intake_date: "2026-04-10",
        thumb_preview: "Fotos/Render jeep 20081.png",
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
        km: "185,000 Millas",
        precio: "L.189,000",
        estado: "disponible",
        unit_condition: "usado",
        tipo: "suv",
        is_featured_unit: true,
        thumb_preview: "Fotos/Exp negra1.png",
        gallery_assets: [
          "Fotos/Explorer limited/2.jpeg",
          "Fotos/Explorer limited/1.jpeg",
          "Fotos/Explorer limited/3.jpeg",
          "Fotos/Explorer limited/4.jpeg"
        ],
        feature_tags: ["4x4", "v6", "Techo panoramico"],
        unit_description: "Ford explorer 2012 limited, motor 3.5 v6 4x4, techo panoramico, Luces HDI, 3 filas de asientos, encendido push button, sistema de sonido premium, asientos de cuero, Rines #20.",
        tech_specs: {
          "Motor": "3.5 V6",
          "Transmisión": "Automatica",
          "Combustible": "Gasolina",
          "Tracción": "4x4",
          "Color": "Negro",
          "Asientos": "7 pasajeros",
        }
      },
      {
        id: 4,
        marca: "Bmw",
        modelo: "X3",
        trim: "Turbo",
        anio: 2018,
        km: "12,000 km",
        precio: "$28,500",
        estado: "disponible",
        unit_condition: "nuevo",
        tipo: "suv",
        is_featured_unit: true,
        thumb_preview: "Fotos/bmw.png",
        gallery_assets: [
          "https://images.unsplash.com/photo-1617886322168-72b886573c35?w=800&q=80",
          "https://images.unsplash.com/photo-1617886322207-6b45f1b1c34a?w=800&q=80"
        ],
        feature_tags: ["AWD", "Techo Panorámico", "N-Line"],
        unit_description: "SUV compacta vanguardista con acabados deportivos N-Line. Techo solar panorámico, asientos calefaccionados, cargador inalámbrico.",
        tech_specs: {
          "Motor": "2.0 TURBO",
          "Transmisión": "DCT 7vel",
          "Combustible": "Gasolina",
          "Tracción": "AWD",
          "Color": "Rojo",
          "Asientos": "5 pasajeros",
        }
      },
      {
        id: 5,
        marca: "Honda",
        modelo: "CRV",
        
        anio: 2016,
        km: "12,000 km",
        precio: "$28,500",
        estado: "disponible",
        unit_condition: "nuevo",
        tipo: "suv",
        is_featured_unit: true,
        thumb_preview: "Fotos/Crv 2016.png",
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
        tipo: "todoterreno",
        is_featured_unit: true,
        thumb_preview: "Fotos/Jeep 19991.png",
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
        id: 7,
        marca: "Hyundai",
        modelo: "Elantra",
        
        anio: 2018,
        km: "12,000 km",
        precio: "$28,500",
        estado: "disponible",
        unit_condition: "nuevo",
        tipo: "sedan",
        is_featured_unit: true,
        thumb_preview: "Fotos/Elantra render (1).png",
        gallery_assets: [
          "https://images.unsplash.com/photo-1617886322168-72b886573c35?w=800&q=80",
          "https://images.unsplash.com/photo-1617886322207-6b45f1b1c34a?w=800&q=80"
        ],
        feature_tags: ["AWD", "Techo Panorámico", "N-Line"],
        unit_description: "SUV compacta vanguardista con acabados deportivos N-Line. Techo solar panorámico, asientos calefaccionados, cargador inalámbrico.",
        tech_specs: {
          "Motor": "2.0",
          "Transmisión": "DCT 7vel",
          "Combustible": "Gasolina",
          "Tracción": "AWD",
          "Color": "Negro Onyx",
          "Asientos": "5 pasajeros",
        }
      },
      {
        id: 8,
        marca: "Ford",
        modelo: "Explorer",
        trim: "XLT",
        anio: 2012,
        km: "12,000 km",
        precio: "$28,500",
        estado: "disponible",
        unit_condition: "nuevo",
        tipo: "suv",
        is_featured_unit: true,
        thumb_preview: "Fotos/explorer k.png",
        gallery_assets: [
          "https://images.unsplash.com/photo-1617886322168-72b886573c35?w=800&q=80",
          "https://images.unsplash.com/photo-1617886322207-6b45f1b1c34a?w=800&q=80"
        ],
        feature_tags: ["AWD", "Techo Panorámico", "N-Line"],
        unit_description: "SUV compacta vanguardista con acabados deportivos N-Line. Techo solar panorámico, asientos calefaccionados, cargador inalámbrico.",
        tech_specs: {
          "Motor": "3.5 V6",
          "Transmisión": "DCT 7vel",
          "Combustible": "Gasolina",
          "Tracción": "4X4",
          "Color": "Negro Onyx",
          "Asientos": "5 pasajeros",
        }
      },
       {
        id: 9,
        marca: "Jeep",
        modelo: "Compass",
        trim: "",
        anio: 2017,
        km: "12,000 km",
        precio: "$28,500",
        estado: "disponible",
        unit_condition: "nuevo",
        tipo: "suv",
        is_featured_unit: true,
        thumb_preview: "Fotos/jeep che.png",
        gallery_assets: [
          "Fotos/Jeep/1.jpeg",
          "Fotos/Jeep/2.jpeg",
          "Fotos/Jeep/3.jpeg"
        ],
        feature_tags: ["AWD", "Techo Panorámico", "N-Line"],
        unit_description: "SUV compacta vanguardista con acabados deportivos N-Line. Techo solar panorámico, asientos calefaccionados, cargador inalámbrico.",
        tech_specs: {
          "Motor": "2,4",
          "Transmisión": "DCT 7vel",
          "Combustible": "Gasolina",
          "Tracción": "AWD",
          "Color": "Negro Onyx",
          "Asientos": "5 pasajeros",
        }
      },
      {
        id: 10,
        marca: "Jeep",
        modelo: "Renegade",
        trim: "",
        anio: 2015,
        km: "12,000 km",
        precio: "$28,500",
        estado: "disponible",
        unit_condition: "nuevo",
        tipo: "suv",
        is_featured_unit: true,
        thumb_preview: "Fotos/renegade.png",
        gallery_assets: [
          "https://images.unsplash.com/photo-1617886322168-72b886573c35?w=800&q=80",
          "https://images.unsplash.com/photo-1617886322207-6b45f1b1c34a?w=800&q=80"
        ],
        feature_tags: ["AWD", "Techo Panorámico", "N-Line"],
        unit_description: "SUV compacta vanguardista con acabados deportivos N-Line. Techo solar panorámico, asientos calefaccionados, cargador inalámbrico.",
        tech_specs: {
          "Motor": "2.4",
          "Transmisión": "DCT 7vel",
          "Combustible": "Gasolina",
          "Tracción": "AWD",
          "Color": "Negro Onyx",
          "Asientos": "5 pasajeros",
        }
      },
      {
        id: 11,
        marca: "Honda",
        modelo: "CRV",
        
        anio: 2009,
        km: "12,000 km",
        precio: "$28,500",
        estado: "disponible",
        unit_condition: "nuevo",
        tipo: "suv",
        is_featured_unit: true,
        thumb_preview: "Fotos/Crv 2008.png",
        gallery_assets: [
          "https://images.unsplash.com/photo-1617886322168-72b886573c35?w=800&q=80",
          "https://images.unsplash.com/photo-1617886322207-6b45f1b1c34a?w=800&q=80"
        ],
        feature_tags: ["AWD", "Techo Panorámico", "N-Line"],
        unit_description: "SUV compacta vanguardista con acabados deportivos N-Line. Techo solar panorámico, asientos calefaccionados, cargador inalámbrico.",
        tech_specs: {
          "Motor": "2.4",
          "Transmisión": "DCT 7vel",
          "Combustible": "Gasolina",
          "Tracción": "4X4",
          "Color": "Negro Onyx",
          "Asientos": "5 pasajeros",
        }
      },
      {
        id: 12,
        marca: "Mercury",
        modelo: "Mariner",
        
        anio: 2009,
        km: "12,000 km",
        precio: "$28,500",
        estado: "disponible",
        unit_condition: "nuevo",
        tipo: "suv",
        is_featured_unit: true,
        thumb_preview: "Fotos/mercury render1.png",
        gallery_assets: [
          "https://images.unsplash.com/photo-1617886322168-72b886573c35?w=800&q=80",
          "https://images.unsplash.com/photo-1617886322207-6b45f1b1c34a?w=800&q=80"
        ],
        feature_tags: ["AWD", "Techo Panorámico", "N-Line"],
        unit_description: "SUV compacta vanguardista con acabados deportivos N-Line. Techo solar panorámico, asientos calefaccionados, cargador inalámbrico.",
        tech_specs: {
          "Motor": "4 cilindros",
          "Transmisión": "DCT 7vel",
          "Combustible": "Gasolina",
          "Tracción": "4x4",
          "Color": "Negro Onyx",
          "Asientos": "5 pasajeros",
        }
      },
    ];

    //entregas
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

    // testimonios de clientes
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
