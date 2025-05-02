import { EventTypeEnum } from 'src/common/event.types';
export interface Observer {
    update(eventType: EventTypeEnum, data: any): void;
}
export declare class EventAggregator {
    private observers;
    subscribe(eventType: EventTypeEnum, observer: Observer): void;
    unsubscribe(eventType: EventTypeEnum, observer: Observer): void;
    publish(eventType: EventTypeEnum, data: any): void;
}
