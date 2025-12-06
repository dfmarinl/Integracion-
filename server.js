require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Importar datos mock
const mockLabs = require('./data/mockLabs');
const mockBookings = require('./data/mockBookings');

const app = express();
const PORT = process.env.PORT || 4001;

// Middleware
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || '*',
  methods: ['GET'],
  allowedHeaders: ['Content-Type', 'x-api-key']
}));
app.use(express.json());

// Middleware de autenticación simple
const authMiddleware = (req, res, next) => {
  // Endpoints públicos (sin auth)
  const publicEndpoints = ['/health', '/public/test', '/'];
  if (publicEndpoints.includes(req.path)) {
    return next();
  }
  
  const apiKey = req.headers['x-api-key'];
  
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({
      error: "Unauthorized",
      message: "API Key requerida",
      code: "INVALID_API_KEY",
      hint: "Usa el header: x-api-key: waysoft-consultas-only-2024"
    });
  }
  
  next();
};

// Aplicar auth a todas las rutas (excepto públicas)
app.use(authMiddleware);

// ======================
// ENDPOINTS DE CONSULTA
// ======================

// 1. Health Check (público)
app.get('/health', (req, res) => {
  res.json({
    service: "Waysoft Query API",
    status: "running",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    endpoints: {
      labs: {
        all: "/labs",
        by_id: "/labs/:id",
        schedule: "/labs/:id/schedule",
        availability: "/availability/:labId",
        search: "/search/labs?q=term",
        by_category: "/categories/:category/labs"
      },
      bookings: {
        all: "/bookings",
        by_id: "/bookings/:bookingId",
        by_user: "/users/:userId/bookings"
      },
      stats: "/stats",
      public_test: "/public/test"
    }
  });
});

// 2. Página de inicio (pública)
app.get('/', (req, res) => {
  res.json({
    message: "Waysoft Mock API - Solo Consultas",
    description: "API de simulación para integración con Waysoft desde Reflex",
    usage: {
      auth: "Incluye header: x-api-key: waysoft-consultas-only-2024",
      examples: {
        get_labs: "GET /labs",
        get_lab: "GET /labs/WL-001",
        get_bookings: "GET /bookings",
        search: "GET /search/labs?q=cisco"
      }
    }
  });
});

// 3. Obtener TODOS los laboratorios
app.get('/labs', (req, res) => {
  try {
    const { 
      status, 
      category, 
      type,
      min_capacity,
      max_capacity,
      features,
      page = 1,
      limit = 10
    } = req.query;
    
    let labs = [...mockLabs];
    
    // Filtrar por estado
    if (status) {
      labs = labs.filter(lab => lab.status === status);
    }
    
    // Filtrar por categoría
    if (category) {
      labs = labs.filter(lab => lab.category === category);
    }
    
    // Filtrar por tipo
    if (type) {
      labs = labs.filter(lab => lab.type === type);
    }
    
    // Filtrar por capacidad mínima
    if (min_capacity) {
      labs = labs.filter(lab => lab.capacity.max_students >= parseInt(min_capacity));
    }
    
    // Filtrar por capacidad máxima
    if (max_capacity) {
      labs = labs.filter(lab => lab.capacity.max_students <= parseInt(max_capacity));
    }
    
    // Filtrar por características
    if (features) {
      const featureList = features.split(',');
      labs = labs.filter(lab => 
        featureList.every(feature => lab.features.includes(feature))
      );
    }
    
    // Calcular disponibilidad actual
    const labsWithAvailability = labs.map(lab => {
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
      
      // Calcular precio formateado
      const formattedPrice = `${lab.pricing.currency === 'USD' ? '$' : '€'}${lab.pricing.rates.hourly}/hora`;
      
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
        pricing: {
          hourly: lab.pricing.rates.hourly,
          currency: lab.pricing.currency,
          formatted: formattedPrice
        },
        current_availability: {
          is_available: isCurrentlyAvailable && lab.status === 'available',
          next_available: nextAvailable
        },
        features: lab.features.slice(0, 5), // Primeras 5 características
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
    
    // Calcular estadísticas de filtros
    const stats = {
      total: labs.length,
      by_status: labs.reduce((acc, lab) => {
        acc[lab.status] = (acc[lab.status] || 0) + 1;
        return acc;
      }, {}),
      by_category: labs.reduce((acc, lab) => {
        acc[lab.category] = (acc[lab.category] || 0) + 1;
        return acc;
      }, {}),
      average_capacity: labs.length > 0 ? 
        labs.reduce((sum, lab) => sum + lab.capacity.max_students, 0) / labs.length : 0,
      average_price: labs.length > 0 ? 
        labs.reduce((sum, lab) => sum + lab.pricing.rates.hourly, 0) / labs.length : 0
    };
    
    res.json({
      success: true,
      data: paginatedLabs,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total_items: labs.length,
        total_pages: Math.ceil(labs.length / limitNum),
        has_next_page: endIndex < labs.length,
        has_prev_page: startIndex > 0
      },
      statistics: stats,
      filters_applied: {
        status,
        category,
        type,
        min_capacity,
        max_capacity,
        features
      }
    });
    
  } catch (error) {
    console.error('Error en /labs:', error);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor",
      message: error.message
    });
  }
});

