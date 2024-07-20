# URL Shortener Service

A URL Shortener Service built using Node.js and Express.js.

## Features

- Generate unique 5-character short URLs.
- Accept custom short URLs.
- Redirect to original URLs.
- Maintain max 1000 URLs by removing the oldest ones.
- Validate full URLs.
- Prevent duplicate shortened URLs.
- Graceful error handling.

## Prerequisites

- Node.js
- npm
- MongoDB

## Installation

1. Clone the repo:
    ```bash
    git clone https://github.com/yourusername/url-shortener.git
    cd url-shortener
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file:
    ```env
    MONGODB_URI=mongodb://localhost:27017/urlshortener
    ```
4. Start the server:
    ```bash
    npm start
    ```

## API Endpoints

### Create a New Short URL

- **POST /new**
- **Request Body:**
    ```json
    {
        "full": "http://example.com",
        "custom": "customShortUrl" 
    }
    ```
- **Responses:**
    - `201 Created` - New short URL created.
    - `200 OK` - Existing short URL returned.
    - `400 Bad Request` - Invalid full URL or custom short URL in use.
    - `500 Internal Server Error` - Error in creating short URL.

### Redirect to Full URL

- **GET /:short**
- **Responses:**
    - `302 Found` - Redirects to full URL.
    - `404 Not Found` - No such short URL.
    - `500 Internal Server Error` - Error in retrieving URL.

## Contact
For any queries, drop an email @ yaaash04@gmail.com
