import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';
import { EventAggregator } from './event-aggregator.service';
import { LoggerObserver, NotificationObserver, CacheObserver } from './observers.service';
import { EventTypeEnum } from 'src/common/event.types';

@Injectable()
export class DbListenerService implements OnModuleInit {
  private client: Client;

  constructor(
    private readonly loggerObserver: LoggerObserver,
    private readonly notificationObserver: NotificationObserver,
    private readonly cacheObserver: CacheObserver,
    private readonly configService: ConfigService,
    private readonly eventAggregator: EventAggregator,
  ) {}

  async onModuleInit() {
    this.client = new Client({
      connectionString: this.configService.get('DATABASE_URL'),
    });
    
    this.eventAggregator.subscribe(EventTypeEnum.INSERT, this.loggerObserver);
    // this.eventAggregator.subscribe(EventTypeEnum.UPDATE, this.loggerObserver);
    this.eventAggregator.subscribe(EventTypeEnum.DELETE, this.loggerObserver);

    this.eventAggregator.subscribe(EventTypeEnum.INSERT, this.notificationObserver);
    this.eventAggregator.subscribe(EventTypeEnum.UPDATE, this.cacheObserver);
    this.eventAggregator.subscribe(EventTypeEnum.DELETE, this.cacheObserver);

    await this.client.connect();
    await this.client.query('LISTEN db_changes');
    console.log('Subscribed to DB changes');
    this.client.on('notification', async (msg) => {
      const payload = JSON.parse(msg.payload!);
      this.eventAggregator.publish(payload.operation, payload);
    });    
  }
}