// 4. Obtener un laboratorio por ID
app.get('/labs/:id', (req, res) => {
  try {
    const { id } = req.params;
    const lab = mockLabs.find(l => l.id === id || l.waysoft_id === id);
    
    if (!lab) {
      return res.status(404).json({
        success: false,
        error: "Laboratorio no encontrado",
        code: "LAB_NOT_FOUND",
        suggestions: mockLabs.slice(0, 3).map(l => ({
          id: l.id,
          name: l.name,
          category: l.category
        }))
      });
    }
    
    // Obtener reservas futuras para este laboratorio
    const now = new Date();
    const futureBookings = mockBookings
      .filter(booking => 
        booking.lab.id === lab.id && 
        new Date(booking.schedule.date) > now &&
        ['confirmed', 'pending_payment'].includes(booking.status)
      )
      .slice(0, 5)
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
        (l.category === lab.category || l.type === lab.type)
      )
      .slice(0, 3)
      .map(l => ({
        id: l.id,
        name: l.name,
        category: l.category,
        capacity: l.capacity.max_students,
        hourly_rate: l.pricing.rates.hourly,
        status: l.status
      }));
    
    res.json({
      success: true,
      data: {
        ...lab,
        upcoming_bookings: futureBookings,
        similar_labs: similarLabs
      }
    });
    
  } catch (error) {
    console.error(`Error en /labs/${req.params.id}:`, error);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor"
    });
  }
});

// 5. Verificar disponibilidad
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
        message: isCurrentlyAvailable ? 
          "Laboratorio disponible ahora" : 
          `Laboratorio ${lab.status === 'available' ? 'cerrado ahora' : lab.status}`
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
        next_available: getNextAvailableDay(lab, dayOfWeek)
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
        available_slots: schedule.map(s => `${s.start}-${s.end}`)
      });
    }
    
    // Verificar conflicto con reservas existentes
    const conflictingBookings = mockBookings.filter(booking => {
      if (booking.lab.id !== lab.id) return false;
      if (booking.schedule.date !== date) return false;
      if (!['confirmed', 'pending_payment'].includes(booking.status)) return false;
      
      const bookingStart = booking.schedule.start_time;
      const bookingEnd = booking.schedule.end_time;
      
      // Verificar solapamiento
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
      details: {
        status: lab.status,
        capacity: lab.capacity.max_students,
        requires_instructor: lab.requirements.requires_instructor,
        hourly_rate: lab.pricing.rates.hourly,
        currency: lab.pricing.currency
      },
      conflicts: conflictingBookings.length > 0 ? conflictingBookings.map(b => ({
        booking_id: b.id,
        start_time: b.schedule.start_time,
        end_time: b.schedule.end_time
      })) : null
    });
    
  } catch (error) {
    console.error(`Error en /availability/${req.params.labId}:`, error);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor"
    });
  }
});

// 6. Obtener horarios de un laboratorio
app.get('/labs/:id/schedule', (req, res) => {
  try {
    const { id } = req.params;
    const lab = mockLabs.find(l => l.id === id || l.waysoft_id === id);
    
    if (!lab) {
      return res.status(404).json({
        success: false,
        error: "Laboratorio no encontrado"
      });
    }
    
    // Formatear horarios para respuesta
    const formattedSchedule = {};
    Object.entries(lab.schedule).forEach(([day, slots]) => {
      if (slots === 'closed') {
        formattedSchedule[day] = 'Cerrado';
      } else {
        formattedSchedule[day] = slots.map(slot => `${slot.start} - ${slot.end}`);
      }
    });
    
    res.json({
      success: true,
      labId: id,
      labName: lab.name,
      schedule: formattedSchedule,
      next_7_days: getNext7DaysSchedule(lab)
    });
    
  } catch (error) {
    console.error(`Error en /labs/${req.params.id}/schedule:`, error);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor"
    });
  }
});

