# daniarthurwidodo.github.io

## How to Run Locally

To view this project locally, you need to serve the files using a local web server due to browser security restrictions (CORS policy).

### Using Python's Built-in HTTP Server

If you have Python installed, you can use its simple HTTP server:

1.  Open your terminal or command prompt.
2.  Navigate to the project root directory:
    ```bash
    cd C:\Users\arthur\Documents\repos\porto\daniarthurwidodo.github.io
    ```
3.  Run the server:
    ```bash
    python -m http.server
    ```
4.  Open your web browser and go to `http://localhost:8000` (or the port displayed in your terminal).

### Using PHP's Built-in Web Server

If you have PHP installed, you can use its built-in web server:

1.  Open your terminal or command prompt.
2.  Navigate to the project root directory:
    ```bash
    cd C:\Users\arthur\Documents\repos\porto\daniarthurwidodo.github.io
    ```
3.  Run the server:
    ```bash
    php -S localhost:8000
    ```
4.  Open your web browser and go to `http://localhost:8000` (or your chosen port).

### Using Node.js with `http-server` (via `npx`)

If you have Node.js installed, you can use `npx` to run the `http-server` package without installing it globally:

1.  Open your terminal or command prompt.
2.  Navigate to the project root directory:
    ```bash
    cd C:\Users\arthur\Documents\repos\porto\daniarthurwidodo.github.io
    ```
3.  Run the server:
    ```bash
    npx http-server
    ```
4.  Open your web browser and go to `http://localhost:8080` (or the address displayed in your terminal).


Serving the files this way will ensure all features, including dynamic data loading and icon display, work correctly.