import { Environment } from "../environment.interface";


export const defaultEnv=():Environment=>{
    return {
    port:Number(process.env.PORT),
    FallbackLanguage:process.env.FALLBACK_LANGUAGE as string,
    mongodbUri:process.env.MONGO_URI as string,
     jwtSecret:process.env.JWT_SECCRET as string,
    acessTokenExpireIn:process.env.ACESS_TOKEN_EXPIRE_IN as string,
        refreshTokenExpireIn:process.env.ACESS_TOKEN_EXPIRE_IN as string,
        type:process.env.TYPE as string,
   

}
}