// 7. Obtener todas las reservas
app.get('/bookings', (req, res) => {
  try {
    const { 
      userId, 
      status, 
      labId,
      start_date,
      end_date,
      page = 1,
      limit = 10
    } = req.query;
    
    let bookings = [...mockBookings];
    
    // Filtrar por usuario
    if (userId) {
      bookings = bookings.filter(b => b.user.id === userId);
    }
    
    // Filtrar por estado
    if (status) {
      bookings = bookings.filter(b => b.status === status);
    }
    
    // Filtrar por laboratorio
    if (labId) {
      bookings = bookings.filter(b => b.lab.id === labId || b.lab.waysoft_id === labId);
    }
    
    // Filtrar por fecha de inicio
    if (start_date) {
      bookings = bookings.filter(b => b.schedule.date >= start_date);
    }
    
    // Filtrar por fecha de fin
    if (end_date) {
      bookings = bookings.filter(b => b.schedule.date <= end_date);
    }
    
    // Ordenar por fecha (más recientes primero)
    bookings.sort((a, b) => 
      new Date(b.schedule.date + 'T' + b.schedule.start_time) - 
      new Date(a.schedule.date + 'T' + a.schedule.start_time)
    );
    
    // Formatear respuesta
    const formattedBookings = bookings.map(booking => ({
      id: booking.id,
      booking_id: booking.booking_id,
      reference: booking.reference_code,
      lab: {
        id: booking.lab.id,
        name: booking.lab.name,
        code: booking.lab.code
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
      status: booking.status,
      payment_status: booking.pricing.payment_status,
      total_amount: booking.pricing.total_amount,
      currency: booking.pricing.currency
    }));
    
    // Paginación
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = pageNum * limitNum;
    const paginatedBookings = formattedBookings.slice(startIndex, endIndex);
    
    // Estadísticas
    const stats = {
      total: bookings.length,
      by_status: bookings.reduce((acc, b) => {
        acc[b.status] = (acc[b.status] || 0) + 1;
        return acc;
      }, {}),
      by_lab: bookings.reduce((acc, b) => {
        acc[b.lab.name] = (acc[b.lab.name] || 0) + 1;
        return acc;
      }, {}),
      total_revenue: bookings
        .filter(b => b.pricing.payment_status === 'paid')
        .reduce((sum, b) => sum + b.pricing.total_amount, 0)
    };
    
    res.json({
      success: true,
      data: paginatedBookings,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total_items: bookings.length,
        total_pages: Math.ceil(bookings.length / limitNum),
        has_next_page: endIndex < bookings.length,
        has_prev_page: startIndex > 0
      },
      statistics: stats,
      filters_applied: {
        userId,
        status,
        labId,
        start_date,
        end_date
      }
    });
    
  } catch (error) {
    console.error('Error en /bookings:', error);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor"
    });
  }
});

