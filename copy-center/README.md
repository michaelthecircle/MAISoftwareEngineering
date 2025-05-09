# Copy Center System

This system is designed to manage print and photo printing requests. It leverages several design patterns to ensure flexibility, scalability, and maintainability, including Chain of Responsibility, State, and Proxy patterns.

### 🔧 Features

- **Submit Print Requests**: Users can submit print requests via API, including document type, print color (black & white or color), format, and other parameters.

- **Photo Handling**: For photo print requests, the system checks if the photo is available. If not, it uses a proxy to retrieve the photo from a remote service.

- **Printer Selection**: Print requests are processed through a chain of handlers. If the first printer (black and white) cannot handle the request, it is passed to the next handler (color printer).

- **Printer State Management**: Each printer can be in a different state (e.g., black-and-white or color printing). This state affects how the printer handles the print job.

- **Print Simulation**: The system simulates the printing process, adding delays to imitate real-world printing time.

### 🧠 Design Patterns

- **Chain of Responsibility**: 
  - Implemented through `BlackAndWhitePrinterHandler` and `ColorPrinterHandler` classes.
  - Each handler either processes the request or passes it to the next handler in the chain.
  - The request first goes to the black-and-white printer, and if it cannot handle it (e.g., for color printing), it is passed to the color printer.
  - This pattern allows flexible configuration of request handling order and makes it easy to add new types of printers.

- **State**: 
  - Implemented through `BlackAndWhiteState` and `ColorState` classes.
  - Each printer can be in different states (e.g., black-and-white or color printing).
  - The state determines how the printer is configured and how it performs the print operation.
  - New states (e.g., printing on special paper) can be easily added without changing existing code.

- **Proxy**: 
  - Implemented through `PhotoServiceProxy` and `RealPhotoService` classes.
  - If the user requests a photo print but does not provide the photo, the proxy is used to retrieve the photo.
  - The proxy checks the availability of the photo service and delegates the request to the real service.
  - This allows for additional logic (e.g., availability checks) before accessing the real service.

### 🛠️ Technologies Used

- **NestJS**

### 🚀 API Endpoints

- **POST /copy-center/print**: Submit a print request with document type, color, and format.
  
- **GET /copy-center/status**: Get the current status of the printers and the system.

- **GET /copy-center/queue**: View the current print job queue.

### ⚙️ How the System Works

1. **Processing Print Request**: 
   - The user submits a print request via the `/copy-center/print` API. The request contains information about the document type, color, format, etc.

2. **Photo Handling**:
   - If the print request is for a photo and the photo is not provided, the system uses a proxy (`PhotoServiceProxy`) to check the availability of the photo service.
   - The proxy delegates the request to the real service (`RealPhotoService`) to retrieve the photo.

3. **Printer Selection**:
   - The print request is passed through the chain of handlers.
   - The black-and-white printer checks if it can handle the request.
   - If not (e.g., if it's a color print request), the request is passed to the color printer handler.

4. **Configuration and Printing**:
   - Once a printer is selected, it is configured according to the requested state (black-and-white or color).
   - The printing process is simulated, with delays to represent real-world printing time.

5. **Testing**:
   - A dedicated controller is created for testing with various test requests.
   - Test cases cover scenarios such as black-and-white printing, color printing, and photo printing (with and without a photo).

### 🧑‍💻 Benefits of this Architecture

- **Flexibility**: New printer types, states, and additional functionality can be added easily without modifying existing code.

- **Separation of Concerns**: Each component has a clear responsibility, such as processing print requests, managing printer states, or handling photo retrieval.

- **Scalability**: The system is scalable and can handle an increasing number of print jobs and different types of printers.

- **Testability**: Due to the clear separation of components, the system is easy to test, with each component being independently testable.

### 🧠 Future Enhancements

- **Support for More Printer Types**: More printer types (e.g., laser, inkjet) can be added to the chain without affecting the existing logic.
  
- **Advanced Print Settings**: Additional states for printers (e.g., printing on special paper, photo paper) can be introduced.
  
- **Monitoring and Analytics**: The system could include monitoring features such as print job statistics, printer status, and job completion rates.
