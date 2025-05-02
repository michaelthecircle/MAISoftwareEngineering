import { Logger } from 'nestjs-pino';
import { Observer } from './event-aggregator.service';
import { EventTypeEnum } from 'src/common/event.types';
export declare class LoggerObserver implements Observer {
    private readonly logger;
    constructor(logger: Logger);
    update(eventType: EventTypeEnum, data: any): void;
}
export declare class NotificationObserver implements Observer {
    update(eventType: EventTypeEnum, data: any): void;
}
export declare class CacheObserver implements Observer {
    update(eventType: EventTypeEnum, data: any): void;
}
