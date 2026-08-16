export interface Environment{
    port:number;
    FallbackLanguage:string;
    mongodbUri:string;
     jwtSecret:string,
    acessTokenExpireIn:string
}