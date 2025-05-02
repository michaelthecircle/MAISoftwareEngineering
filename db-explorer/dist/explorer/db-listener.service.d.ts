import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerObserver, NotificationObserver, CacheObserver } from './observers.service';
export declare class DbListenerService implements OnModuleInit {
    private readonly loggerObserver;
    private readonly notificationObserver;
    private readonly cacheObserver;
    private readonly configService;
    private client;
    private eventAggregator;
    constructor(loggerObserver: LoggerObserver, notificationObserver: NotificationObserver, cacheObserver: CacheObserver, configService: ConfigService);
    onModuleInit(): Promise<void>;
}
