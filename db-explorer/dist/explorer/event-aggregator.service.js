"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventAggregator = void 0;
const common_1 = require("@nestjs/common");
let EventAggregator = class EventAggregator {
    constructor() {
        this.observers = new Map();
    }
    subscribe(eventType, observer) {
        if (!this.observers.has(eventType)) {
            this.observers.set(eventType, []);
        }
        this.observers.get(eventType).push(observer);
    }
    unsubscribe(eventType, observer) {
        const subscribers = this.observers.get(eventType);
        if (!subscribers)
            return;
        this.observers.set(eventType, subscribers.filter((sub) => sub !== observer));
    }
    publish(eventType, data) {
        const subscribers = this.observers.get(eventType);
        if (!subscribers) {
            console.log(`No subscribers found for event type: ${eventType}`);
            return;
        }
        for (const subscriber of subscribers) {
            subscriber.update(eventType, data);
        }
    }
};
exports.EventAggregator = EventAggregator;
exports.EventAggregator = EventAggregator = __decorate([
    (0, common_1.Injectable)()
], EventAggregator);
//# sourceMappingURL=event-aggregator.service.js.map