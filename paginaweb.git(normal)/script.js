function showZodiac() {
    var birthdate = new Date(document.getElementById("birthdate").value);
    var day = birthdate.getDate();
    var month = birthdate.getMonth() + 1; // Mes es 0-indexed

    var zodiac = "";
    var zodiacInfo = "";
    var compatibilityMessage = "";
    var horoscopeMessage = "";

    // Determinar signo zodiacal
    if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) {
        zodiac = "Aries";
        zodiacInfo = "Aries es un signo de fuego, conocido por su valentía y energía. Son líderes naturales.";
        compatibilityMessage = "Compatibilidad: Aries es más compatible con Leo y Sagitario.";
        horoscopeMessage = "Hoy es un buen día para tomar decisiones audaces y actuar con confianza.";
    } else if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) {
        zodiac = "Tauro";
        zodiacInfo = "Tauro es un signo de tierra, conocido por su lealtad y amor por la estabilidad.";
        compatibilityMessage = "Compatibilidad: Tauro es compatible con Virgo y Capricornio.";
        horoscopeMessage = "Hoy será un día de estabilidad y reflexión, perfecto para organizar tus pensamientos.";
    } else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) {
        zodiac = "Géminis";
        zodiacInfo = "Géminis es un signo de aire, curioso y adaptable. Son grandes comunicadores.";
        compatibilityMessage = "Compatibilidad: Géminis se lleva bien con Libra y Acuario.";
        horoscopeMessage = "Tu mente está especialmente clara hoy. Aprovecha para aprender algo nuevo.";
    } else if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) {
        zodiac = "Cáncer";
        zodiacInfo = "Cáncer es un signo de agua, conocido por su intuición y empatía. Son muy protectores con sus seres queridos.";
        compatibilityMessage = "Compatibilidad: Cáncer es compatible con Escorpio y Piscis.";
        horoscopeMessage = "Hoy es un día para cuidar de ti mismo y de tus relaciones cercanas.";
    } // Agregar más signos aquí...

    document.getElementById("zodiacMessage").innerText = "Tu signo es " + zodiac;
    document.getElementById("zodiacInfo").innerText = zodiacInfo;
    document.getElementById("compatibilityMessage").innerText = compatibilityMessage;
    document.getElementById("horoscopeMessage").innerText = horoscopeMessage;

    // Mostrar botones e información adicional
    document.getElementById("infoButton").style.display = "block";
    document.getElementById("compatibility").style.display = "block";
    document.getElementById("dailyHoroscope").style.display = "block";
}

function showZodiacInfo() {
    var zodiacInfo = document.getElementById("zodiacInfo");
    if (zodiacInfo.style.display === "none") {
        zodiacInfo.style.display = "block";
    } else {
        zodiacInfo.style.display = "none";
    }
}

// Alternar modo oscuro y claro
function toggleDarkMode() {
    var body = document.body;
    body.classList.toggle("dark-mode");
    
    var darkModeToggle = document.getElementById("darkModeToggle");
    var modeText = body.classList.contains("dark-mode") ? "Modo claro" : "Modo oscuro";
    darkModeToggle.querySelector("span").innerText = modeText;
}
