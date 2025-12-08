require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

// Cargar datos desde archivos JSON
const loadData = () => {
  try {
    const labsPath = path.join(__dirname, 'data', 'labs.json');
    const bookingsPath = path.join(__dirname, 'data', 'bookings.json');
    
    const labsData = fs.readFileSync(labsPath, 'utf8');
    const bookingsData = fs.readFileSync(bookingsPath, 'utf8');
    
    return {
      labs: JSON.parse(labsData),
      bookings: JSON.parse(bookingsData)
    };
  } catch (error) {
    console.error('Error cargando datos:', error);
    return {
      labs: [],
      bookings: []
    };
  }
};

const { labs: mockLabs, bookings: mockBookings } = loadData();

const app = express();
const PORT = process.env.PORT || 4000;
const API_KEY = process.env.API_KEY || 'waysoft-mock-api-key-2024';

// ======================
// CONFIGURACIÓN CORS PARA INTERNET
// ======================

// CORS completamente abierto para Internet
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-api-key', 'Authorization', 'Accept'],
  credentials: false,
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// Headers de seguridad
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, x-api-key, Authorization');
  res.header('X-Powered-By', 'Waysoft Mock API');
  res.header('X-Version', '1.0.0');
  res.header('X-Environment', process.env.NODE_ENV || 'production');
  
  res.header('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.header('Pragma', 'no-cache');
  res.header('Expires', '0');
  
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ======================
// MIDDLEWARE DE AUTENTICACIÓN
// ======================

const authenticateApiKey = (req, res, next) => {
  const publicEndpoints = ['/', '/health', '/public', '/public/*', '/api-docs', '/status'];
  
  const isPublicEndpoint = publicEndpoints.some(endpoint => {
    if (endpoint.endsWith('/*')) {
      const basePath = endpoint.replace('/*', '');
      return req.path.startsWith(basePath);
    }
    return req.path === endpoint;
  });
  
  if (isPublicEndpoint) {
    return next();
  }
  
  const apiKey = req.headers['x-api-key'] || 
                 req.headers['authorization']?.replace('Bearer ', '') || 
                 req.query.api_key;
  
  if (!apiKey) {
    return res.status(401).json({
      success: false,
      error: "API Key requerida",
      message: "Incluye el header: x-api-key",
      code: "API_KEY_REQUIRED",
      docs: `${req.protocol}://${req.get('host')}/api-docs`
    });
  }
  
  if (apiKey !== API_KEY) {
    return res.status(403).json({
      success: false,
      error: "API Key inválida",
      message: "La API Key proporcionada no es válida",
      code: "INVALID_API_KEY",
      hint: "Usa: waysoft-mock-api-key-2024"
    });
  }
  
  next();
};

app.use(authenticateApiKey);

// ======================
// ENDPOINTS PÚBLICOS
// ======================

app.get('/', (req, res) => {
  res.json({
    message: "🎯 Waysoft Mock API - Servicio de Convenios Académicos",
    description: "API para laboratorios de informática por convenio (sin costo)",
    version: "1.0.0",
    environment: process.env.NODE_ENV || 'production',
    endpoints: {
      public: {
        health: "/health",
        status: "/status",
        api_docs: "/api-docs",
        test: "/public/test"
      },
      protected: {
        labs: "/labs",
        lab_details: "/labs/:id",
        bookings: "/bookings",
        availability: "/availability/:labId",
        schedule: "/labs/:id/schedule"
      }
    },
    special_features: [
      "Laboratorios por convenio académico",
      "Sin costo para instituciones aliadas",
      "Equipamiento de última generación",
      "Software especializado"
    ]
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: "healthy",
    service: "Waysoft Mock API - Convenios",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    data_loaded: {
      labs: mockLabs.length,
      bookings: mockBookings.length
    }
  });
});

app.get('/status', (req, res) => {
  const availableLabs = mockLabs.filter(l => l.status === 'available').length;
  
  res.json({
    status: "operational",
    service: "Waysoft Mock API",
    version: "1.0.0",
    data: {
      total_labs: mockLabs.length,
      available_labs: availableLabs,
      active_bookings: mockBookings.filter(b => b.status === 'confirmed').length,
      institutions: [...new Set(mockLabs.map(l => l.convention_info?.institution).filter(Boolean))]
    },
    message: `📚 ${availableLabs} laboratorios disponibles por convenio`
  });
});

app.get('/api-docs', (req, res) => {
  res.json({
    title: "Waysoft Mock API Documentation",
    description: "API para laboratorios de informática por convenio académico",
    authentication: {
      method: "API Key",
      header: "x-api-key",
      value: "waysoft-mock-api-key-2024"
    },
    endpoints: [
      {
        method: "GET",
        path: "/labs",
        description: "Obtener todos los laboratorios disponibles por convenio",
        parameters: [
          { name: "status", type: "query", example: "available" },
          { name: "category", type: "query", example: "programming" },
          { name: "institution", type: "query", example: "Universidad Nacional" }
        ],
        response_includes: ["convention_info", "equipment", "software"]
      },
      {
        method: "GET",
        path: "/labs/:id",
        description: "Obtener detalles completos de un laboratorio",
        response_includes: ["todos los detalles + información de convenio"]
      }
    ],
    special_notes: [
      "💡 Todos los laboratorios son por convenio (sin costo)",
      "🎓 Uso exclusivo para actividades académicas/investigación",
      "🤝 Disponible para instituciones aliadas"
    ]
  });
});

app.get('/public/test', (req, res) => {
  const sampleLab = mockLabs[0] || {};
  
  res.json({
    message: "✅ Waysoft Mock API funcionando correctamente",
    test: "Acceso público sin autenticación",
    sample_data: {
      lab_name: sampleLab.name,
      category: sampleLab.category,
      institution: sampleLab.convention_info?.institution,
      status: sampleLab.status
    },
    total_labs: mockLabs.length,
    note: "🔐 Para acceder a todos los datos, usa el API Key"
  });
});

// ======================
// ENDPOINTS PROTEGIDOS
// ======================

// 1. Obtener TODOS los laboratorios (SIN PRECIO - por convenio)
app.get('/labs', (req, res) => {
  try {
    const { 
      status, 
      category, 
      type,
      min_capacity,
      max_capacity,
      features,
      institution,
      page = 1,
      limit = 10
    } = req.query;
    
    let filteredLabs = [...mockLabs];
    
    // Aplicar filtros
    if (status) {
      filteredLabs = filteredLabs.filter(lab => lab.status === status);
    }
    
    if (category) {
      filteredLabs = filteredLabs.filter(lab => lab.category === category);
    }
    
    if (type) {
      filteredLabs = filteredLabs.filter(lab => lab.type === type);
    }
    
    if (min_capacity) {
      filteredLabs = filteredLabs.filter(lab => lab.capacity.max_students >= parseInt(min_capacity));
    }
    
    if (max_capacity) {
      filteredLabs = filteredLabs.filter(lab => lab.capacity.max_students <= parseInt(max_capacity));
    }
    
    if (features) {
      const featureList = features.split(',');
      filteredLabs = filteredLabs.filter(lab => 
        featureList.every(feature => lab.features.includes(feature))
      );
    }
    
    if (institution) {
      filteredLabs = filteredLabs.filter(lab => 
        lab.convention_info?.institution?.toLowerCase().includes(institution.toLowerCase())
      );
    }
    
    // Calcular disponibilidad actual
    const labsWithAvailability = filteredLabs.map(lab => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentTime = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;
      const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
      const currentDay = dayNames[now.getDay()];
      
      let isCurrentlyAvailable = false;
      let nextAvailable = null;
      
      if (lab.schedule[currentDay] && lab.schedule[currentDay] !== 'closed') {
        const todaySchedule = lab.schedule[currentDay];
        for (const slot of todaySchedule) {
          if (currentTime >= slot.start && currentTime <= slot.end) {
            isCurrentlyAvailable = true;
            break;
          }
        }
        
        // Encontrar próximo slot disponible hoy
        for (const slot of todaySchedule) {
          if (currentTime < slot.end) {
            nextAvailable = {
              day: 'hoy',
              start: slot.start,
              end: slot.end
            };
            break;
          }
        }
      }
      
      // Si no hay hoy, buscar próximo día
      if (!nextAvailable) {
        const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const todayIndex = days.indexOf(currentDay);
        
        for (let i = 1; i <= 7; i++) {
          const nextDayIndex = (todayIndex + i) % 7;
          const nextDay = days[nextDayIndex];
          
          if (lab.schedule[nextDay] && lab.schedule[nextDay] !== 'closed') {
            nextAvailable = {
              day: nextDay,
              start: lab.schedule[nextDay][0].start,
              end: lab.schedule[nextDay][0].end
            };
            break;
          }
        }
      }
      
      // Formatear respuesta SIN PRECIO (por convenio)
      return {
        id: lab.id,
        waysoft_id: lab.waysoft_id,
        name: lab.name,
        description: lab.description,
        type: lab.type,
        category: lab.category,
        status: lab.status,
        capacity: lab.capacity.max_students,
        location: lab.location.building,
        // NO INCLUYE PRECIO - ES POR CONVENIO
        convention_info: {
          institution: lab.convention_info?.institution,
          agreement_type: lab.convention_info?.agreement_type
        },
        current_availability: {
          is_available: isCurrentlyAvailable && lab.status === 'available',
          next_available: nextAvailable
        },
        features: lab.features.slice(0, 5),
        images: lab.images,
        metadata: {
          rating: lab.metadata.rating,
          total_bookings: lab.metadata.total_bookings
        }
      };
    });
    
    // Paginación
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = pageNum * limitNum;
    const paginatedLabs = labsWithAvailability.slice(startIndex, endIndex);
    
    res.json({
      success: true,
      data: paginatedLabs,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total_items: filteredLabs.length,
        total_pages: Math.ceil(filteredLabs.length / limitNum),
        has_next_page: endIndex < filteredLabs.length,
        has_prev_page: startIndex > 0
      },
      filters_applied: {
        status,
        category,
        type,
        min_capacity,
        max_capacity,
        features,
        institution
      },
      note: "💡 Todos los laboratorios son por convenio académico (sin costo)"
    });
    
  } catch (error) {
    console.error('Error en /labs:', error);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor"
    });
  }
});

