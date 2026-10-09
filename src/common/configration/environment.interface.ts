export interface Environment{
    port:number;
    FallbackLanguage:string;
    mongodbUri:string;
     jwtSecret:string,
    acessTokenExpireIn:string,
        refreshTokenExpireIn:string,
        type:string,
        systemAdmin:ISystemAdmin,
        awsS3:IAwsS3
}

export  interface ISystemAdmin{
    name:string,
    email:string,
    password:string
}

export interface IAwsS3{
    bucketName:string;
    region:string;
    accessKeyId:string;
    secretAccessKey:string

}