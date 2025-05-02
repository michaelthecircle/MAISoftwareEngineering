import { Logger } from 'nestjs-pino';
import { Observer } from './event-aggregator.service';
import { Inject, Injectable } from '@nestjs/common';
import { EventTypeEnum } from 'src/common/event.types';

@Injectable()
export class LoggerObserver implements Observer {
    constructor(
        @Inject(Logger)
        private readonly logger: Logger
    ) {}
    update(eventType: EventTypeEnum, data: any) {
        this.logger.log(`${eventType} ${JSON.stringify(data)}`);
    }
}

@Injectable()
export class NotificationObserver implements Observer {
  update(eventType: EventTypeEnum, data: any) {
    console.log(`[Notifier] sending noticitaion: ${eventType}, Data: ${JSON.stringify(data)}`);
  }
}

@Injectable()
export class CacheObserver implements Observer {
  update(eventType: EventTypeEnum, data: any) {
    console.log(`[Cache] Updating cache for event: ${eventType} ${JSON.stringify(data)}`);
  }
}
