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
        systemAdmin:{
            name:process.env.SYSTEM_ADMIN_NAME as string,
            email:process.env.SYSTEM_ADMIN_EMAIL as string,
            password:process.env.SYSTEM_ADMIN_PASSWORD as string,

        },
        awsS3:{
            bucketName:process.env.AWS_S3_BUCKET_NAME as string,
            region:process.env.AWS_S3_REGION as string,
            accessKeyId:process.env.AWS_S3_ACCESS_KEY_ID as string,
            secretAccessKey:process.env.AWS_S3_SECRET_KEY as string,
        },
        smtp:{
            host:process.env.SMTP_HOST as string,
            port:Number(process.env.SMTP_PORT ),
            secure:process.env.SMTP_SECURE ==='true',
            service:process.env.SMTP_SERVICE as string,
            auth:{
            user:process.env.SMTP_AUTH_USER as string,
            pass:process.env.SMTP_AUTH_PASSWORD as string
            }

        }

   

}
}