// 2. Obtener un laboratorio por ID (con toda la información)
app.get('/labs/:id', (req, res) => {
  try {
    const { id } = req.params;
    const lab = mockLabs.find(l => l.id === id || l.waysoft_id === id);
    
    if (!lab) {
      return res.status(404).json({
        success: false,
        error: "Laboratorio no encontrado",
        code: "LAB_NOT_FOUND",
        available_labs: mockLabs.slice(0, 3).map(l => ({
          id: l.id,
          name: l.name,
          category: l.category,
          institution: l.convention_info?.institution
        }))
      });
    }
    
    // Obtener reservas futuras
    const now = new Date();
    const futureBookings = mockBookings
      .filter(booking => 
        booking.lab.id === lab.id && 
        new Date(booking.schedule.date) > now &&
        ['confirmed'].includes(booking.status)
      )
      .slice(0, 2)
      .map(booking => ({
        date: booking.schedule.date,
        start_time: booking.schedule.start_time,
        end_time: booking.schedule.end_time,
        purpose: booking.purpose.title
      }));
    
    // Laboratorios similares
    const similarLabs = mockLabs
      .filter(l => 
        l.id !== lab.id && 
        l.category === lab.category
      )
      .slice(0, 2)
      .map(l => ({
        id: l.id,
        name: l.name,
        description: l.description.substring(0, 100) + '...',
        capacity: l.capacity.max_students,
        institution: l.convention_info?.institution
      }));
    
    res.json({
      success: true,
      data: {
        ...lab,
        upcoming_bookings: futureBookings,
        similar_labs: similarLabs
      },
      note: "🎓 Este laboratorio está disponible por convenio académico (sin costo)"
    });
    
  } catch (error) {
    console.error(`Error en /labs/${req.params.id}:`, error);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor"
    });
  }
});

