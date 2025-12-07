require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Datos mock (inline para simplificar deployment)
const mockLabs = [
  {
    id: "WL-001",
    waysoft_id: "NET-LAB-001",
    code: "CISCO-ADV",
    name: "Laboratorio de Redes Avanzadas Cisco",
    description: "Laboratorio especializado en equipos Cisco para prácticas de routing, switching y configuración avanzada de redes empresariales.",
    type: "networking",
    category: "cisco",
    subcategory: "enterprise_networking",
    location: {
      building: "Edificio Tecnológico A",
      floor: "3",
      room: "301-A",
      address: "Carrera 15 #88-64, Bogotá"
    },
    capacity: {
      max_students: 20,
      max_instructors: 2,
      workstations: 20,
      square_meters: 120
    },
    equipment: {
      routers: [
        { model: "Cisco 2901", quantity: 4, specs: "2GE, 4EHWIC, 2PVDM" },
        { model: "Cisco 1941", quantity: 2, specs: "2GE, 2EHWIC" }
      ],
      switches: [
        { model: "Cisco 2960X", quantity: 8, specs: "48 ports, PoE+" },
        { model: "Cisco 3560", quantity: 2, specs: "24 ports, Layer 3" }
      ],
      servers: [
        { model: "Dell R740", quantity: 2, specs: "2x Xeon, 128GB RAM, 4TB SSD" }
      ]
    },
    specifications: {
      network_speed: "1 Gbps dedicado",
      internet_access: true,
      power_backup: true,
      air_conditioning: true,
      security: ["control_access", "cameras", "alarm"]
    },
    schedule: {
      monday: [
        { start: "08:00", end: "12:00", type: "morning" },
        { start: "14:00", end: "18:00", type: "afternoon" }
      ],
      tuesday: [
        { start: "08:00", end: "12:00", type: "morning" },
        { start: "14:00", end: "18:00", type: "afternoon" }
      ],
      wednesday: [
        { start: "08:00", end: "12:00", type: "morning" }
      ],
      thursday: [
        { start: "08:00", end: "12:00", type: "morning" },
        { start: "14:00", end: "18:00", type: "afternoon" }
      ],
      friday: [
        { start: "08:00", end: "12:00", type: "morning" },
        { start: "14:00", end: "16:00", type: "afternoon" }
      ],
      saturday: [
        { start: "09:00", end: "13:00", type: "morning" }
      ],
      sunday: "closed"
    },
    pricing: {
      rates: {
        hourly: 45.50,
        half_day: 180.00,
        full_day: 320.00
      },
      currency: "USD",
      requires_deposit: true,
      deposit_amount: 100.00,
      tax_rate: 19
    },
    requirements: {
      min_participants: 5,
      max_participants: 20,
      requires_instructor: true,
      min_age: 18
    },
    status: "available",
    maintenance: {
      last_maintenance: "2024-01-10",
      next_maintenance: "2024-04-10"
    },
    metadata: {
      created_at: "2023-01-15T00:00:00Z",
      updated_at: "2024-01-15T09:30:00Z",
      rating: 4.7,
      total_bookings: 124
    },
    features: [
      "cisco_equipment",
      "enterprise_grade",
      "high_speed_network",
      "power_backup",
      "air_conditioning",
      "video_conference",
      "projector"
    ],
    images: [
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w-800&auto=format&fit=crop"
    ]
  },
  {
    id: "WL-002",
    waysoft_id: "SEC-LAB-001",
    code: "CYBERSEC-01",
    name: "Laboratorio de Ciberseguridad",
    description: "Laboratorio especializado en pruebas de penetración, análisis de malware y seguridad ofensiva/defensiva.",
    type: "security",
    category: "cybersecurity",
    subcategory: "penetration_testing",
    location: {
      building: "Edificio Seguridad B",
      floor: "2",
      room: "205",
      address: "Calle 100 #15-20, Bogotá"
    },
    capacity: {
      max_students: 15,
      max_instructors: 2,
      workstations: 15,
      square_meters: 90
    },
    equipment: {
      security_devices: [
        { model: "Palo Alto PA-220", quantity: 3, specs: "Firewall NGFW" },
        { model: "FortiGate 60F", quantity: 2, specs: "UTM Firewall" }
      ],
      workstations: [
        { model: "Kali Linux", quantity: 15, specs: "i7, 32GB RAM, 1TB SSD" }
      ]
    },
    specifications: {
      network_speed: "10 Gbps",
      internet_access: true,
      isolated_network: true,
      power_backup: true,
      security: ["biometric_access", "cameras_360", "motion_sensors"]
    },
    schedule: {
      monday: [
        { start: "09:00", end: "13:00", type: "morning" },
        { start: "15:00", end: "19:00", type: "afternoon" }
      ],
      tuesday: [
        { start: "09:00", end: "13:00", type: "morning" },
        { start: "15:00", end: "19:00", type: "afternoon" }
      ],
      wednesday: [
        { start: "09:00", end: "13:00", type: "morning" }
      ],
      thursday: [
        { start: "09:00", end: "13:00", type: "morning" },
        { start: "15:00", end: "19:00", type: "afternoon" }
      ],
      friday: [
        { start: "09:00", end: "13:00", type: "morning" }
      ],
      saturday: [
        { start: "10:00", end: "14:00", type: "morning" }
      ],
      sunday: "closed"
    },
    pricing: {
      rates: {
        hourly: 65.00,
        half_day: 250.00,
        full_day: 450.00
      },
      currency: "USD",
      requires_deposit: true,
      deposit_amount: 200.00,
      tax_rate: 19
    },
    requirements: {
      min_participants: 3,
      max_participants: 15,
      requires_instructor: true,
      instructor_provided: true,
      min_age: 21
    },
    status: "available",
    maintenance: {
      last_maintenance: "2024-01-05",
      next_maintenance: "2024-02-05"
    },
    metadata: {
      created_at: "2023-03-20T00:00:00Z",
      updated_at: "2024-01-12T14:20:00Z",
      rating: 4.9,
      total_bookings: 89
    },
    features: [
      "penetration_testing",
      "malware_analysis",
      "forensic_analysis",
      "isolated_network",
      "biometric_access"
    ],
    images: [
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop"
    ]
  },
  {
    id: "WL-003",
    waysoft_id: "VOIP-LAB-001",
    code: "TELECOM-01",
    name: "Laboratorio de Telecomunicaciones VoIP",
    description: "Laboratorio especializado en sistemas de voz sobre IP, configuración de PBX y calidad de servicio (QoS).",
    type: "telecommunications",
    category: "voip",
    subcategory: "telephony",
    location: {
      building: "Edificio Comunicaciones C",
      floor: "1",
      room: "110",
      address: "Avenida Eldorado #68-20, Bogotá"
    },
    capacity: {
      max_students: 12,
      max_instructors: 1,
      workstations: 12,
      square_meters: 80
    },
    equipment: {
      telephony: [
        { model: "PBX Asterisk", quantity: 2, specs: "32 channels" },
        { model: "Cisco CUCM", quantity: 1, specs: "50 users license" }
      ],
      phones: [
        { model: "Cisco 7962G", quantity: 12, specs: "IP Phone" }
      ],
      gateways: [
        { model: "Cisco 2901 with VIC", quantity: 2, specs: "Voice gateway" }
      ]
    },
    specifications: {
      network_speed: "1 Gbps",
      internet_access: true,
      phone_lines: 24,
      power_backup: true
    },
    schedule: {
      monday: [
        { start: "10:00", end: "14:00", type: "morning" },
        { start: "16:00", end: "20:00", type: "afternoon" }
      ],
      tuesday: [
        { start: "10:00", end: "14:00", type: "morning" }
      ],
      wednesday: [
        { start: "10:00", end: "14:00", type: "morning" },
        { start: "16:00", end: "20:00", type: "afternoon" }
      ],
      thursday: [
        { start: "10:00", end: "14:00", type: "morning" }
      ],
      friday: [
        { start: "10:00", end: "14:00", type: "morning" }
      ],
      saturday: "closed",
      sunday: "closed"
    },
    pricing: {
      rates: {
        hourly: 40.00,
        half_day: 150.00,
        full_day: 280.00
      },
      currency: "USD",
      requires_deposit: false,
      deposit_amount: 0,
      tax_rate: 19
    },
    requirements: {
      min_participants: 2,
      max_participants: 12,
      requires_instructor: false,
      min_age: 16
    },
    status: "maintenance",
    maintenance: {
      last_maintenance: "2023-12-20",
      next_maintenance: "2024-01-25",
      maintenance_reason: "PBX system upgrade"
    },
    metadata: {
      created_at: "2023-05-10T00:00:00Z",
      updated_at: "2024-01-15T11:45:00Z",
      rating: 4.5,
      total_bookings: 67
    },
    features: [
      "voip_systems",
      "pbx_configuration",
      "qos_testing",
      "call_analysis"
    ],
    images: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop"
    ]
  },
  {
    id: "WL-004",
    waysoft_id: "WIFI-LAB-001",
    code: "WIRELESS-01",
    name: "Laboratorio de Redes Inalámbricas",
    description: "Laboratorio para diseño, implementación y troubleshooting de redes WiFi empresariales y de campus.",
    type: "wireless",
    category: "wifi",
    subcategory: "enterprise_wifi",
    location: {
      building: "Edificio Innovación D",
      floor: "4",
      room: "410",
      address: "Carrera 7 #77-07, Bogotá"
    },
    capacity: {
      max_students: 10,
      max_instructors: 1,
      workstations: 10,
      square_meters: 75
    },
    equipment: {
      access_points: [
        { model: "Cisco Aironet 2802", quantity: 6, specs: "802.11ac Wave 2" },
        { model: "Ubiquiti UniFi 6 Pro", quantity: 4, specs: "802.11ax" }
      ],
      controllers: [
        { model: "Cisco 3504 WLC", quantity: 1, specs: "25 AP license" }
      ],
      analyzers: [
        { model: "Ekahau Sidekick 2", quantity: 1, specs: "Spectrum analyzer" }
      ]
    },
    specifications: {
      network_speed: "2.4 Gbps",
      internet_access: true,
      frequency_bands: ["2.4 GHz", "5 GHz", "6 GHz"],
      power_backup: true
    },
    schedule: {
      monday: [
        { start: "08:00", end: "12:00", type: "morning" }
      ],
      tuesday: [
        { start: "08:00", end: "12:00", type: "morning" },
        { start: "14:00", end: "18:00", type: "afternoon" }
      ],
      wednesday: [
        { start: "08:00", end: "12:00", type: "morning" }
      ],
      thursday: [
        { start: "08:00", end: "12:00", type: "morning" },
        { start: "14:00", end: "18:00", type: "afternoon" }
      ],
      friday: [
        { start: "08:00", end: "12:00", type: "morning" }
      ],
      saturday: [
        { start: "09:00", end: "13:00", type: "morning" }
      ],
      sunday: "closed"
    },
    pricing: {
      rates: {
        hourly: 48.00,
        half_day: 180.00,
        full_day: 340.00
      },
      currency: "USD",
      requires_deposit: true,
      deposit_amount: 80.00,
      tax_rate: 19
    },
    requirements: {
      min_participants: 2,
      max_participants: 10,
      requires_instructor: false,
      min_age: 18
    },
    status: "available",
    maintenance: {
      last_maintenance: "2024-01-05",
      next_maintenance: "2024-04-05"
    },
    metadata: {
      created_at: "2023-07-15T00:00:00Z",
      updated_at: "2024-01-14T16:20:00Z",
      rating: 4.6,
      total_bookings: 45
    },
    features: [
      "wifi_design",
      "site_survey",
      "spectrum_analysis",
      "outdoor_testing",
      "multiple_vendors"
    ],
    images: [
      "https://images.unsplash.com/photo-1546054451-aa7ff98a6bda?w=800&auto=format&fit=crop"
    ]
  }
];