// 8. Obtener reservas de un usuario específico
app.get('/users/:userId/bookings', (req, res) => {
  try {
    const { userId } = req.params;
    const { 
      status, 
      include_past = 'true',
      include_upcoming = 'true',
      page = 1,
      limit = 10
    } = req.query;
    
    // Filtrar reservas del usuario
    let userBookings = mockBookings.filter(b => b.user.id === userId);
    
    // Separar en pasadas y futuras
    const now = new Date();
    const pastBookings = userBookings.filter(b => 
      new Date(b.schedule.date + 'T' + b.schedule.end_time) < now
    );
    const upcomingBookings = userBookings.filter(b => 
      new Date(b.schedule.date + 'T' + b.schedule.start_time) > now
    );
    
    // Aplicar filtros según parámetros
    let filteredBookings = [];
    if (include_past === 'true') {
      filteredBookings = filteredBookings.concat(pastBookings);
    }
    if (include_upcoming === 'true') {
      filteredBookings = filteredBookings.concat(upcomingBookings);
    }
    
    // Filtrar por estado si se especifica
    if (status) {
      filteredBookings = filteredBookings.filter(b => b.status === status);
    }
    
    // Ordenar
    filteredBookings.sort((a, b) => 
      new Date(b.schedule.date + 'T' + b.schedule.start_time) - 
      new Date(a.schedule.date + 'T' + a.schedule.start_time)
    );
    
    // Formatear respuesta
    const formattedBookings = filteredBookings.map(booking => ({
      id: booking.id,
      booking_id: booking.booking_id,
      lab: {
        id: booking.lab.id,
        name: booking.lab.name
      },
      schedule: {
        date: booking.schedule.date,
        start_time: booking.schedule.start_time,
        end_time: booking.schedule.end_time,
        duration: booking.schedule.duration_hours
      },
      status: booking.status,
      payment_status: booking.pricing.payment_status,
      total_amount: booking.pricing.total_amount,
      currency: booking.pricing.currency,
      is_past: new Date(booking.schedule.date + 'T' + booking.schedule.end_time) < now,
      is_upcoming: new Date(booking.schedule.date + 'T' + booking.schedule.start_time) > now
    }));
    
    // Paginación
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = pageNum * limitNum;
    const paginatedBookings = formattedBookings.slice(startIndex, endIndex);
    
    // Estadísticas del usuario
    const userStats = {
      total_bookings: userBookings.length,
      past_bookings: pastBookings.length,
      upcoming_bookings: upcomingBookings.length,
      by_status: userBookings.reduce((acc, b) => {
        acc[b.status] = (acc[b.status] || 0) + 1;
        return acc;
      }, {}),
      total_spent: userBookings
        .filter(b => b.pricing.payment_status === 'paid')
        .reduce((sum, b) => sum + b.pricing.total_amount, 0),
      favorite_lab: userBookings.length > 0 ? 
        userBookings.reduce((max, b) => {
          const labCount = userBookings.filter(b2 => b2.lab.id === b.lab.id).length;
          return labCount > max.count ? { lab: b.lab.name, count: labCount } : max;
        }, { lab: null, count: 0 }).lab : null
    };
    
    res.json({
      success: true,
      userId,
      data: paginatedBookings,
      statistics: userStats,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total_items: filteredBookings.length,
        total_pages: Math.ceil(filteredBookings.length / limitNum),
        has_next_page: endIndex < filteredBookings.length,
        has_prev_page: startIndex > 0
      },
      filters: {
        include_past,
        include_upcoming,
        status
      }
    });
    
  } catch (error) {
    console.error(`Error en /users/${req.params.userId}/bookings:`, error);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor"
    });
  }
});

// 9. Obtener una reserva específica
app.get('/bookings/:bookingId', (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = mockBookings.find(b => 
      b.id === bookingId || 
      b.booking_id === bookingId || 
      b.external_id === bookingId
    );
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        error: "Reserva no encontrada"
      });
    }
    
    // Buscar información completa del laboratorio
    const lab = mockLabs.find(l => l.id === booking.lab.id);
    
    res.json({
      success: true,
      data: {
        ...booking,
        lab_details: lab ? {
          name: lab.name,
          location: lab.location,
          contact: lab.contact,
          images: lab.images
        } : null
      }
    });
    
  } catch (error) {
    console.error(`Error en /bookings/${req.params.bookingId}:`, error);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor"
    });
  }
});

// 10. Buscar laboratorios por término
app.get('/search/labs', (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.trim() === '') {
      return res.json({
        success: true,
        query: q,
        count: 0,
        data: []
      });
    }
    
    const searchTerm = q.toLowerCase().trim();
    
    const results = mockLabs.filter(lab => 
      lab.name.toLowerCase().includes(searchTerm) ||
      lab.description.toLowerCase().includes(searchTerm) ||
      lab.category.toLowerCase().includes(searchTerm) ||
      lab.type.toLowerCase().includes(searchTerm) ||
      lab.features.some(feature => feature.toLowerCase().includes(searchTerm)) ||
      lab.equipment?.routers?.some(r => r.model.toLowerCase().includes(searchTerm)) ||
      lab.equipment?.switches?.some(s => s.model.toLowerCase().includes(searchTerm))
    );
    
    // Formatear resultados
    const formattedResults = results.map(lab => ({
      id: lab.id,
      name: lab.name,
      description: lab.description.substring(0, 100) + '...',
      category: lab.category,
      status: lab.status,
      capacity: lab.capacity.max_students,
      hourly_rate: lab.pricing.rates.hourly,
      currency: lab.pricing.currency,
      match_reason: getMatchReason(lab, searchTerm)
    }));
    
    res.json({
      success: true,
      query: q,
      count: results.length,
      data: formattedResults
    });
    
  } catch (error) {
    console.error('Error en /search/labs:', error);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor"
    });
  }
});