// 3. Verificar disponibilidad
app.get('/availability/:labId', (req, res) => {
  try {
    const { labId } = req.params;
    const { date, startTime, endTime } = req.query;
    
    const lab = mockLabs.find(l => l.id === labId || l.waysoft_id === labId);
    
    if (!lab) {
      return res.status(404).json({
        success: false,
        error: "Laboratorio no encontrado"
      });
    }
    
    // Si no se especifica fecha/hora, devolver disponibilidad general
    if (!date || !startTime || !endTime) {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentTime = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;
      const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
      const currentDay = dayNames[now.getDay()];
      
      let isCurrentlyAvailable = false;
      
      if (lab.schedule[currentDay] && lab.schedule[currentDay] !== 'closed') {
        const todaySchedule = lab.schedule[currentDay];
        for (const slot of todaySchedule) {
          if (currentTime >= slot.start && currentTime <= slot.end) {
            isCurrentlyAvailable = true;
            break;
          }
        }
      }
      
      return res.json({
        success: true,
        labId,
        labName: lab.name,
        current_status: lab.status,
        current_availability: isCurrentlyAvailable && lab.status === 'available',
        schedule_today: lab.schedule[currentDay] || 'closed',
        institution: lab.convention_info?.institution,
        message: isCurrentlyAvailable ? 
          "✅ Laboratorio disponible ahora (por convenio)" : 
          `❌ Laboratorio ${lab.status === 'available' ? 'cerrado ahora' : lab.status}`
      });
    }
    
    // Verificar disponibilidad para fecha/hora específica
    const requestedDate = new Date(date);
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const dayOfWeek = dayNames[requestedDate.getDay()];
    const schedule = lab.schedule[dayOfWeek];
    
    // Verificar si está cerrado ese día
    if (!schedule || schedule === 'closed') {
      return res.json({
        success: true,
        available: false,
        reason: `Laboratorio cerrado los ${dayOfWeek}`,
        lab_name: lab.name,
        institution: lab.convention_info?.institution
      });
    }
    
    // Verificar si el horario está dentro de algún slot
    let isWithinSchedule = false;
    for (const slot of schedule) {
      if (startTime >= slot.start && endTime <= slot.end) {
        isWithinSchedule = true;
        break;
      }
    }
    
    if (!isWithinSchedule) {
      return res.json({
        success: true,
        available: false,
        reason: "Horario fuera del horario de operación",
        lab_name: lab.name,
        available_slots: schedule.map(s => `${s.start}-${s.end}`)
      });
    }
    
    // Verificar conflicto con reservas existentes
    const conflictingBookings = mockBookings.filter(booking => {
      if (booking.lab.id !== lab.id) return false;
      if (booking.schedule.date !== date) return false;
      if (!['confirmed'].includes(booking.status)) return false;
      
      const bookingStart = booking.schedule.start_time;
      const bookingEnd = booking.schedule.end_time;
      
      return !(endTime <= bookingStart || startTime >= bookingEnd);
    });
    
    const isAvailable = conflictingBookings.length === 0 && lab.status === 'available';
    
    res.json({
      success: true,
      available: isAvailable,
      labId,
      labName: lab.name,
      date,
      startTime,
      endTime,
      institution: lab.convention_info?.institution,
      details: {
        status: lab.status,
        capacity: lab.capacity.max_students,
        requires_instructor: lab.requirements.requires_instructor,
        // NO INCLUYE PRECIO - ES POR CONVENIO
        pricing: "Gratuito por convenio académico"
      },
      conflicts: conflictingBookings.length > 0 ? conflictingBookings.map(b => ({
        booking_id: b.id,
        start_time: b.schedule.start_time,
        end_time: b.schedule.end_time,
        purpose: b.purpose.title
      })) : null,
      note: "🎓 Disponible sin costo por convenio con " + lab.convention_info?.institution
    });
    
  } catch (error) {
    console.error(`Error en /availability/${req.params.labId}:`, error);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor"
    });
  }
});

