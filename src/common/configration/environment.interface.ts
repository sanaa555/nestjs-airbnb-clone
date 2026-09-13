export interface Environment{
    port:number;
    FallbackLanguage:string;
    mongodbUri:string;
     jwtSecret:string,
    acessTokenExpireIn:string,
        refreshTokenExpireIn:string,
        type:string,
        systemAdmin:ISystemAdmin
}

export  interface ISystemAdmin{
    name:string,
    email:string,
    password:string
}