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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheObserver = exports.NotificationObserver = exports.LoggerObserver = void 0;
const nestjs_pino_1 = require("nestjs-pino");
const common_1 = require("@nestjs/common");
let LoggerObserver = class LoggerObserver {
    constructor(logger) {
        this.logger = logger;
    }
    update(eventType, data) {
        this.logger.log(`${eventType} ${JSON.stringify(data)}`);
    }
};
exports.LoggerObserver = LoggerObserver;
exports.LoggerObserver = LoggerObserver = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(nestjs_pino_1.Logger)),
    __metadata("design:paramtypes", [nestjs_pino_1.Logger])
], LoggerObserver);
let NotificationObserver = class NotificationObserver {
    update(eventType, data) {
        console.log(`[Notifier] sending notification: ${eventType}, Data: ${JSON.stringify(data)}`);
    }
};
exports.NotificationObserver = NotificationObserver;
exports.NotificationObserver = NotificationObserver = __decorate([
    (0, common_1.Injectable)()
], NotificationObserver);
let CacheObserver = class CacheObserver {
    update(eventType, data) {
        console.log(`[Cache] Updating cache for event: ${eventType} ${JSON.stringify(data)}`);
    }
};
exports.CacheObserver = CacheObserver;
exports.CacheObserver = CacheObserver = __decorate([
    (0, common_1.Injectable)()
], CacheObserver);
//# sourceMappingURL=observers.service.js.map