// 4. Obtener convenios activos
app.get('/conventions', (req, res) => {
  try {
    const conventions = {};
    
    mockLabs.forEach(lab => {
      const institution = lab.convention_info?.institution;
      if (institution) {
        if (!conventions[institution]) {
          conventions[institution] = {
            institution: institution,
            labs: [],
            agreement_type: lab.convention_info.agreement_type,
            agreement_date: lab.convention_info.agreement_date,
            valid_until: lab.convention_info.valid_until,
            contact_person: lab.convention_info.contact_person
          };
        }
        
        conventions[institution].labs.push({
          id: lab.id,
          name: lab.name,
          category: lab.category,
          capacity: lab.capacity.max_students,
          status: lab.status
        });
      }
    });
    
    const conventionList = Object.values(conventions);
    
    res.json({
      success: true,
      data: conventionList,
      total_conventions: conventionList.length,
      total_labs_covered: mockLabs.length,
      note: "🤝 Convenios activos para uso de laboratorios sin costo"
    });
    
  } catch (error) {
    console.error('Error en /conventions:', error);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor"
    });
  }
});

// 5. Buscar laboratorios por características
app.get('/search/labs', (req, res) => {
  try {
    const { q, category, software } = req.query;
    
    if (!q && !category && !software) {
      return res.json({
        success: true,
        query: "empty",
        count: 0,
        data: [],
        message: "Proporciona un término de búsqueda"
      });
    }
    
    let results = [...mockLabs];
    
    // Búsqueda por texto
    if (q) {
      const searchTerm = q.toLowerCase().trim();
      results = results.filter(lab => 
        lab.name.toLowerCase().includes(searchTerm) ||
        lab.description.toLowerCase().includes(searchTerm) ||
        lab.convention_info?.institution?.toLowerCase().includes(searchTerm) ||
        lab.features.some(feature => feature.toLowerCase().includes(searchTerm))
      );
    }
    
    // Filtro por categoría
    if (category) {
      results = results.filter(lab => lab.category === category);
    }
    
    // Filtro por software
    if (software) {
      const softwareList = software.split(',');
      results = results.filter(lab => 
        softwareList.some(sw => 
          lab.software?.some(s => s.toLowerCase().includes(sw.toLowerCase()))
        )
      );
    }
    
    // Formatear resultados
    const formattedResults = results.map(lab => ({
      id: lab.id,
      name: lab.name,
      description: lab.description.substring(0, 150) + '...',
      category: lab.category,
      status: lab.status,
      capacity: lab.capacity.max_students,
      institution: lab.convention_info?.institution,
      key_features: lab.features.slice(0, 3),
      software_count: lab.software?.length || 0
    }));
    
    res.json({
      success: true,
      query: q || "all",
      filters: { category, software },
      count: results.length,
      data: formattedResults,
      note: "🔍 " + results.length + " laboratorios encontrados por convenio"
    });
    
  } catch (error) {
    console.error('Error en /search/labs:', error);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor"
    });
  }
});

