import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { API_TAGS } from "./constant";


export class SwaggerConfig{

    static setup(app:INestApplication):void{


         const config = new DocumentBuilder()
            .setTitle('Airbnb clone API')
            .setDescription('Airbnb clone API description')
            .addTag(API_TAGS.AUTH)
            .addTag(API_TAGS.COUNTRIES)
            .addTag(API_TAGS.CITIES)
            .addTag(API_TAGS.CURRENCIES)
            .addTag(API_TAGS.UNIT_CATEGORIES)
            .addTag(API_TAGS.APP_SETTINGS)
            .addTag(API_TAGS.SYSTEM_ADMINS)
            .addTag(API_TAGS.USERS)
            .setVersion('1.0')
            .build();
          const documentFactory = () => SwaggerModule.createDocument(app, config);
          SwaggerModule.setup('api/docs', app, documentFactory,{
            swaggerOptions:{
              filter:true,
              DisplayRequestDuration:true
            }
          });
        
    }
}