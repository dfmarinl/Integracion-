/**
 * Datos mock de reservas de Waysoft
 */

const mockBookings = [
  {
    // Identificadores
    id: "WS-B001",
    booking_id: "WAYSOFT-2024-001",
    external_id: "REFLEX-BKG-001",
    reference_code: "WS001-REF001",
    
    // Información del laboratorio
    lab: {
      id: "WL-001",
      waysoft_id: "NET-LAB-001",
      name: "Laboratorio de Redes Avanzadas Cisco",
      code: "CISCO-ADV"
    },
    
    // Información del usuario
    user: {
      id: "reflex-user-001",
      waysoft_client_id: "WAYSOFT-CLIENT-001",
      name: "Juan Pérez Rodríguez",
      email: "juan.perez@reflex.com",
      phone: "+57 300 123 4567",
      company: "Reflex Tech Solutions",
      identification: {
        type: "CC",
        number: "12345678",
        issued_in: "Bogotá"
      }
    },
    
    // Detalles de la reserva
    schedule: {
      date: "2024-02-15",
      start_time: "14:00",
      end_time: "16:00",
      duration_hours: 2,
      timezone: "America/Bogota",
      day_of_week: "thursday"
    },
    
    purpose: {
      category: "training",
      subcategory: "ccna_practice",
      title: "Práctica de configuración OSPF y EIGRP",
      description: "Sesión práctica para estudiantes de certificación CCNA, enfocada en protocolos de routing avanzado.",
      learning_objectives: [
        "Configurar OSPF multi-area",
        "Implementar EIGRP named mode",
        "Troubleshooting de routing protocols"
      ]
    },
    
    participants: {
      total: 8,
      instructors: 1,
      students: 7,
      list: [
        { name: "Juan Pérez", role: "instructor", email: "juan.perez@reflex.com" },
        { name: "Ana López", role: "student", email: "ana.lopez@reflex.com" },
        { name: "Carlos Ramírez", role: "student", email: "carlos.ramirez@reflex.com" }
      ]
    },
    
    // Equipamiento solicitado
    equipment_requested: {
      mandatory: [
        "Cisco Router 2901 (x4)",
        "Cisco Switch 2960X (x8)",
        "Console cables (x12)"
      ],
      optional: [
        "Servidor Dell R740",
        "Firewall ASA 5506"
      ],
      special_requests: "Necesitamos asistente técnico durante la sesión"
    },
    
    // Precios y pagos
    pricing: {
      base_rate: 45.50,
      hours: 2,
      subtotal: 91.00,
      taxes: {
        percentage: 19,
        amount: 17.29,
        type: "IVA"
      },
      deposit: {
        required: true,
        amount: 100.00,
        paid: true,
        refundable: true
      },
      discounts: [
        {
          type: "academic",
          percentage: 15,
          amount: 13.65,
          reason: "Descuento académico para universidad"
        }
      ],
      total_amount: 94.64,
      currency: "USD",
      payment_status: "paid",
      payment_method: "credit_card",
      transaction_id: "TXN-CC-001-2024",
      invoice_number: "FACT-001-2024"
    },
    
    // Estado y flujo
    status: "confirmed",
    status_history: [
      {
        status: "requested",
        timestamp: "2024-01-10T09:30:00Z",
        user: "system",
        notes: "Reserva solicitada desde plataforma Reflex"
      },
      {
        status: "pending_payment",
        timestamp: "2024-01-10T09:35:00Z",
        user: "system",
        notes: "Esperando confirmación de pago"
      },
      {
        status: "confirmed",
        timestamp: "2024-01-10T10:15:00Z",
        user: "payment_gateway",
        notes: "Pago confirmado exitosamente"
      }
    ],
    
    // Políticas de cancelación
    cancellation_policy: {
      allowed: true,
      deadline: "2024-02-13T14:00:00Z",  // 48 horas antes
      refund_percentage: 80,
      penalty_fee: 18.20,
      terms: "Cancelación permitida hasta 48 horas antes sin penalidad completa"
    },
    
    // Check-in / Check-out
    attendance: {
      scheduled_checkin: "2024-02-15T13:45:00Z",
      scheduled_checkout: "2024-02-15T16:15:00Z",
      actual_checkin: null,
      actual_checkout: null,
      checkin_instructions: "Presentar identificación en recepción del Edificio A"
    },
    
    // Documentos y certificados
    documents: {
      confirmation_pdf: "https://api.waysoft.com/documents/confirmations/WS001-REF001.pdf",
      invoice_pdf: "https://api.waysoft.com/documents/invoices/FACT-001-2024.pdf",
      safety_instructions: "https://api.waysoft.com/documents/safety/lab-301.pdf",
      certificate_template: "https://api.waysoft.com/documents/certificates/template.docx"
    },
    
    // Notificaciones
    notifications: {
      sent: [
        {
          type: "confirmation",
          sent_at: "2024-01-10T10:20:00Z",
          recipient: "juan.perez@reflex.com",
          status: "delivered"
        },
        {
          type: "reminder_48h",
          scheduled: "2024-02-13T14:00:00Z",
          recipient: "juan.perez@reflex.com"
        }
      ]
    },
    
    // Metadatos
    metadata: {
      created_by: "reflex_integration_api",
      created_at: "2024-01-10T09:30:00Z",
      updated_at: "2024-01-10T10:15:00Z",
      source: "reflex_platform",
      integration_version: "2.1.0",
      ip_address: "190.24.156.78",
      user_agent: "Reflex-WebApp/1.0"
    },
    
    // Etiquetas para búsqueda
    tags: ["training", "ccna", "cisco", "academic", "confirmed", "paid"]
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
      phone: "+57 310 987 6543",
      company: "Reflex Security Labs",
      identification: {
        type: "CC",
        number: "87654321",
        issued_in: "Medellín"
      }
    },
    
    schedule: {
      date: "2024-02-20",
      start_time: "15:00",
      end_time: "18:00",
      duration_hours: 3,
      timezone: "America/Bogota",
      day_of_week: "tuesday"
    },
    
    purpose: {
      category: "workshop",
      subcategory: "penetration_testing",
      title: "Taller de Pentesting Básico",
      description: "Introducción a técnicas de pruebas de penetración para desarrolladores y administradores de sistemas.",
      learning_objectives: [
        "Reconocimiento de objetivos",
        "Escaneo de puertos y servicios",
        "Explotación básica de vulnerabilidades",
        "Generación de reportes"
      ]
    },
    
    participants: {
      total: 12,
      instructors: 1,
      students: 11,
      list: [
        { name: "María García", role: "instructor", email: "maria.garcia@reflex.com" },
        { name: "Pedro Martínez", role: "student", email: "pedro.martinez@reflex.com" }
      ]
    },
    
    equipment_requested: {
      mandatory: [
        "Estaciones Kali Linux (x12)",
        "Firewall Palo Alto PA-220",
        "Switch gestionado"
      ],
      optional: [],
      special_requests: "Materiales del taller incluidos: guías y VMs preconfiguradas"
    },
    
    pricing: {
      base_rate: 65.00,
      hours: 3,
      subtotal: 195.00,
      taxes: {
        percentage: 19,
        amount: 37.05,
        type: "IVA"
      },
      deposit: {
        required: true,
        amount: 200.00,
        paid: false,
        refundable: true
      },
      discounts: [
        {
          type: "corporate",
          percentage: 10,
          amount: 19.50,
          reason: "Descuento corporativo para Reflex Security Labs"
        }
      ],
      total_amount: 212.55,
      currency: "USD",
      payment_status: "pending",
      payment_method: "bank_transfer",
      transaction_id: null,
      invoice_number: "FACT-002-2024"
    },
    
    status: "pending_payment",
    status_history: [
      {
        status: "requested",
        timestamp: "2024-01-12T14:20:00Z",
        user: "system",
        notes: "Reserva solicitada desde plataforma Reflex"
      },
      {
        status: "pending_payment",
        timestamp: "2024-01-12T14:25:00Z",
        user: "system",
        notes: "Esperando transferencia bancaria"
      }
    ],
    
    cancellation_policy: {
      allowed: true,
      deadline: "2024-02-17T15:00:00Z",  // 72 horas antes
      refund_percentage: 70,
      penalty_fee: 58.50,
      terms: "Cancelación con 72 horas de anticipación para reembolso parcial"
    },
    
    attendance: {
      scheduled_checkin: "2024-02-20T14:45:00Z",
      scheduled_checkout: "2024-02-20T18:15:00Z",
      actual_checkin: null,
      actual_checkout: null,
      checkin_instructions: "Registro en seguridad del Edificio B con documento de identidad"
    },
    
    documents: {
      confirmation_pdf: "https://api.waysoft.com/documents/confirmations/WS002-REF002.pdf",
      invoice_pdf: "https://api.waysoft.com/documents/invoices/FACT-002-2024.pdf",
      nda_required: "https://api.waysoft.com/documents/nda/standard.pdf",
      workshop_materials: "https://api.waysoft.com/documents/workshops/pentesting-basico.zip"
    },
    
    notifications: {
      sent: [
        {
          type: "confirmation_pending",
          sent_at: "2024-01-12T14:30:00Z",
          recipient: "maria.garcia@reflex.com",
          status: "delivered"
        }
      ]
    },
    
    metadata: {
      created_by: "reflex_integration_api",
      created_at: "2024-01-12T14:20:00Z",
      updated_at: "2024-01-12T14:25:00Z",
      source: "reflex_platform",
      integration_version: "2.1.0",
      ip_address: "190.35.167.42",
      user_agent: "Reflex-WebApp/1.0"
    },
    
    tags: ["workshop", "pentesting", "security", "pending_payment", "corporate"]
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
      phone: "+57 320 555 1212",
      company: "Reflex Networking Academy",
      identification: {
        type: "CC",
        number: "11223344",
        issued_in: "Cali"
      }
    },
    
    schedule: {
      date: "2024-01-25",
      start_time: "19:00",
      end_time: "22:00",
      duration_hours: 3,
      timezone: "America/Bogota",
      day_of_week: "thursday"
    },
    
    purpose: {
      category: "certification",
      subcategory: "ccna_exam_prep",
      title: "Sesión de Práctica para Examen CCNA",
      description: "Sesión intensiva de práctica para estudiantes próximos a presentar el examen CCNA 200-301.",
      learning_objectives: [
        "Práctica de comandos CLI",
        "Configuración de VLANs y trunking",
        "Troubleshooting de conectividad",
        "Simulación de escenarios de examen"
      ]
    },
    
    participants: {
      total: 15,
      instructors: 1,
      students: 14,
      list: [
        { name: "Carlos Rodríguez", role: "instructor", email: "carlos.rodriguez@reflex.com" },
        { name: "Luisa Fernández", role: "student", email: "luisa.fernandez@reflex.com" }
      ]
    },
    
    equipment_requested: {
      mandatory: [
        "Todos los routers disponibles",
        "Todos los switches disponibles",
        "Consolas de acceso"
      ],
      optional: [
        "Servidores para prácticas adicionales"
      ],
      special_requests: "Acceso a materiales de certificación oficiales de Cisco"
    },
    
    pricing: {
      base_rate: 45.50,
      hours: 3,
      subtotal: 136.50,
      taxes: {
        percentage: 19,
        amount: 25.94,
        type: "IVA"
      },
      deposit: {
        required: true,
        amount: 100.00,
        paid: true,
        refundable: true
      },
      discounts: [
        {
          type: "bulk_booking",
          percentage: 10,
          amount: 13.65,
          reason: "Descuento por grupo de 15+ participantes"
        }
      ],
      total_amount: 148.79,
      currency: "USD",
      payment_status: "paid",
      payment_method: "paypal",
      transaction_id: "TXN-PP-003-2024",
      invoice_number: "FACT-003-2024"
    },
    
    status: "completed",
    status_history: [
      {
        status: "requested",
        timestamp: "2023-12-20T11:15:00Z",
        user: "system",
        notes: "Reserva solicitada desde plataforma Reflex"
      },
      {
        status: "confirmed",
        timestamp: "2023-12-20T11:30:00Z",
        user: "payment_gateway",
        notes: "Pago confirmado vía PayPal"
      },
      {
        status: "in_progress",
        timestamp: "2024-01-25T19:00:00Z",
        user: "lab_assistant",
        notes: "Sesión iniciada, todos los participantes presentes"
      },
      {
        status: "completed",
        timestamp: "2024-01-25T22:00:00Z",
        user: "lab_assistant",
        notes: "Sesión finalizada, equipo revisado y en buen estado"
      }
    ],
    
    cancellation_policy: {
      allowed: false,
      deadline: "2024-01-23T19:00:00Z",
      refund_percentage: 0,
      penalty_fee: 136.50,
      terms: "No se permiten cancelaciones por ser sesión de certificación"
    },
    
    attendance: {
      scheduled_checkin: "2024-01-25T18:45:00Z",
      scheduled_checkout: "2024-01-25T22:15:00Z",
      actual_checkin: "2024-01-25T18:50:00Z",
      actual_checkout: "2024-01-25T22:05:00Z",
      attendance_rate: 100,
      notes: "Todos los participantes asistieron puntualmente"
    },
    
    documents: {
      confirmation_pdf: "https://api.waysoft.com/documents/confirmations/WS003-REF003.pdf",
      invoice_pdf: "https://api.waysoft.com/documents/invoices/FACT-003-2024.pdf",
      attendance_list: "https://api.waysoft.com/documents/attendance/WS003-REF003.pdf",
      completion_certificates: "https://api.waysoft.com/documents/certificates/WS003-REF003.zip"
    },
    
    feedback: {
      rating: 4.8,
      comments: "Excelente sesión, el equipo funcionó perfectamente",
      submitted_by: "Carlos Rodríguez",
      submitted_at: "2024-01-26T09:30:00Z"
    },
    
    metadata: {
      created_by: "reflex_integration_api",
      created_at: "2023-12-20T11:15:00Z",
      updated_at: "2024-01-26T09:30:00Z",
      source: "reflex_platform",
      integration_version: "1.1.0",
      ip_address: "186.84.123.95",
      user_agent: "Reflex-WebApp/1.0"
    },
    
    tags: ["certification", "ccna", "completed", "paid", "academy", "exam_prep"]
  },
  
  {
    id: "WS-B004",
    booking_id: "WAYSOFT-2024-004",
    external_id: "REFLEX-BKG-004",
    reference_code: "WS004-REF004",
    
    lab: {
      id: "WL-004",
      waysoft_id: "WIFI-LAB-001",
      name: "Laboratorio de Redes Inalámbricas",
      code: "WIRELESS-01"
    },
    
    user: {
      id: "reflex-user-001",
      waysoft_client_id: "WAYSOFT-CLIENT-001",
      name: "Juan Pérez Rodríguez",
      email: "juan.perez@reflex.com",
      phone: "+57 300 123 4567",
      company: "Reflex Tech Solutions",
      identification: {
        type: "CC",
        number: "12345678",
        issued_in: "Bogotá"
      }
    },
    
    schedule: {
      date: "2024-02-10",
      start_time: "08:00",
      end_time: "12:00",
      duration_hours: 4,
      timezone: "America/Bogota",
      day_of_week: "saturday"
    },
    
    purpose: {
      category: "field_testing",
      subcategory: "wifi_coverage",
      title: "Pruebas de Cobertura WiFi en Campus",
      description: "Pruebas de campo para determinar cobertura WiFi en áreas exteriores del campus universitario.",
      learning_objectives: [
        "Análisis de espectro radioeléctrico",
        "Medición de señal y ruido",
        "Optimización de placement de APs",
        "Generación de heatmaps"
      ]
    },
    
    participants: {
      total: 6,
      instructors: 1,
      students: 5,
      list: [
        { name: "Juan Pérez", role: "instructor", email: "juan.perez@reflex.com" },
        { name: "Sofía Ramírez", role: "student", email: "sofia.ramirez@reflex.com" }
      ]
    },
    
    equipment_requested: {
      mandatory: [
        "Access Points Cisco Aironet (x6)",
        "Analizador de espectro Ekahau",
        "Antenas direccionales"
      ],
      optional: [
        "Rover para pruebas móviles",
        "Baterías adicionales"
      ],
      special_requests: "Necesitamos acceso al área exterior del edificio para pruebas"
    },
    
    pricing: {
      base_rate: 48.00,
      hours: 4,
      subtotal: 192.00,
      taxes: {
        percentage: 19,
        amount: 36.48,
        type: "IVA"
      },
      deposit: {
        required: true,
        amount: 80.00,
        paid: true,
        refundable: true
      },
      discounts: [
        {
          type: "academic",
          percentage: 15,
          amount: 28.80,
          reason: "Descuento académico para proyecto universitario"
        }
      ],
      total_amount: 199.68,
      currency: "USD",
      payment_status: "paid",
      payment_method: "credit_card",
      transaction_id: "TXN-CC-004-2024",
      invoice_number: "FACT-004-2024"
    },
    
    status: "confirmed",
    status_history: [
      {
        status: "requested",
        timestamp: "2024-01-15T16:45:00Z",
        user: "system",
        notes: "Reserva solicitada desde plataforma Reflex"
      },
      {
        status: "confirmed",
        timestamp: "2024-01-15T17:10:00Z",
        user: "payment_gateway",
        notes: "Pago confirmado exitosamente"
      }
    ],
    
    cancellation_policy: {
      allowed: true,
      deadline: "2024-02-08T08:00:00Z",  // 48 horas antes
      refund_percentage: 80,
      penalty_fee: 38.40,
      terms: "Cancelación estándar de 48 horas"
    },
    
    attendance: {
      scheduled_checkin: "2024-02-10T07:45:00Z",
      scheduled_checkout: "2024-02-10T12:15:00Z",
      actual_checkin: null,
      actual_checkout: null,
      checkin_instructions: "Reunión en lobby del Edificio D, traer identificación"
    },
    
    documents: {
      confirmation_pdf: "https://api.waysoft.com/documents/confirmations/WS004-REF004.pdf",
      invoice_pdf: "https://api.waysoft.com/documents/invoices/FACT-004-2024.pdf",
      outdoor_access_form: "https://api.waysoft.com/documents/access/outdoor-form.pdf",
      safety_guidelines: "https://api.waysoft.com/documents/safety/outdoor-testing.pdf"
    },
    
    notifications: {
      sent: [
        {
          type: "confirmation",
          sent_at: "2024-01-15T17:15:00Z",
          recipient: "juan.perez@reflex.com",
          status: "delivered"
        }
      ]
    },
    
    metadata: {
      created_by: "reflex_integration_api",
      created_at: "2024-01-15T16:45:00Z",
      updated_at: "2024-01-15T17:10:00Z",
      source: "reflex_platform",
      integration_version: "2.1.0",
      ip_address: "190.24.156.78",
      user_agent: "Reflex-WebApp/1.0"
    },
    
    tags: ["field_testing", "wifi", "outdoor", "confirmed", "paid", "academic"]
  },
  
  {
    id: "WS-B005",
    booking_id: "WAYSOFT-2023-015",
    external_id: "REFLEX-BKG-015",
    reference_code: "WS015-REF015",
    
    lab: {
      id: "WL-002",
      waysoft_id: "SEC-LAB-001",
      name: "Laboratorio de Ciberseguridad",
      code: "CYBERSEC-01"
    },
    
    user: {
      id: "reflex-user-004",
      waysoft_client_id: "WAYSOFT-CLIENT-004",
      name: "Ana Martínez Ruiz",
      email: "ana.martinez@reflex.com",
      phone: "+57 315 777 8888",
      company: "Reflex Cyber Defense",
      identification: {
        type: "CC",
        number: "55667788",
        issued_in: "Barranquilla"
      }
    },
    
    schedule: {
      date: "2023-12-05",
      start_time: "09:00",
      end_time: "13:00",
      duration_hours: 4,
      timezone: "America/Bogota",
      day_of_week: "tuesday"
    },
    
    purpose: {
      category: "audit",
      subcategory: "security_assessment",
      title: "Auditoría de Seguridad de Sistemas",
      description: "Auditoría completa de seguridad para sistema web de cliente, incluyendo pruebas de penetración y análisis de vulnerabilidades.",
      learning_objectives: [
        "Identificación de vulnerabilidades OWASP Top 10",
        "Pruebas de inyección SQL y XSS",
        "Análisis de logs y detección de intrusiones",
        "Generación de reporte ejecutivo"
      ]
    },
    
    participants: {
      total: 5,
      instructors: 0,
      students: 5,
      list: [
        { name: "Ana Martínez", role: "team_lead", email: "ana.martinez@reflex.com" },
        { name: "Luis Gómez", role: "pentester", email: "luis.gomez@reflex.com" }
      ]
    },
    
    equipment_requested: {
      mandatory: [
        "Estaciones Kali Linux (x5)",
        "Firewall Palo Alto para isolación",
        "Sistema de logging centralizado"
      ],
      optional: [
        "Hardware adicional para pruebas específicas"
      ],
      special_requests: "Informe de auditoría con formato ejecutivo incluido"
    },
    
    pricing: {
      base_rate: 65.00,
      hours: 4,
      subtotal: 260.00,
      taxes: {
        percentage: 19,
        amount: 49.40,
        type: "IVA"
      },
      deposit: {
        required: true,
        amount: 200.00,
        paid: true,
        refundable: true
      },
      discounts: [],
      total_amount: 309.40,
      currency: "USD",
      payment_status: "refunded",
      payment_method: "credit_card",
      transaction_id: "TXN-CC-015-2023",
      refund_id: "REF-001-2023",
      invoice_number: "FACT-015-2023"
    },
    
    status: "cancelled",
    status_history: [
      {
        status: "requested",
        timestamp: "2023-11-20T10:00:00Z",
        user: "system",
        notes: "Reserva solicitada desde plataforma Reflex"
      },
      {
        status: "confirmed",
        timestamp: "2023-11-20T10:30:00Z",
        user: "payment_gateway",
        notes: "Pago confirmado exitosamente"
      },
      {
        status: "cancelled",
        timestamp: "2023-11-30T14:15:00Z",
        user: "ana.martinez@reflex.com",
        notes: "Cancelada por cliente - Cambio de fecha requerido por el cliente"
      },
      {
        status: "refunded",
        timestamp: "2023-12-01T09:45:00Z",
        user: "accounting_system",
        notes: "Reembolso procesado al 80% según política de cancelación"
      }
    ],
    
    cancellation_policy: {
      allowed: true,
      deadline: "2023-12-02T09:00:00Z",
      refund_percentage: 80,
      penalty_fee: 52.00,
      refund_issued: 208.00,
      terms: "Cancelación con 72 horas de anticipación, reembolso al 80%"
    },
    
    refund: {
      amount: 208.00,
      percentage: 80,
      processed_at: "2023-12-01T09:45:00Z",
      method: "credit_card_refund",
      reference: "REF-001-2023",
      status: "completed"
    },
    
    metadata: {
      created_by: "reflex_integration_api",
      created_at: "2023-11-20T10:00:00Z",
      updated_at: "2023-12-01T09:45:00Z",
      source: "reflex_platform",
      integration_version: "1.0.0",
      ip_address: "201.234.167.89",
      user_agent: "Reflex-WebApp/1.0"
    },
    
    tags: ["audit", "cancelled", "refunded", "security", "corporate"]
  }
];

module.exports = mockBookings;