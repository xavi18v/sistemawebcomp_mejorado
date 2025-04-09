document.addEventListener('DOMContentLoaded', function() {
    // Configurar el botón para descubrir el signo zodiacal
    const findZodiacBtn = document.getElementById('findZodiacBtn');
    const resultSection = document.getElementById('resultSection');
    
    // Configurar evento del botón
    if (findZodiacBtn) {
        findZodiacBtn.addEventListener('click', showZodiac);
    }
    
    // Configurar el cambio de tabs
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remover la clase active de todas las tabs
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
            
            // Activar la tab actual
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Configurar modo oscuro
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }
    
    // Configurar los elementos de la grilla de zodíaco
    const zodiacItems = document.querySelectorAll('.zodiac-item');
    zodiacItems.forEach(item => {
        item.addEventListener('click', function() {
            const sign = this.getAttribute('data-sign');
            displayZodiacInfo(sign);
        });
    });
});

// Función principal para mostrar el signo zodiacal
function showZodiac() {
    const birthdateInput = document.getElementById("birthdate");
    if (!birthdateInput.value) {
        alert("Por favor, selecciona una fecha de nacimiento");
        return;
    }
    
    const birthdate = new Date(birthdateInput.value);
    const day = birthdate.getDate();
    const month = birthdate.getMonth() + 1; // Mes es 0-indexed
    
    // Determinar el signo basado en la fecha
    const zodiacData = getZodiacData(day, month);
    
    // Mostrar la sección de resultados
    const resultSection = document.getElementById("resultSection");
    resultSection.classList.remove("hidden");
    
    // Actualizar el título y el ícono
    document.getElementById("zodiacTitle").textContent = "Tu signo es " + zodiacData.name;
    document.getElementById("zodiacIcon").innerHTML = `<i class="${zodiacData.icon}"></i>`;
    
    // Actualizar características
    document.getElementById("zodiacInfo").textContent = zodiacData.description;
    document.getElementById("element").textContent = zodiacData.element;
    document.getElementById("planet").textContent = zodiacData.planet;
    document.getElementById("quality").textContent = zodiacData.quality;
    
    // Actualizar compatibilidad
    const bestCompatList = document.getElementById("bestCompatibility");
    const challengingCompatList = document.getElementById("challengingCompatibility");
    
    bestCompatList.innerHTML = '';
    zodiacData.bestCompatibility.forEach(sign => {
        bestCompatList.innerHTML += `<li><i class="fas fa-heart"></i> ${sign}</li>`;
    });
    
    challengingCompatList.innerHTML = '';
    zodiacData.challengingCompatibility.forEach(sign => {
        challengingCompatList.innerHTML += `<li><i class="fas fa-exclamation-triangle"></i> ${sign}</li>`;
    });
    
    // Actualizar horóscopo
    document.getElementById("dailyHoroscope").textContent = zodiacData.horoscope;
    
    // Actualizar medidores de fortuna
    document.getElementById("loveMeter").style.setProperty('--width', zodiacData.love + '%');
    document.getElementById("moneyMeter").style.setProperty('--width', zodiacData.money + '%');
    document.getElementById("healthMeter").style.setProperty('--width', zodiacData.health + '%');
    
    // Hacer scroll hacia el resultado
    resultSection.scrollIntoView({ behavior: 'smooth' });
}

