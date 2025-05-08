# DB Explorer

DB Explorer is a real-time database monitoring and event handling tool built with NestJS. It allows to listen to database changes, process events, and integrate custom observers for logging, notifications, and caching.

## Key Features

- **Event Aggregation**: Centralized handling of database events using the Observer pattern.
- **Custom Observers**: Built-in support for logging, notifications, and caching, with the ability to add more.
- **Real-Time Monitoring**: Listens to database changes and processes them in real-time.
- **Configurable**: Easily configurable via environment variables.

## Technologies Used

- **Backend Framework**: NestJS
- **Database**: PostgreSQL
- **Logging**: Pino with `nestjs-pino`

## How It Works

1. **Database Listener**: The `DbListenerService` listens for database changes using PostgreSQL's `LISTEN`/`NOTIFY` mechanism.
2. **Event Aggregation**: Events are published to the `EventAggregator`, which notifies subscribed observers.
3. **Observers**: Observers like `LoggerObserver`, `NotificationObserver`, and `CacheObserver` handle events based on their type (e.g., INSERT, UPDATE, DELETE).
