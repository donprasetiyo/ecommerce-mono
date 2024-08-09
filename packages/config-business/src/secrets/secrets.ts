export const ConfigManagerSecrets = {
    PG_HOST : process.env.NODE_ENV === "production" ? process.env.PG_HOST_PROD! : process.env.PG_HOST!,
    PG_USERNAME : process.env.PG_USERNAME!,
    PG_PASSWORD : process.env.PG_PASSWORD!,
    PG_NAME : process.env.PG_NAME!,
    PG_PORT: parseInt(process.env.PG_PORT!)
}