// 11. Obtener estadísticas (solo lectura)
app.get('/stats', (req, res) => {
  try {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    // Reservas del mes actual
    const monthlyBookings = mockBookings.filter(b => {
      const bookingDate = new Date(b.schedule.date);
      return bookingDate.getMonth() === currentMonth && 
             bookingDate.getFullYear() === currentYear;
    });
    
    const stats = {
      // Laboratorios
      labs: {
        total: mockLabs.length,
        available: mockLabs.filter(l => l.status === 'available').length,
        in_maintenance: mockLabs.filter(l => l.status === 'maintenance').length,
        reserved: mockLabs.filter(l => l.status === 'reserved').length,
        by_category: mockLabs.reduce((acc, lab) => {
          acc[lab.category] = (acc[lab.category] || 0) + 1;
          return acc;
        }, {})
      },
      
      // Reservas
      bookings: {
        total: mockBookings.length,
        monthly: monthlyBookings.length,
        by_status: mockBookings.reduce((acc, b) => {
          acc[b.status] = (acc[b.status] || 0) + 1;
          return acc;
        }, {}),
        by_month: getBookingsByMonth(),
        revenue: {
          total: mockBookings
            .filter(b => b.pricing.payment_status === 'paid')
            .reduce((sum, b) => sum + b.pricing.total_amount, 0),
          monthly: monthlyBookings
            .filter(b => b.pricing.payment_status === 'paid')
            .reduce((sum, b) => sum + b.pricing.total_amount, 0)
        }
      },
      
      // Usuarios (simulado)
      users: {
        total_clients: 5, // De los datos mock
        active_clients: 3,
        corporate_clients: 4,
        academic_clients: 1
      },
      
      // Capacidad
      capacity: {
        total_seats: mockLabs.reduce((sum, lab) => sum + lab.capacity.max_students, 0),
        average_utilization: calculateUtilization(),
        most_popular_lab: mockBookings.length > 0 ? 
          mockBookings.reduce((max, b) => {
            const labCount = mockBookings.filter(b2 => b2.lab.id === b.lab.id).length;
            return labCount > max.count ? { lab: b.lab.name, count: labCount } : max;
          }, { lab: null, count: 0 }).lab : null
      }
    };
    
    res.json({
      success: true,
      data: stats,
      generated_at: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error en /stats:', error);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor"
    });
  }
});

// 12. Obtener laboratorios por categoría
app.get('/categories/:category/labs', (req, res) => {
  try {
    const { category } = req.params;
    const labs = mockLabs.filter(lab => lab.category === category);
    
    if (labs.length === 0) {
      return res.status(404).json({
        success: false,
        error: `No se encontraron laboratorios en la categoría: ${category}`,
        available_categories: [...new Set(mockLabs.map(l => l.category))]
      });
    }
    
    res.json({
      success: true,
      category,
      count: labs.length,
      data: labs.map(lab => ({
        id: lab.id,
        name: lab.name,
        description: lab.description,
        status: lab.status,
        capacity: lab.capacity.max_students,
        pricing: lab.pricing.rates,
        features: lab.features,
        images: lab.images
      }))
    });
    
  } catch (error) {
    console.error(`Error en /categories/${req.params.category}/labs:`, error);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor"
    });
  }
});

// 13. Endpoint de prueba simple (sin auth)
app.get('/public/test', (req, res) => {
  res.json({
    message: "Waysoft Mock API - Solo Consultas",
    description: "API de simulación para pruebas de integración",
    endpoints_available: [
      "GET /health - Estado del servicio",
      "GET /labs - Todos los laboratorios",
      "GET /labs/:id - Laboratorio específico",
      "GET /bookings - Todas las reservas",
      "GET /users/:userId/bookings - Reservas de usuario",
      "GET /search/labs?q=term - Buscar laboratorios",
      "GET /stats - Estadísticas",
      "GET /categories/:category/labs - Laboratorios por categoría"
    ],
    example_requests: [
      "curl -H 'x-api-key: waysoft-consultas-only-2024' http://localhost:4001/labs",
      "curl -H 'x-api-key: waysoft-consultas-only-2024' http://localhost:4001/labs/WL-001",
      "curl -H 'x-api-key: waysoft-consultas-only-2024' http://localhost:4001/search/labs?q=cisco"
    ],
    test_data: {
      labs_count: mockLabs.length,
      bookings_count: mockBookings.length,
      sample_lab: mockLabs[0] ? {
        id: mockLabs[0].id,
        name: mockLabs[0].name,
        status: mockLabs[0].status
      } : null
    }
  });
});

