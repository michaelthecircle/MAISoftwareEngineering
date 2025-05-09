"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const db_listener_service_1 = require("./explorer/db-listener.service");
const config_1 = require("@nestjs/config");
const nestjs_pino_1 = require("nestjs-pino");
const observers_service_1 = require("./explorer/observers.service");
const event_aggregator_service_1 = require("./explorer/event-aggregator.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: '../.env',
                isGlobal: true,
            }),
            nestjs_pino_1.LoggerModule.forRoot({
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
        providers: [db_listener_service_1.DbListenerService, observers_service_1.LoggerObserver, observers_service_1.NotificationObserver, observers_service_1.CacheObserver, event_aggregator_service_1.EventAggregator],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map