import { Environment } from "../environment.interface";


export const defaultEnv=():Environment=>{
    return {
    port:Number(process.env.PORT),
    FallbackLanguage:process.env.FALLBACK_LANGUAGE as string,
    mongodbUri:process.env.MONGO_URI as string
}
}

