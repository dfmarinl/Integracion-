/**
 * Datos mock de laboratorios de Waysoft
 */

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
    
    // Información de ubicación
    location: {
      building: "Edificio Tecnológico A",
      floor: "3",
      room: "301-A",
      address: "Carrera 15 #88-64, Bogotá",
      coordinates: {
        lat: 4.6789,
        lng: -74.0489
      }
    },
    
    // Capacidad y dimensiones
    capacity: {
      max_students: 20,
      max_instructors: 2,
      workstations: 20,
      square_meters: 120
    },
    
    // Equipamiento detallado
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
      ],
      accessories: [
        "Cables de consola",
        "Patch cables Cat6",
        "UPS APC 3000VA",
        "Rack 42U"
      ]
    },
    
    // Especificaciones técnicas
    specifications: {
      network_speed: "1 Gbps dedicado",
      internet_access: true,
      power_backup: true,
      air_conditioning: true,
      security: ["control_access", "cameras", "alarm"],
      special_features: ["rack_console", "projector", "whiteboard", "video_conference"]
    },
    
    // Software instalado
    software: [
      "Cisco Packet Tracer 8.2",
      "Wireshark 4.0",
      "GNS3",
      "VMware Workstation",
      "Windows Server 2022",
      "Ubuntu Server 22.04"
    ],
    
    // Horarios de disponibilidad
    schedule: {
      monday: [
        { start: "08:00", end: "12:00", type: "morning" },
        { start: "14:00", end: "18:00", type: "afternoon" },
        { start: "19:00", end: "22:00", type: "evening" }
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
        { start: "14:00", end: "18:00", type: "afternoon" },
        { start: "19:00", end: "22:00", type: "evening" }
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
    
    // Precios y tarifas
    pricing: {
      rates: {
        hourly: 45.50,
        half_day: 180.00,  // 4 horas
        full_day: 320.00,  // 8 horas
        weekend_day: 380.00
      },
      currency: "USD",
      requires_deposit: true,
      deposit_amount: 100.00,
      deposit_refundable: true,
      taxes_included: false,
      tax_rate: 19,  // 19% IVA
      discounts: {
        academic: 15,  // 15% descuento académico
        bulk_booking: 10,  // 10% por reservas masivas
        loyalty: 5  // 5% para clientes frecuentes
      }
    },
    
    // Requisitos y políticas
    requirements: {
      min_participants: 5,
      max_participants: 20,
      requires_instructor: true,
      instructor_provided: false,
      certifications_required: ["CCNA recommended"],
      min_age: 18,
      safety_equipment: ["antistatic_wristband"],
      prohibited_items: ["food", "drinks", "personal_equipment"]
    },
    
    // Estado y disponibilidad
    status: "available",
    maintenance: {
      last_maintenance: "2024-01-10",
      next_maintenance: "2024-04-10",
      maintenance_frequency: "quarterly"
    },
    
    // Metadatos
    metadata: {
      created_at: "2023-01-15T00:00:00Z",
      updated_at: "2024-01-15T09:30:00Z",
      rating: 4.7,
      total_bookings: 124,
      average_booking_hours: 3.2,
      popular_times: ["monday_afternoon", "thursday_morning"]
    },
    
    // Información de contacto
    contact: {
      manager: "Ing. Carlos Méndez",
      phone: "+57 1 234 5678 ext. 301",
      email: "lab301@waysoft.com",
      support_hours: "08:00-18:00 L-V"
    },
    
    // Características para filtros
    features: [
      "cisco_equipment",
      "enterprise_grade",
      "high_speed_network",
      "power_backup",
      "air_conditioning",
      "video_conference",
      "projector",
      "console_access",
      "internet_access",
      "security_system"
    ],
    
    // Imágenes (URLs ficticias)
    images: [
      "https://api.waysoft.com/images/labs/net-lab-001-1.jpg",
      "https://api.waysoft.com/images/labs/net-lab-001-2.jpg",
      "https://api.waysoft.com/images/labs/net-lab-001-3.jpg"
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
      address: "Calle 100 #15-20, Bogotá",
      coordinates: {
        lat: 4.6812,
        lng: -74.0465
      }
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
      ],
      servers: [
        { model: "Metasploit Server", quantity: 1, specs: "Pentesting framework" },
        { model: "SIEM Elastic", quantity: 1, specs: "Log analysis" }
      ],
      accessories: [
        "USB Rubber Ducky",
        "WiFi Pineapple",
        "LAN Turtle",
        "Proxmark3"
      ]
    },
    
    specifications: {
      network_speed: "10 Gbps",
      internet_access: true,
      isolated_network: true,
      power_backup: true,
      air_conditioning: true,
      security: ["biometric_access", "cameras_360", "motion_sensors"],
      special_features: ["sound_proof", "faraday_cage", "secure_storage"]
    },
    
    software: [
      "Kali Linux 2023.4",
      "Metasploit Pro",
      "Burp Suite Professional",
      "Nessus",
      "Wireshark",
      "John the Ripper",
      "Hashcat",
      "Autopsy"
    ],
    
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
        full_day: 450.00,
        weekend_day: 500.00
      },
      currency: "USD",
      requires_deposit: true,
      deposit_amount: 200.00,
      deposit_refundable: true,
      taxes_included: false,
      tax_rate: 19,
      discounts: {
        academic: 20,
        government: 15,
        corporate: 10
      }
    },
    
    requirements: {
      min_participants: 3,
      max_participants: 15,
      requires_instructor: true,
      instructor_provided: true,
      certifications_required: ["NDA required", "Background check"],
      min_age: 21,
      safety_equipment: [],
      prohibited_items: ["mobile_phones", "recording_devices", "external_storage"]
    },
    
    status: "available",
    maintenance: {
      last_maintenance: "2024-01-05",
      next_maintenance: "2024-02-05",
      maintenance_frequency: "monthly"
    },
    
    metadata: {
      created_at: "2023-03-20T00:00:00Z",
      updated_at: "2024-01-12T14:20:00Z",
      rating: 4.9,
      total_bookings: 89,
      average_booking_hours: 4.5,
      popular_times: ["tuesday_afternoon", "thursday_morning"]
    },
    
    contact: {
      manager: "Ing. Laura Ramírez",
      phone: "+57 1 234 5678 ext. 205",
      email: "lab205@waysoft.com",
      support_hours: "09:00-19:00 L-V"
    },
    
    features: [
      "penetration_testing",
      "malware_analysis",
      "forensic_analysis",
      "isolated_network",
      "biometric_access",
      "secure_environment",
      "advanced_tools",
      "certified_instructor"
    ],
    
    images: [
      "https://api.waysoft.com/images/labs/sec-lab-001-1.jpg",
      "https://api.waysoft.com/images/labs/sec-lab-001-2.jpg"
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
      address: "Avenida Eldorado #68-20, Bogotá",
      coordinates: {
        lat: 4.6754,
        lng: -74.0512
      }
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
        { model: "Cisco 7962G", quantity: 12, specs: "IP Phone" },
        { model: "Grandstream GXP2160", quantity: 6, specs: "16-line IP Phone" }
      ],
      gateways: [
        { model: "Cisco 2901 with VIC", quantity: 2, specs: "Voice gateway" },
        { model: "Grandstream GXW4104", quantity: 4, specs: "FXO gateway" }
      ],
      analyzers: [
        { model: "Fluke Networks", quantity: 1, specs: "Voice quality analyzer" }
      ]
    },
    
    specifications: {
      network_speed: "1 Gbps",
      internet_access: true,
      phone_lines: 24,
      power_backup: true,
      air_conditioning: true,
      security: ["access_card", "cameras"],
      special_features: ["sound_proof_booths", "conference_system", "call_recording"]
    },
    
    software: [
      "Asterisk 18",
      "FreePBX",
      "Wireshark with VoIP plugins",
      "SIPp",
      "sngrep"
    ],
    
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
        full_day: 280.00,
        weekend_day: 350.00
      },
      currency: "USD",
      requires_deposit: false,
      deposit_amount: 0,
      deposit_refundable: false,
      taxes_included: true,
      tax_rate: 19,
      discounts: {
        academic: 20,
        telecom_companies: 25
      }
    },
    
    requirements: {
      min_participants: 2,
      max_participants: 12,
      requires_instructor: false,
      instructor_provided: false,
      certifications_required: [],
      min_age: 16,
      safety_equipment: ["headsets"],
      prohibited_items: []
    },
    
    status: "maintenance",
    maintenance: {
      last_maintenance: "2023-12-20",
      next_maintenance: "2024-01-25",
      maintenance_frequency: "monthly",
      maintenance_reason: "PBX system upgrade"
    },
    
    metadata: {
      created_at: "2023-05-10T00:00:00Z",
      updated_at: "2024-01-15T11:45:00Z",
      rating: 4.5,
      total_bookings: 67,
      average_booking_hours: 4.0,
      popular_times: ["monday_morning", "wednesday_afternoon"]
    },
    
    contact: {
      manager: "Ing. Fernando Gutiérrez",
      phone: "+57 1 234 5678 ext. 110",
      email: "lab110@waysoft.com",
      support_hours: "10:00-18:00 L-V"
    },
    
    features: [
      "voip_systems",
      "pbx_configuration",
      "qos_testing",
      "call_analysis",
      "conference_system",
      "analyzers",
      "training_materials"
    ],
    
    images: [
      "https://api.waysoft.com/images/labs/voip-lab-001-1.jpg",
      "https://api.waysoft.com/images/labs/voip-lab-001-2.jpg",
      "https://api.waysoft.com/images/labs/voip-lab-001-3.jpg"
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
      address: "Carrera 7 #77-07, Bogotá",
      coordinates: {
        lat: 4.6831,
        lng: -74.0498
      }
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
        { model: "Ubiquiti UniFi 6 Pro", quantity: 4, specs: "802.11ax" },
        { model: "Aruba 515", quantity: 2, specs: "802.11ax" }
      ],
      controllers: [
        { model: "Cisco 3504 WLC", quantity: 1, specs: "25 AP license" },
        { model: "Ubiquiti Cloud Key", quantity: 1, specs: "Gen2 Plus" }
      ],
      analyzers: [
        { model: "Ekahau Sidekick 2", quantity: 1, specs: "Spectrum analyzer" },
        { model: "WiFi Analyzer Pro", quantity: 2, specs: "Portable" }
      ],
      antennas: [
        { model: "Directional 24dBi", quantity: 4, specs: "Outdoor" },
        { model: "Omnidirectional 8dBi", quantity: 2, specs: "Indoor" }
      ]
    },
    
    specifications: {
      network_speed: "2.4 Gbps",
      internet_access: true,
      frequency_bands: ["2.4 GHz", "5 GHz", "6 GHz"],
      power_backup: true,
      air_conditioning: true,
      security: ["access_card", "cameras"],
      special_features: ["outdoor_test_area", "antenna_test_bench", "spectrum_analysis"]
    },
    
    software: [
      "Ekahau Pro",
      "inSSIDer Office",
      "WiFi Analyzer Pro",
      "AirMagnet Survey",
      "Cisco Prime Infrastructure",
      "Ubiquiti UniFi Controller"
    ],
    
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
        full_day: 340.00,
        weekend_day: 400.00
      },
      currency: "USD",
      requires_deposit: true,
      deposit_amount: 80.00,
      deposit_refundable: true,
      taxes_included: false,
      tax_rate: 19,
      discounts: {
        academic: 15,
        wireless_certification: 20
      }
    },
    
    requirements: {
      min_participants: 2,
      max_participants: 10,
      requires_instructor: false,
      instructor_provided: false,
      certifications_required: [],
      min_age: 18,
      safety_equipment: [],
      prohibited_items: ["personal_aps", "jammers"]
    },
    
    status: "available",
    maintenance: {
      last_maintenance: "2024-01-05",
      next_maintenance: "2024-04-05",
      maintenance_frequency: "quarterly"
    },
    
    metadata: {
      created_at: "2023-07-15T00:00:00Z",
      updated_at: "2024-01-14T16:20:00Z",
      rating: 4.6,
      total_bookings: 45,
      average_booking_hours: 5.0,
      popular_times: ["tuesday_afternoon", "thursday_morning"]
    },
    
    contact: {
      manager: "Ing. Sofía Mendoza",
      phone: "+57 1 234 5678 ext. 410",
      email: "lab410@waysoft.com",
      support_hours: "08:00-18:00 L-V"
    },
    
    features: [
      "wifi_design",
      "site_survey",
      "spectrum_analysis",
      "outdoor_testing",
      "multiple_vendors",
      "professional_tools",
      "training_materials"
    ],
    
    images: [
      "https://api.waysoft.com/images/labs/wifi-lab-001-1.jpg",
      "https://api.waysoft.com/images/labs/wifi-lab-001-2.jpg"
    ]
  },
  
  {
    id: "WL-005",
    waysoft_id: "DC-LAB-001",
    code: "DATACENTER-01",
    name: "Laboratorio de Data Center",
    description: "Laboratorio que simula un pequeño data center con virtualización, almacenamiento SAN y alta disponibilidad.",
    type: "datacenter",
    category: "virtualization",
    subcategory: "server_infrastructure",
    
    location: {
      building: "Edificio Servidores E",
      floor: "B1",  // Sótano 1
      room: "B01",
      address: "Calle 26 #57-41, Bogotá",
      coordinates: {
        lat: 4.6765,
        lng: -74.0531
      }
    },
    
    capacity: {
      max_students: 8,
      max_instructors: 1,
      workstations: 8,
      square_meters: 100
    },
    
    equipment: {
      servers: [
        { model: "HP ProLiant DL380", quantity: 4, specs: "2x Xeon Gold, 256GB RAM" },
        { model: "Dell PowerEdge R740", quantity: 4, specs: "2x Xeon Platinum, 512GB RAM" }
      ],
      storage: [
        { model: "Dell PowerVault ME4", quantity: 1, specs: "50TB SAN" },
        { model: "Synology RS3617", quantity: 1, specs: "36TB NAS" }
      ],
      networking: [
        { model: "Cisco Nexus 93180", quantity: 2, specs: "10GbE switch" },
        { model: "Brocade 6510", quantity: 1, specs: "Fibre Channel switch" }
      ],
      infrastructure: [
        { model: "APC Symmetra LX", quantity: 1, specs: "16kVA UPS" },
        { model: "Liebert cooling", quantity: 1, specs: "5-ton AC" },
        { model: "42U Rack", quantity: 2, specs: "Dual power" }
      ]
    },
    
    specifications: {
      network_speed: "10 Gbps",
      internet_access: true,
      total_storage: "86 TB",
      power_backup: true,
      cooling_system: true,
      security: ["biometric_access", "cameras_24/7", "fire_suppression"],
      special_features: ["hot_aisle_containment", "kvm_over_ip", "remote_management"]
    },
    
    software: [
      "VMware vSphere 8",
      "Microsoft Hyper-V",
      "Proxmox VE",
      "vCenter Server",
      "StarWind VSAN",
      "Veeam Backup & Replication",
      "Nagios XI"
    ],
    
    schedule: {
      monday: [
        { start: "19:00", end: "23:00", type: "evening" }
      ],
      tuesday: [
        { start: "19:00", end: "23:00", type: "evening" }
      ],
      wednesday: [
        { start: "19:00", end: "23:00", type: "evening" }
      ],
      thursday: [
        { start: "19:00", end: "23:00", type: "evening" }
      ],
      friday: [
        { start: "19:00", end: "23:00", type: "evening" }
      ],
      saturday: [
        { start: "08:00", end: "12:00", type: "morning" },
        { start: "14:00", end: "18:00", type: "afternoon" }
      ],
      sunday: [
        { start: "08:00", end: "12:00", type: "morning" }
      ]
    },
    
    pricing: {
      rates: {
        hourly: 75.00,
        half_day: 280.00,
        full_day: 500.00,
        weekend_day: 550.00
      },
      currency: "USD",
      requires_deposit: true,
      deposit_amount: 300.00,
      deposit_refundable: true,
      taxes_included: false,
      tax_rate: 19,
      discounts: {
        academic: 20,
        corporate: 15,
        long_term: 25  // Reservas de 1 semana o más
      }
    },
    
    requirements: {
      min_participants: 2,
      max_participants: 8,
      requires_instructor: true,
      instructor_provided: false,
      certifications_required: ["VCP preferred", "Server+ recommended"],
      min_age: 21,
      safety_equipment: ["esd_floor", "esd_wristbands"],
      prohibited_items: ["magnetic_items", "liquids"]
    },
    
    status: "reserved",
    maintenance: {
      last_maintenance: "2023-12-01",
      next_maintenance: "2024-03-01",
      maintenance_frequency: "quarterly"
    },
    
    metadata: {
      created_at: "2023-09-01T00:00:00Z",
      updated_at: "2024-01-13T11:30:00Z",
      rating: 4.8,
      total_bookings: 32,
      average_booking_hours: 6.0,
      popular_times: ["saturday_morning", "weekday_evening"]
    },
    
    contact: {
      manager: "Ing. Roberto Silva",
      phone: "+57 1 234 5678 ext. B01",
      email: "lab-b01@waysoft.com",
      support_hours: "24/7 on-call"
    },
    
    features: [
      "server_virtualization",
      "san_storage",
      "high_availability",
      "enterprise_grade",
      "remote_access",
      "monitoring_system",
      "backup_solutions"
    ],
    
    images: [
      "https://api.waysoft.com/images/labs/dc-lab-001-1.jpg",
      "https://api.waysoft.com/images/labs/dc-lab-001-2.jpg",
      "https://api.waysoft.com/images/labs/dc-lab-001-3.jpg"
    ]
  }
];

module.exports = mockLabs;