const mockBookings = [
  {
    id: "WS-B001",
    booking_id: "WAYSOFT-2024-001",
    external_id: "REFLEX-BKG-001",
    reference_code: "WS001-REF001",
    lab: {
      id: "WL-001",
      waysoft_id: "NET-LAB-001",
      name: "Laboratorio de Redes Avanzadas Cisco",
      code: "CISCO-ADV"
    },
    user: {
      id: "reflex-user-001",
      waysoft_client_id: "WAYSOFT-CLIENT-001",
      name: "Juan Pérez Rodríguez",
      email: "juan.perez@reflex.com",
      company: "Reflex Tech Solutions"
    },
    schedule: {
      date: "2024-02-15",
      start_time: "14:00",
      end_time: "16:00",
      duration_hours: 2,
      timezone: "America/Bogota"
    },
    purpose: {
      category: "training",
      title: "Práctica de configuración OSPF y EIGRP",
      description: "Sesión práctica para estudiantes de certificación CCNA"
    },
    participants: {
      total: 8,
      instructors: 1,
      students: 7
    },
    pricing: {
      base_rate: 45.50,
      hours: 2,
      subtotal: 91.00,
      taxes: {
        percentage: 19,
        amount: 17.29
      },
      total_amount: 108.29,
      currency: "USD",
      payment_status: "paid",
      payment_method: "credit_card"
    },
    status: "confirmed",
    status_history: [
      {
        status: "requested",
        timestamp: "2024-01-10T09:30:00Z",
        notes: "Reserva solicitada"
      },
      {
        status: "confirmed",
        timestamp: "2024-01-10T10:15:00Z",
        notes: "Pago confirmado"
      }
    ],
    cancellation_policy: {
      allowed: true,
      deadline: "2024-02-13T14:00:00Z",
      refund_percentage: 80
    }
  },
  {
    id: "WS-B002",
    booking_id: "WAYSOFT-2024-002",
    external_id: "REFLEX-BKG-002",
    reference_code: "WS002-REF002",
    lab: {
      id: "WL-002",
      waysoft_id: "SEC-LAB-001",
      name: "Laboratorio de Ciberseguridad",
      code: "CYBERSEC-01"
    },
    user: {
      id: "reflex-user-002",
      waysoft_client_id: "WAYSOFT-CLIENT-002",
      name: "María García López",
      email: "maria.garcia@reflex.com",
      company: "Reflex Security Labs"
    },
    schedule: {
      date: "2024-02-20",
      start_time: "15:00",
      end_time: "18:00",
      duration_hours: 3,
      timezone: "America/Bogota"
    },
    purpose: {
      category: "workshop",
      title: "Taller de Pentesting Básico",
      description: "Introducción a técnicas de pruebas de penetración"
    },
    participants: {
      total: 12,
      instructors: 1,
      students: 11
    },
    pricing: {
      base_rate: 65.00,
      hours: 3,
      subtotal: 195.00,
      taxes: {
        percentage: 19,
        amount: 37.05
      },
      total_amount: 232.05,
      currency: "USD",
      payment_status: "pending",
      payment_method: "bank_transfer"
    },
    status: "pending_payment",
    status_history: [
      {
        status: "requested",
        timestamp: "2024-01-12T14:20:00Z",
        notes: "Reserva solicitada"
      },
      {
        status: "pending_payment",
        timestamp: "2024-01-12T14:25:00Z",
        notes: "Esperando pago"
      }
    ],
    cancellation_policy: {
      allowed: true,
      deadline: "2024-02-17T15:00:00Z",
      refund_percentage: 70
    }
  },
  {
    id: "WS-B003",
    booking_id: "WAYSOFT-2024-003",
    external_id: "REFLEX-BKG-003",
    reference_code: "WS003-REF003",
    lab: {
      id: "WL-001",
      waysoft_id: "NET-LAB-001",
      name: "Laboratorio de Redes Avanzadas Cisco",
      code: "CISCO-ADV"
    },
    user: {
      id: "reflex-user-003",
      waysoft_client_id: "WAYSOFT-CLIENT-003",
      name: "Carlos Rodríguez Vargas",
      email: "carlos.rodriguez@reflex.com",
      company: "Reflex Networking Academy"
    },
    schedule: {
      date: "2024-01-25",
      start_time: "19:00",
      end_time: "22:00",
      duration_hours: 3,
      timezone: "America/Bogota"
    },
    purpose: {
      category: "certification",
      title: "Sesión de Práctica para Examen CCNA",
      description: "Sesión intensiva de práctica para examen CCNA 200-301"
    },
    participants: {
      total: 15,
      instructors: 1,
      students: 14
    },
    pricing: {
      base_rate: 45.50,
      hours: 3,
      subtotal: 136.50,
      taxes: {
        percentage: 19,
        amount: 25.94
      },
      total_amount: 162.44,
      currency: "USD",
      payment_status: "paid",
      payment_method: "paypal"
    },
    status: "completed",
    status_history: [
      {
        status: "requested",
        timestamp: "2023-12-20T11:15:00Z",
        notes: "Reserva solicitada"
      },
      {
        status: "confirmed",
        timestamp: "2023-12-20T11:30:00Z",
        notes: "Pago confirmado"
      },
      {
        status: "completed",
        timestamp: "2024-01-25T22:00:00Z",
        notes: "Sesión finalizada"
      }
    ],
    cancellation_policy: {
      allowed: false,
      deadline: "2024-01-23T19:00:00Z",
      refund_percentage: 0
    }
  }
];

