import type { Message } from "../stores/chatStore";

const responses: [string, string][] = [
    ["hola", "¡Hola! Soy el asistente virtual de Gestor de Respaldo. ¿En qué puedo ayudarte?"],
    ["buenos días", "¡Buenos días! ¿Cómo puedo asistirte hoy?"],
    ["buenas tardes", "¡Buenas tardes! ¿En qué puedo ayudarte?"],
    ["adiós", "¡Hasta luego! Si necesitas algo más, estoy aquí para ayudarte."],
    ["gracias", "¡De nada! Si tienes más preguntas, no dudes en consultarme."],
    ["respaldo", "Puedes configurar respaldos automáticos desde la sección de usuarios. Cada usuario puede tener su propia programación de respaldos."],
    ["backup", "Puedes configurar respaldos automáticos desde la sección de usuarios. Cada usuario puede tener su propia programación de respaldos."],
    ["programar", "Para programar un respaldo, ve a la página de Usuarios, selecciona un usuario y configura la frecuencia y hora del respaldo."],
    ["error", "Si encuentras algún error, revisa los logs del sistema. Si el problema persiste, contacta al administrador."],
    ["usuario", "En la sección Usuarios puedes ver, crear y gestionar todos los usuarios del sistema de respaldos."],
    ["contraseña", "Por seguridad, las contraseñas deben tener al menos 8 caracteres, incluir mayúsculas, minúsculas y números."],
    ["ayuda", "Puedes pedirme ayuda sobre: respaldos, usuarios, configuración, programación, errores y más. ¿Sobre qué tema necesitas información?"],
];

function findResponse(text: string): string | null {
    const lower = text.toLowerCase();
    for (const [keyword, response] of responses) {
        if (lower.includes(keyword)) return response;
    }
    return null;
}

function randomFallback(): string {
    const fallbacks = [
        "Entiendo. ¿Podrías darme más detalles para poder ayudarte mejor?",
        "Gracias por tu mensaje. ¿Hay algo específico en lo que pueda asistirte?",
        "He recibido tu consulta. ¿Podrías ser un poco más específico?",
        "Interesante. ¿Te gustaría saber más sobre la gestión de respaldos?",
        "No tengo información sobre eso. ¿Prefieres preguntar sobre respaldos, usuarios o configuración?",
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

function generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getBotResponse(userText: string): Promise<Message> {
    const wait = 600 + Math.random() * 900;
    await delay(wait);

    return {
        id: generateId(),
        text: findResponse(userText) ?? randomFallback(),
        sender: "bot",
        timestamp: new Date(),
    };
}
