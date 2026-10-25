import * as joi from "joi";

export const envSchema=joi.object({
    PORT:joi.number().integer().default(3000),
    NODE_ENV:joi.string().required(),
     FALLBACK_LANGUAGE:joi.string().required().default('en'),
    MONGO_URI:joi.string().required(),
    JWT_SECCRET:joi.string().required(),
    ACESS_TOKEN_EXPIRE_IN:joi.string().default("7d"),
        REFRESH_TOKEN_EXPIRE_IN:joi.string().default("15d"),
        TYPE:joi.string().default('refresh'),
        SYSTEM_ADMIN_NAME:joi.string().required(),
        SYSTEM_ADMIN_EMAIL:joi.string().email().required(),
        SYSTEM_ADMIN_PASSWORD:joi.string().required(),
        AWS_S3_BUCKET_NAME:joi.string().required(),
        AWS_S3_REGION:joi.string().required(),
        AWS_S3_ACCESS_KEY_ID:joi.string().required(),
        AWS_S3_SECRET_KEY:joi.string().required(),
                
        SMTP_HOST:joi.string().required(),
        SMTP_PORT:joi.number().required(),
        SMTP_SECURE:joi.boolean().required(),
        SMTP_SERVICE:joi.string().required(),
        SMTP_AUTH_USER:joi.string().required(),
        SMTP_AUTH_PASSWORD:joi.string().required(),




})


