"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbListenerService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const pg_1 = require("pg");
const event_aggregator_service_1 = require("./event-aggregator.service");
const observers_service_1 = require("./observers.service");
const event_types_1 = require("../common/event.types");
let DbListenerService = class DbListenerService {
    constructor(loggerObserver, notificationObserver, cacheObserver, configService) {
        this.loggerObserver = loggerObserver;
        this.notificationObserver = notificationObserver;
        this.cacheObserver = cacheObserver;
        this.configService = configService;
        this.eventAggregator = new event_aggregator_service_1.EventAggregator();
    }
    async onModuleInit() {
        this.client = new pg_1.Client({
            connectionString: this.configService.get('DATABASE_URL'),
        });
        await this.client.connect();
        await this.client.query('LISTEN db_changes');
        console.log('Subscribed to DB changes');
        this.client.on('notification', async (msg) => {
            const payload = JSON.parse(msg.payload);
            this.eventAggregator.publish(payload.operation, payload);
        });
        this.eventAggregator.subscribe(event_types_1.EventTypeEnum.INSERT, this.loggerObserver);
        this.eventAggregator.subscribe(event_types_1.EventTypeEnum.UPDATE, this.loggerObserver);
        this.eventAggregator.subscribe(event_types_1.EventTypeEnum.DELETE, this.loggerObserver);
        this.eventAggregator.subscribe(event_types_1.EventTypeEnum.INSERT, this.notificationObserver);
        this.eventAggregator.subscribe(event_types_1.EventTypeEnum.UPDATE, this.cacheObserver);
        this.eventAggregator.subscribe(event_types_1.EventTypeEnum.DELETE, this.cacheObserver);
    }
};
exports.DbListenerService = DbListenerService;
exports.DbListenerService = DbListenerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [observers_service_1.LoggerObserver,
        observers_service_1.NotificationObserver,
        observers_service_1.CacheObserver,
        config_1.ConfigService])
], DbListenerService);
//# sourceMappingURL=db-listener.service.js.map