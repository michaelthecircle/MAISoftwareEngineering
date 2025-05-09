import { Injectable } from '@nestjs/common';
import { EventTypeEnum } from 'src/common/event.types';

export interface Observer {
  update(eventType: EventTypeEnum, data: any): void;
}

@Injectable()
export class EventAggregator {
  private observers: Map<EventTypeEnum, Observer[]> = new Map();

  subscribe(eventType: EventTypeEnum, observer: Observer) {
    if (!this.observers.has(eventType)) {
      this.observers.set(eventType, []);
    }
    this.observers.get(eventType)!.push(observer);
  }

  unsubscribe(eventType: EventTypeEnum, observer: Observer) {
    const subscribers = this.observers.get(eventType);
    if (!subscribers) return;
    this.observers.set(
      eventType,
      subscribers.filter((sub) => sub !== observer),
    );
  }

  publish(eventType: EventTypeEnum, data: any) {
    const subscribers = this.observers.get(eventType);
    if (!subscribers) {
      console.log(`No subscribers found for event type: ${eventType}`);
      return;
    }

    for (const subscriber of subscribers) {
      subscriber.update(eventType, data);
    }
  }
}
