# Service Center System

This system is designed to manage the repair and maintenance of smartphone components. It provides an interface for clients to submit repair requests, checks for the availability of necessary parts, handles the repair process, and manages a pool of components.

### 🔧 Features

- **Submit Repair Requests**: Clients can submit repair requests via API, providing details such as device type, model, and problem description.
  
- **Request Status**: Each request starts with a "PENDING" status. If parts are available, it moves to "IN_PROGRESS"; if parts are not available, it moves to "WAITING_PARTS".
  
- **Repair Process**: The system sends broken components to the workshop. There is a 70% success rate for repairs, with successful repairs returned to the pool and unsuccessful repairs sent to disposal.

- **Component Pool Management**: The system keeps track of available components and their statuses (e.g., available, in repair, disposed).
  
- **Monitoring and Stats**: The system monitors the number of active requests, the status of components, the repair queue, repair success rates, and the count of disposed components.

### 🧠 Design Patterns

- **Singleton**: Used in the `SmartphoneComponentFactory` to ensure a single instance of the component factory, guaranteeing consistent component creation across the system.

- **Abstract Factory**: The `ComponentFactory` creates various types of components, allowing for easy expansion and addition of new component types.

- **Prototype**: Components are cloned from prototypes, accelerating the creation of new components.

- **Facade**: The `ServiceCenterFacadeService` simplifies interaction with the system by exposing a high-level API and hiding the complexity of the internal components.

### 🛠️ Technologies Used

- **NestJS**
  
### 🚀 API Endpoints

- **POST /service-center/repair-requests**: Submit a repair request.
  
- **POST /service-center/process**: Process all pending requests.
  
- **GET /service-center/status**: Get the overall system status.
  
- **GET /service-center/active-requests**: Get a list of active repair requests.
  
- **GET /service-center/disposed-components**: Get a list of components that were disposed of.

### ⚙️ Special Implementation Features

- **Discrete Time System**: The system processes repair requests on demand rather than in real-time.
  
- **Random Initial Component Pool**: The system generates an initial state for the component pool with random availability.
  
- **Repair History**: The system keeps track of the repair history for each component.
  
- **Repair Statistics**: The system records the success rate of repairs, providing valuable insights into the system's performance.

### 📊 Monitoring

The following aspects of the system can be monitored:

- **Active Requests**: The number of currently active repair requests.
  
- **Component Pool Status**: The availability and status of components in the pool.
  
- **Workshop Queue**: The current queue in the workshop for repairs.
  
- **Repair Success Rate**: The percentage of repairs that are successfully completed.
  
- **Disposed Components**: The number of components that have been discarded after unsuccessful repairs.