// 6. Obtener todas las reservas (simplificado sin precio)
app.get('/bookings', (req, res) => {
  try {
    const { 
      userId, 
      status, 
      labId,
      start_date,
      end_date
    } = req.query;
    
    let bookings = [...mockBookings];
    
    if (userId) {
      bookings = bookings.filter(b => b.user.id === userId);
    }
    
    if (status) {
      bookings = bookings.filter(b => b.status === status);
    }
    
    if (labId) {
      bookings = bookings.filter(b => b.lab.id === labId || b.lab.waysoft_id === labId);
    }
    
    if (start_date) {
      bookings = bookings.filter(b => b.schedule.date >= start_date);
    }
    
    if (end_date) {
      bookings = bookings.filter(b => b.schedule.date <= end_date);
    }
    
    // Formatear respuesta SIN PRECIO
    const formattedBookings = bookings.map(booking => ({
      id: booking.id,
      booking_id: booking.booking_id,
      reference: booking.reference_code,
      lab: {
        id: booking.lab.id,
        name: booking.lab.name,
        code: booking.lab.code,
        institution: mockLabs.find(l => l.id === booking.lab.id)?.convention_info?.institution
      },
      user: {
        id: booking.user.id,
        name: booking.user.name,
        company: booking.user.company
      },
      schedule: {
        date: booking.schedule.date,
        start_time: booking.schedule.start_time,
        end_time: booking.schedule.end_time,
        duration: booking.schedule.duration_hours
      },
      purpose: booking.purpose,
      status: booking.status,
      convention_terms: booking.convention_terms,
      note: "📅 Reserva por convenio académico (sin costo)"
    }));
    
    res.json({
      success: true,
      data: formattedBookings,
      total: bookings.length,
      note: "Todas las reservas son por convenio (sin transacciones monetarias)"
    });
    
  } catch (error) {
    console.error('Error en /bookings:', error);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor"
    });
  }
});

