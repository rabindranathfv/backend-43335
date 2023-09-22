import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

import { ConfigModule, ConfigService } from '@nestjs/config';

import GlobalMiddleware from './middleware/globalmiddleware';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/.env.${
        process.env.NODE_ENV || 'development'
      }.local`,
      // isGlobal: true,
    }),
    // MongooseModule.forRoot(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URL'),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // EQUIVALENTE AL app.use()
    consumer.apply(GlobalMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
