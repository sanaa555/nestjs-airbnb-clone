import * as joi from "joi";

export const envSchema=joi.object({
    PORT:joi.number().integer().default(3000),
    NODE_ENV:joi.string().required(),
     FALLBACK_LANGUAGE:joi.string().required().default('en'),
    MONGO_URI:joi.string().required()
})