// ======================
// FUNCIONES AUXILIARES
// ======================

function getNextAvailableDay(lab, currentDay) {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const currentIndex = days.indexOf(currentDay);
  
  for (let i = 1; i <= 7; i++) {
    const nextIndex = (currentIndex + i) % 7;
    const nextDay = days[nextIndex];
    
    if (lab.schedule[nextDay] && lab.schedule[nextDay] !== 'closed') {
      return {
        day: nextDay,
        schedule: lab.schedule[nextDay].map(s => `${s.start}-${s.end}`)
      };
    }
  }
  
  return null;
}

function getNext7DaysSchedule(lab) {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const today = new Date();
  const schedule = [];
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    const dayName = days[date.getDay()];
    const labSchedule = lab.schedule[dayName];
    
    schedule.push({
      date: date.toISOString().split('T')[0],
      day: dayName,
      schedule: labSchedule === 'closed' ? 'Cerrado' : labSchedule.map(s => `${s.start}-${s.end}`),
      is_today: i === 0,
      is_available: labSchedule !== 'closed' && lab.status === 'available'
    });
  }
  
  return schedule;
}

function getMatchReason(lab, searchTerm) {
  if (lab.name.toLowerCase().includes(searchTerm)) return 'name';
  if (lab.description.toLowerCase().includes(searchTerm)) return 'description';
  if (lab.category.toLowerCase().includes(searchTerm)) return 'category';
  if (lab.type.toLowerCase().includes(searchTerm)) return 'type';
  if (lab.features.some(f => f.toLowerCase().includes(searchTerm))) return 'feature';
  if (lab.equipment?.routers?.some(r => r.model.toLowerCase().includes(searchTerm))) return 'equipment';
  if (lab.equipment?.switches?.some(s => s.model.toLowerCase().includes(searchTerm))) return 'equipment';
  return 'other';
}

function getBookingsByMonth() {
  const monthlyData = {};
  
  mockBookings.forEach(booking => {
    const date = new Date(booking.schedule.date);
    const monthYear = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
    
    if (!monthlyData[monthYear]) {
      monthlyData[monthYear] = 0;
    }
    monthlyData[monthYear]++;
  });
  
  return monthlyData;
}

function calculateUtilization() {
  // Simulación de utilización
  const totalHours = mockLabs.reduce((sum, lab) => {
    let weeklyHours = 0;
    Object.values(lab.schedule).forEach(schedule => {
      if (schedule !== 'closed') {
        schedule.forEach(slot => {
          const start = parseInt(slot.start.split(':')[0]);
          const end = parseInt(slot.end.split(':')[0]);
          weeklyHours += (end - start);
        });
      }
    });
    return sum + weeklyHours * 52; // Horas anuales
  }, 0);
  
  const bookedHours = mockBookings
    .filter(b => ['confirmed', 'completed'].includes(b.status))
    .reduce((sum, b) => sum + b.schedule.duration_hours, 0);
  
  return totalHours > 0 ? (bookedHours / totalHours * 100).toFixed(1) : 0;
}

// 404 Handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: "Endpoint no encontrado",
    path: req.originalUrl,
    availableEndpoints: [
      "GET /health",
      "GET /labs",
      "GET /labs/:id",
      "GET /labs/:id/schedule",
      "GET /availability/:labId",
      "GET /bookings",
      "GET /users/:userId/bookings",
      "GET /bookings/:bookingId",
      "GET /search/labs",
      "GET /stats",
      "GET /categories/:category/labs",
      "GET /public/test"
    ],
    documentation: "Visita /public/test para más información"
  });
});

// Error Handler global
app.use((err, req, res, next) => {
  console.error('Error global:', err);
  
  res.status(500).json({
    success: false,
    error: "Error interno del servidor",
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
    request_id: Date.now().toString(36)
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Waysoft Query API corriendo en http://localhost:${PORT}`);
  console.log(`🔑 API Key: ${process.env.API_KEY}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/health`);
  console.log(`📚 Documentación: http://localhost:${PORT}/public/test`);
  console.log(`🎯 Datos disponibles:`);
  console.log(`   - Laboratorios: ${mockLabs.length}`);
  console.log(`   - Reservas: ${mockBookings.length}`);
  console.log(`🌍 Entorno: ${process.env.NODE_ENV || 'development'}`);
});