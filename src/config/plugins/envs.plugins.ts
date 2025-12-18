// Carga y valida las variables de entorno desde .env
import 'dotenv/config'; // Lee el archivo .env y lo carga en process.env
import * as env from 'env-var'; // Librería para validar tipos de variables de entorno

// Configuración centralizada de variables de entorno con validación
// Si alguna variable requerida falta o tiene formato incorrecto, lanza error
export const envs = {
    PORT: env.get('PORT').required().asPortNumber(), // Puerto del servidor, debe ser número válido
    MAILER_EMAIL: env.get('MAILER_EMAIL').required().asEmailString(), // Email para envío de notificaciones
    MAILER_PASSWORD_KEY: env.get('MAILER_SECRET_KEY').required().asString(), // Contraseña/token del servicio de email
    PROD: env.get('PROD').required().asBool(), // Indica si está en producción o desarrollo
    MAILER_SERVICE: env.get('MAILER_SERVICE').required().asString(), // Servicio de email (e.g., 'gmail')

}