import { Module } from '@nestjs/common';
import { DbListenerService } from './explorer/db-listener.service';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { CacheObserver, LoggerObserver, NotificationObserver } from './explorer/observers.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
      isGlobal: true,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'HH:MM:ss',
            ignore: 'pid,hostname',
          },
        },
        level: 'info',
      },
    }),
  ],
  controllers: [],
  providers: [DbListenerService, LoggerObserver, NotificationObserver,CacheObserver],
})
export class AppModule {}