// Función para obtener datos del signo según la fecha
function getZodiacData(day, month) {
    // Datos de los signos zodiacales
    const zodiacSigns = {
        aries: {
            name: "Aries",
            dates: {start: {month: 3, day: 21}, end: {month: 4, day: 19}},
            description: "Aries es un signo de fuego, conocido por su valentía, energía y espíritu emprendedor. Son líderes naturales y pioneros que destacan por su iniciativa.",
            element: "Fuego",
            planet: "Marte",
            quality: "Cardinal",
            icon: "fas fa-fire",
            bestCompatibility: ["Leo", "Sagitario", "Géminis"],
            challengingCompatibility: ["Cáncer", "Capricornio", "Libra"],
            horoscope: "Hoy es un buen día para tomar decisiones audaces y actuar con confianza. Tu energía estará en su punto máximo.",
            love: 75,
            money: 60,
            health: 85
        },
        taurus: {
            name: "Tauro",
            dates: {start: {month: 4, day: 20}, end: {month: 5, day: 20}},
            description: "Tauro es un signo de tierra, conocido por su lealtad, determinación y amor por la estabilidad. Son prácticos y disfrutan de los placeres de la vida.",
            element: "Tierra",
            planet: "Venus",
            quality: "Fijo",
            icon: "fas fa-leaf",
            bestCompatibility: ["Virgo", "Capricornio", "Cáncer"],
            challengingCompatibility: ["Leo", "Acuario", "Escorpio"],
            horoscope: "Hoy será un día de estabilidad y reflexión, perfecto para organizar tus pensamientos y finanzas.",
            love: 65,
            money: 80,
            health: 70
        },
        gemini: {
            name: "Géminis",
            dates: {start: {month: 5, day: 21}, end: {month: 6, day: 20}},
            description: "Géminis es un signo de aire, curioso, adaptable y expresivo. Son excelentes comunicadores y disfrutan aprendiendo cosas nuevas constantemente.",
            element: "Aire",
            planet: "Mercurio",
            quality: "Mutable",
            icon: "fas fa-wind",
            bestCompatibility: ["Libra", "Acuario", "Aries"],
            challengingCompatibility: ["Virgo", "Piscis", "Sagitario"],
            horoscope: "Tu mente está especialmente clara hoy. Aprovecha para aprender algo nuevo o iniciar una conversación importante.",
            love: 70,
            money: 65,
            health: 60
        },
        cancer: {
            name: "Cáncer",
            dates: {start: {month: 6, day: 21}, end: {month: 7, day: 22}},
            description: "Cáncer es un signo de agua, conocido por su intuición, empatía y sensibilidad. Son protectores con sus seres queridos y valoran la seguridad emocional.",
            element: "Agua",
            planet: "Luna",
            quality: "Cardinal",
            icon: "fas fa-water",
            bestCompatibility: ["Escorpio", "Piscis", "Tauro"],
            challengingCompatibility: ["Aries", "Libra", "Capricornio"],
            horoscope: "Hoy es un día para cuidar de ti mismo y de tus relaciones cercanas. Tu intuición te guiará correctamente.",
            love: 90,
            money: 55,
            health: 70
        },
        leo: {
            name: "Leo",
            dates: {start: {month: 7, day: 23}, end: {month: 8, day: 22}},
            description: "Leo es un signo de fuego, caracterizado por su creatividad, generosidad y espíritu noble. Son líderes carismáticos que brillan con luz propia.",
            element: "Fuego",
            planet: "Sol",
            quality: "Fijo",
            icon: "fas fa-sun",
            bestCompatibility: ["Aries", "Sagitario", "Libra"],
            challengingCompatibility: ["Tauro", "Escorpio", "Acuario"],
            horoscope: "Hoy es tu momento para brillar. Aprovecha las oportunidades para mostrar tus talentos y liderar con confianza.",
            love: 85,
            money: 75,
            health: 80
        },
        virgo: {
            name: "Virgo",
            dates: {start: {month: 8, day: 23}, end: {month: 9, day: 22}},
            description: "Virgo es un signo de tierra, conocido por su meticulosidad, inteligencia analítica y capacidad de servicio. Son perfeccionistas y prácticos.",
            element: "Tierra",
            planet: "Mercurio",
            quality: "Mutable",
            icon: "fas fa-seedling",
            bestCompatibility: ["Tauro", "Capricornio", "Cáncer"],
            challengingCompatibility: ["Géminis", "Sagitario", "Piscis"],
            horoscope: "Es un buen día para organizar tus ideas y mejorar tus rutinas diarias. Tu capacidad analítica será especialmente útil hoy.",
            love: 60,
            money: 85,
            health: 75
        },
        libra: {
            name: "Libra",
            dates: {start: {month: 9, day: 23}, end: {month: 10, day: 22}},
            description: "Libra es un signo de aire, conocido por su sentido de la justicia, diplomacia y gusto por la armonía. Son sociables y valoran el equilibrio.",
            element: "Aire",
            planet: "Venus",
            quality: "Cardinal",
            icon: "fas fa-balance-scale",
            bestCompatibility: ["Géminis", "Acuario", "Leo"],
            challengingCompatibility: ["Cáncer", "Capricornio", "Aries"],
            horoscope: "Hoy es ideal para buscar acuerdos y resolver conflictos. Tu capacidad para ver ambos lados de cualquier situación será valiosa.",
            love: 80,
            money: 70,
            health: 75
        },
        scorpio: {
            name: "Escorpio",
            dates: {start: {month: 10, day: 23}, end: {month: 11, day: 21}},
            description: "Escorpio es un signo de agua, caracterizado por su intensidad, pasión y determinación. Son perspicaces, misteriosos y profundamente emocionales.",
            element: "Agua",
            planet: "Plutón",
            quality: "Fijo",
            icon: "fas fa-bolt",
            bestCompatibility: ["Cáncer", "Piscis", "Virgo"],
            challengingCompatibility: ["Leo", "Acuario", "Tauro"],
            horoscope: "Tu intuición está especialmente aguda hoy. Confía en tus instintos y no temas investigar bajo la superficie.",
            love: 95,
            money: 80,
            health: 70
        },
        sagittarius: {
            name: "Sagitario",
            dates: {start: {month: 11, day: 22}, end: {month: 12, day: 21}},
            description: "Sagitario es un signo de fuego, conocido por su optimismo, amor por la libertad y espíritu aventurero. Son filosóficos y buscan la verdad.",
            element: "Fuego",
            planet: "Júpiter",
            quality: "Mutable",
            icon: "fas fa-arrow-right",
            bestCompatibility: ["Aries", "Leo", "Acuario"],
            challengingCompatibility: ["Virgo", "Piscis", "Géminis"],
            horoscope: "Hoy es perfecto para expandir tus horizontes. Una nueva aventura o aprendizaje te espera si estás dispuesto a buscarlo.",
            love: 65,
            money: 80,
            health: 90
        },
        capricorn: {
            name: "Capricornio",
            dates: {start: {month: 12, day: 22}, end: {month: 1, day: 19}},
            description: "Capricornio es un signo de tierra, caracterizado por su ambición, disciplina y sentido de la responsabilidad. Son pragmáticos y orientados a objetivos.",
            element: "Tierra",
            planet: "Saturno",
            quality: "Cardinal",
            icon: "fas fa-mountain",
            bestCompatibility: ["Tauro", "Virgo", "Piscis"],
            challengingCompatibility: ["Aries", "Libra", "Cáncer"],
            horoscope: "Es un buen día para avanzar en tus metas profesionales. Tu disciplina y perseverancia serán recompensadas.",
            love: 55,
            money: 90,
            health: 75
        },
        aquarius: {
            name: "Acuario",
            dates: {start: {month: 1, day: 20}, end: {month: 2, day: 18}},
            description: "Acuario es un signo de aire, conocido por su originalidad, progresismo e independencia. Son visionarios que valoran la libertad intelectual.",
            element: "Aire",
            planet: "Urano",
            quality: "Fijo",
            icon: "fas fa-tint-slash",
            bestCompatibility: ["Géminis", "Libra", "Sagitario"],
            challengingCompatibility: ["Tauro", "Leo", "Escorpio"],
            horoscope: "Hoy es ideal para innovar y experimentar con nuevas ideas. Tu pensamiento original será especialmente valioso.",
            love: 60,
            money: 75,
            health: 80
        },
        pisces: {
            name: "Piscis",
            dates: {start: {month: 2, day: 19}, end: {month: 3, day: 20}},
            description: "Piscis es un signo de agua, caracterizado por su compasión, imaginación y sensibilidad. Son intuitivos, artísticos y profundamente empáticos.",
            element: "Agua",
            planet: "Neptuno",
            quality: "Mutable",
            icon: "fas fa-fish",
            bestCompatibility: ["Cáncer", "Escorpio", "Capricornio"],
            challengingCompatibility: ["Géminis", "Virgo", "Sagitario"],
            horoscope: "Tu creatividad e intuición están en su punto máximo hoy. Es un buen momento para actividades artísticas o espirituales.",
            love: 85,
            money: 60,
            health: 70
        }
    };
    
    // Determinar signo zodiacal según la fecha
    let sign = "";
    
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
        sign = "aries";
    } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
        sign = "taurus";
    } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
        sign = "gemini";
    } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
        sign = "cancer";
    } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
        sign = "leo";
    } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
        sign = "virgo";
    } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
        sign = "libra";
    } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
        sign = "scorpio";
    } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
        sign = "sagittarius";
    } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
        sign = "capricorn";
    } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
        sign = "aquarius";
    } else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) {
        sign = "pisces";
    }
    
    return zodiacSigns[sign];
}

