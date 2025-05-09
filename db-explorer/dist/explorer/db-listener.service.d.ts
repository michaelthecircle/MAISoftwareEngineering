import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventAggregator } from './event-aggregator.service';
import { LoggerObserver, NotificationObserver, CacheObserver } from './observers.service';
export declare class DbListenerService implements OnModuleInit {
    private readonly loggerObserver;
    private readonly notificationObserver;
    private readonly cacheObserver;
    private readonly configService;
    private readonly eventAggregator;
    private client;
    constructor(loggerObserver: LoggerObserver, notificationObserver: NotificationObserver, cacheObserver: CacheObserver, configService: ConfigService, eventAggregator: EventAggregator);
    onModuleInit(): Promise<void>;
}