const app = express();
const PORT = process.env.PORT || 4000;
const API_KEY = process.env.API_KEY || 'waysoft-mock-api-key-2024';

// ======================
// CONFIGURACIÓN CORS PARA INTERNET
// ======================

// CORS completamente abierto para Internet
app.use(cors({
  origin: '*', // Permitir desde cualquier origen
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-api-key', 'Authorization', 'Accept'],
  credentials: false,
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// Headers de seguridad
app.use((req, res, next) => {
  // Headers para APIs públicas en Internet
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, x-api-key, Authorization');
  res.header('X-Powered-By', 'Waysoft Mock API');
  res.header('X-Version', '1.0.0');
  res.header('X-Environment', process.env.NODE_ENV || 'production');
  
  // Cache control para API
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
  // Endpoints públicos que no requieren autenticación
  const publicEndpoints = ['/', '/health', '/public', '/public/*', '/api-docs', '/status'];
  
  // Verificar si es endpoint público
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
  
  // Obtener API Key de diferentes fuentes
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

// Aplicar autenticación a todas las rutas excepto públicas
app.use(authenticateApiKey);

// ======================
// ENDPOINTS PÚBLICOS (SIN AUTENTICACIÓN)
// ======================

// Página principal
app.get('/', (req, res) => {
  res.json({
    message: "🎯 Waysoft Mock API - Servicio de Simulación",
    description: "API mock para pruebas de integración con Waysoft desde Reflex",
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
        bookings: "/bookings",
        availability: "/availability/:labId"
      }
    },
    usage: {
      api_key: "waysoft-mock-api-key-2024",
      example: "curl -H 'x-api-key: waysoft-mock-api-key-2024' https://tu-api.com/labs"
    },
    source: "https://github.com/dfmarinl/Integracion-",
    deployed_at: new Date().toISOString()
  });
});

// Health Check
app.get('/health', (req, res) => {
  res.json({
    status: "healthy",
    service: "Waysoft Mock API",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    environment: process.env.NODE_ENV || 'production'
  });
});

// Status del servicio
app.get('/status', (req, res) => {
  res.json({
    status: "operational",
    service: "Waysoft Mock API",
    version: "1.0.0",
    data: {
      labs: mockLabs.length,
      bookings: mockBookings.length,
      available_labs: mockLabs.filter(l => l.status === 'available').length
    },
    last_updated: new Date().toISOString()
  });
});

// Documentación de la API
app.get('/api-docs', (req, res) => {
  res.json({
    title: "Waysoft Mock API Documentation",
    description: "API para simular integración con Waysoft - Solo consultas GET",
    base_url: `${req.protocol}://${req.get('host')}`,
    authentication: {
      method: "API Key",
      header: "x-api-key",
      value: "waysoft-mock-api-key-2024"
    },
    endpoints: [
      {
        method: "GET",
        path: "/labs",
        description: "Obtener todos los laboratorios",
        parameters: [
          { name: "status", type: "query", example: "available" },
          { name: "category", type: "query", example: "cisco" },
          { name: "page", type: "query", example: "1" },
          { name: "limit", type: "query", example: "10" }
        ]
      },
      {
        method: "GET",
        path: "/labs/:id",
        description: "Obtener un laboratorio específico",
        parameters: [
          { name: "id", type: "path", example: "WL-001" }
        ]
      },
      {
        method: "GET",
        path: "/bookings",
        description: "Obtener todas las reservas",
        parameters: [
          { name: "userId", type: "query", example: "reflex-user-001" },
          { name: "status", type: "query", example: "confirmed" }
        ]
      },
      {
        method: "GET",
        path: "/availability/:labId",
        description: "Verificar disponibilidad de laboratorio",
        parameters: [
          { name: "labId", type: "path", example: "WL-001" },
          { name: "date", type: "query", example: "2024-02-15" },
          { name: "startTime", type: "query", example: "14:00" },
          { name: "endTime", type: "query", example: "16:00" }
        ]
      }
    ],
    examples: {
      curl: "curl -H 'x-api-key: waysoft-mock-api-key-2024' https://tu-api.com/labs",
      javascript: `fetch('https://tu-api.com/labs', {
  headers: { 'x-api-key': 'waysoft-mock-api-key-2024' }
})`,
      python: `import requests
headers = {'x-api-key': 'waysoft-mock-api-key-2024'}
response = requests.get('https://tu-api.com/labs', headers=headers)`
    }
  });
});

// Endpoint de prueba pública
app.get('/public/test', (req, res) => {
  res.json({
    message: "✅ Waysoft Mock API funcionando correctamente",
    test: "Puedes usar este endpoint sin autenticación",
    data: {
      sample_lab: {
        id: mockLabs[0]?.id,
        name: mockLabs[0]?.name,
        status: mockLabs[0]?.status
      },
      total_labs: mockLabs.length,
      total_bookings: mockBookings.length
    },
    next_steps: [
      "1. Usa el API Key: waysoft-mock-api-key-2024",
      "2. Prueba el endpoint: /labs",
      "3. Consulta la documentación: /api-docs"
    ]
  });
});

// ======================
// ENDPOINTS PROTEGIDOS (REQUIEREN API KEY)
// ======================

// 1. Obtener TODOS los laboratorios
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
    
    // Aplicar filtros
    if (status) {
      labs = labs.filter(lab => lab.status === status);
    }
    
    if (category) {
      labs = labs.filter(lab => lab.category === category);
    }
    
    if (type) {
      labs = labs.filter(lab => lab.type === type);
    }
    
    if (min_capacity) {
      labs = labs.filter(lab => lab.capacity.max_students >= parseInt(min_capacity));
    }
    
    if (max_capacity) {
      labs = labs.filter(lab => lab.capacity.max_students <= parseInt(max_capacity));
    }
    
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
          formatted: `${lab.pricing.currency === 'USD' ? '$' : '€'}${lab.pricing.rates.hourly}/h`
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
        total_items: labs.length,
        total_pages: Math.ceil(labs.length / limitNum),
        has_next_page: endIndex < labs.length,
        has_prev_page: startIndex > 0
      },
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
      error: "Error interno del servidor"
    });
  }
});