// Función para mostrar información de un signo al hacer clic en la grilla
function displayZodiacInfo(sign) {
    // Simular una fecha para el signo seleccionado
    let month, day;
    
    switch(sign) {
        case 'aries': month = 4; day = 1; break;
        case 'taurus': month = 5; day = 1; break;
        case 'gemini': month = 6; day = 1; break;
        case 'cancer': month = 7; day = 1; break;
        case 'leo': month = 8; day = 1; break;
        case 'virgo': month = 9; day = 1; break;
        case 'libra': month = 10; day = 1; break;
        case 'scorpio': month = 11; day = 1; break;
        case 'sagittarius': month = 12; day = 1; break;
        case 'capricorn': month = 1; day = 1; break;
        case 'aquarius': month = 2; day = 1; break;
        case 'pisces': month = 3; day = 1; break;
    }
    
    // Establecer la fecha en el input
    const date = new Date(2025, month-1, day);
    const formattedDate = date.toISOString().split('T')[0];
    document.getElementById('birthdate').value = formattedDate;
    
    // Llamar a la función para mostrar el signo
    showZodiac();
}

// Función para alternar el modo oscuro
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle("dark-mode");
    
    const darkModeToggle = document.getElementById("darkModeToggle");
    const iconElement = darkModeToggle.querySelector("i");
    const textElement = darkModeToggle.querySelector("span");
    
    if (body.classList.contains("dark-mode")) {
        iconElement.className = "fas fa-sun";
        textElement.textContent = "Modo claro";
    } else {
        iconElement.className = "fas fa-moon";
        textElement.textContent = "Modo oscuro";
    }
}

// Agregar estilos CSS para los medidores de fortuna
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .meter-bar::after {
            width: var(--width, 70%);
        }
    `;
    document.head.appendChild(style);
});