import { Module } from '@nestjs/common';
import { UnitsController } from './units.controller';
import { UnitsService } from './units.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelNames } from 'src/common/data-access';
import { UnitSchema } from './schema/unit.schema';

@Module({

    imports:[MongooseModule.forFeature([{ name: ModelNames.UNITS, schema: UnitSchema }])],
  
  controllers: [UnitsController],
  providers: [UnitsService]
})
export class UnitsModule {}