// 2. Obtener un laboratorio por ID
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
      .slice(0, 3)
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
      .slice(0, 2)
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
        message: isCurrentlyAvailable ? 
          "✅ Laboratorio disponible ahora" : 
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
        lab_status: lab.status
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

// 4. Obtener horarios de un laboratorio
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

// 5. Obtener todas las reservas
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
    
    // Aplicar filtros
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

// 6. Obtener reservas de un usuario específico
app.get('/users/:userId/bookings', (req, res) => {
  try {
    const { userId } = req.params;
    const { 
      status, 
      include_past = 'true',
      include_upcoming = 'true'
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
        .reduce((sum, b) => sum + b.pricing.total_amount, 0)
    };
    
    res.json({
      success: true,
      userId,
      data: formattedBookings,
      statistics: userStats,
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

// 7. Obtener una reserva específica
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

// 8. Buscar laboratorios
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
      lab.features.some(feature => feature.toLowerCase().includes(searchTerm))
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
      currency: lab.pricing.currency
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

// 9. Estadísticas
app.get('/stats', (req, res) => {
  try {
    const stats = {
      labs: {
        total: mockLabs.length,
        available: mockLabs.filter(l => l.status === 'available').length,
        in_maintenance: mockLabs.filter(l => l.status === 'maintenance').length,
        by_category: mockLabs.reduce((acc, lab) => {
          acc[lab.category] = (acc[lab.category] || 0) + 1;
          return acc;
        }, {})
      },
      bookings: {
        total: mockBookings.length,
        by_status: mockBookings.reduce((acc, b) => {
          acc[b.status] = (acc[b.status] || 0) + 1;
          return acc;
        }, {}),
        revenue: mockBookings
          .filter(b => b.pricing.payment_status === 'paid')
          .reduce((sum, b) => sum + b.pricing.total_amount, 0)
      },
      capacity: {
        total_seats: mockLabs.reduce((sum, lab) => sum + lab.capacity.max_students, 0),
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

// 10. Obtener laboratorios por categoría
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

// ======================
// FUNCIONES AUXILIARES
// ======================

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

// ======================
// MANEJO DE ERRORES
// ======================

// 404 Handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: "Endpoint no encontrado",
    path: req.originalUrl,
    method: req.method,
    available_endpoints: [
      "GET /",
      "GET /health",
      "GET /status",
      "GET /api-docs",
      "GET /public/test",
      "GET /labs",
      "GET /labs/:id",
      "GET /labs/:id/schedule",
      "GET /availability/:labId",
      "GET /bookings",
      "GET /users/:userId/bookings",
      "GET /bookings/:bookingId",
      "GET /search/labs",
      "GET /stats",
      "GET /categories/:category/labs"
    ],
    documentation: `${req.protocol}://${req.get('host')}/api-docs`
  });
});

// Error Handler global
app.use((err, req, res, next) => {
  console.error('Error global:', err);
  
  res.status(500).json({
    success: false,
    error: "Error interno del servidor",
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
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
║           🚀 WAYSOFT MOCK API - DESPLEGADO              ║
╠══════════════════════════════════════════════════════════╣
║  Puerto:         ${PORT}${' '.repeat(38 - PORT.toString().length)}║
║  Entorno:        ${process.env.NODE_ENV || 'production'}${' '.repeat(38 - (process.env.NODE_ENV || 'production').length)}║
║  CORS:           Activado para Internet                 ║
║  API Key:        waysoft-mock-api-key-2024              ║
╠══════════════════════════════════════════════════════════╣
║  📊 Datos disponibles:                                  ║
║    • Laboratorios: ${mockLabs.length}${' '.repeat(33 - mockLabs.length.toString().length)}║
║    • Reservas:    ${mockBookings.length}${' '.repeat(33 - mockBookings.length.toString().length)}║
╠══════════════════════════════════════════════════════════╣
║  🌐 Endpoints públicos:                                 ║
║    • /           - Página principal                     ║
║    • /health     - Health check                         ║
║    • /status     - Estado del servicio                  ║
║    • /api-docs   - Documentación                        ║
║    • /public/test- Prueba sin autenticación             ║
╠══════════════════════════════════════════════════════════╣
║  🔐 Endpoints protegidos (requieren API Key):           ║
║    • /labs       - Todos los laboratorios               ║
║    • /bookings   - Todas las reservas                   ║
║    • /stats      - Estadísticas                         ║
╚══════════════════════════════════════════════════════════╝

✅ API lista para recibir peticiones desde cualquier origen
🔑 Usa el header: x-api-key: waysoft-mock-api-key-2024
📚 Documentación disponible en: /api-docs
  `);
});