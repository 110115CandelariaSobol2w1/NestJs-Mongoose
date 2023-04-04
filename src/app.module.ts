import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://candelariasobol:8denoviembre@mongodb101.hkeu0q5.mongodb.net/test'), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}