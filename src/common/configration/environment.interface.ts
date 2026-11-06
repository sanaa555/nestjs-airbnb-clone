
export interface Environment {
  port: number;
  FallbackLanguage: string;
  mongodbUri: string;
  jwtSecret: string;
  acessTokenExpireIn: string;
  refreshTokenExpireIn: string;
  type: string;
  systemAdmin: ISystemAdmin;
  awsS3: IAwsS3;

  // Stripe configuration
  stripeSecretKey: string;
  baseUrl: string;
  stripeWebhookSecret: string;

  // SMTP configuration
  smtp: ISmtp;
  from: string;
}

export interface ISystemAdmin {
  name: string;
  email: string;
  password: string;
}

export interface IAwsS3 {
  bucketName: string;
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
}

export interface ISmtp {
  host: string;
  port: number;
  secure: boolean;
  service: string;
  auth: {
    user: string;
    pass: string;
  };
}
