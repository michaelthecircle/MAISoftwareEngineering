# Copy Center Service
## Features

- Process print requests for different types of documents
- Support for black and white and color printing
- Photo printing with automatic photo capture if needed
- Different document formats (A4, 4x6, 5x7)

## API Usage

Send a POST request to `http://localhost:3000/copy-center/print` with the following JSON body:

```json
{
  "id": "unique-request-id",
  "type": "PHOTO", // or "DOCUMENT"
  "color": "COLOR", // or "BLACK_AND_WHITE"
  "format": "A4", // or "PHOTO_4X6" or "PHOTO_5X7"
  "hasPhoto": true, // optional, for photo requests
  "photoData": "base64_encoded_photo", // optional, for photo requests
  "timestamp": 1234567890
}
```

## Example Requests

1. Black and white document:
```json
{
  "id": "doc-1",
  "type": "DOCUMENT",
  "color": "BLACK_AND_WHITE",
  "format": "A4",
  "timestamp": 1234567890
}
```

2. Color photo with existing photo:
```json
{
  "id": "photo-1",
  "type": "PHOTO",
  "color": "COLOR",
  "format": "PHOTO_4X6",
  "hasPhoto": true,
  "photoData": "base64_encoded_photo",
  "timestamp": 1234567890
}
```

3. Color photo without photo (will trigger photo capture):
```json
{
  "id": "photo-2",
  "type": "PHOTO",
  "color": "COLOR",
  "format": "PHOTO_5X7",
  "hasPhoto": false,
  "timestamp": 1234567890
}
``` 