// 7. Obtener categorías disponibles
app.get('/categories', (req, res) => {
  try {
    const categories = {};
    
    mockLabs.forEach(lab => {
      if (!categories[lab.category]) {
        categories[lab.category] = {
          name: lab.category,
          count: 0,
          labs: [],
          institutions: new Set()
        };
      }
      
      categories[lab.category].count++;
      categories[lab.category].labs.push({
        id: lab.id,
        name: lab.name,
        status: lab.status
      });
      
      if (lab.convention_info?.institution) {
        categories[lab.category].institutions.add(lab.convention_info.institution);
      }
    });
    
    // Convertir Set a Array
    Object.keys(categories).forEach(key => {
      categories[key].institutions = Array.from(categories[key].institutions);
    });
    
    res.json({
      success: true,
      data: Object.values(categories),
      total_categories: Object.keys(categories).length,
      note: "📊 Categorías de laboratorios disponibles por convenio"
    });
    
  } catch (error) {
    console.error('Error en /categories:', error);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor"
    });
  }
});

// ======================
// MANEJO DE ERRORES
// ======================

app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: "Endpoint no encontrado",
    path: req.originalUrl,
    available_endpoints: [
      "GET /",
      "GET /health",
      "GET /status",
      "GET /api-docs",
      "GET /public/test",
      "GET /labs",
      "GET /labs/:id",
      "GET /availability/:labId",
      "GET /conventions",
      "GET /search/labs",
      "GET /bookings",
      "GET /categories"
    ],
    documentation: `${req.protocol}://${req.get('host')}/api-docs`
  });
});

app.use((err, req, res, next) => {
  console.error('Error global:', err);
  
  res.status(500).json({
    success: false,
    error: "Error interno del servidor",
    request_id: Date.now().toString(36),
    timestamp: new Date().toISOString()
  });
});

// ======================
// INICIAR SERVIDOR
// ======================

app.listen(PORT, '0.0.0.0', () => {
  console.log(`
╔══════════════════════════════════════════════════════════╗
║     🚀 WAYSOFT MOCK API - CONVENIOS ACADÉMICOS          ║
╠══════════════════════════════════════════════════════════╣
║  Puerto:         ${PORT}${' '.repeat(38 - PORT.toString().length)}║
║  Entorno:        ${process.env.NODE_ENV || 'production'}${' '.repeat(38 - (process.env.NODE_ENV || 'production').length)}║
║  CORS:           Activado para Internet                 ║
║  API Key:        waysoft-mock-api-key-2024              ║
╠══════════════════════════════════════════════════════════╣
║  📊 DATOS CARGADOS:                                     ║
║    • Laboratorios: ${mockLabs.length}${' '.repeat(33 - mockLabs.length.toString().length)}║
║    • Reservas:    ${mockBookings.length}${' '.repeat(33 - mockBookings.length.toString().length)}║
║    • Instituciones: ${[...new Set(mockLabs.map(l => l.convention_info?.institution).filter(Boolean))].length}${' '.repeat(28)}║
╠══════════════════════════════════════════════════════════╣
║  🎓 CARACTERÍSTICAS:                                    ║
║    • Sin costo por convenio                            ║
║    • Uso académico/investigación                       ║
║    • Equipamiento especializado                        ║
╠══════════════════════════════════════════════════════════╣
║  🌐 ENDPOINTS DISPONIBLES:                              ║
║    • /labs       - Laboratorios por convenio           ║
║    • /conventions- Convenios activos                   ║
║    • /categories - Categorías disponibles              ║
║    • /search/labs- Búsqueda avanzada                   ║
╚══════════════════════════════════════════════════════════╝

✅ API lista para recibir peticiones desde cualquier origen
🔑 Usa el header: x-api-key: waysoft-mock-api-key-2024
📚 Documentación: /api-docs
🎓 Todos los laboratorios son por convenio (sin costo)
  `);
});