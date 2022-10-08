# crocodile-frontend

## nginx conf

```nginx configuration
server {
    listen 80;
    listen [::]:80;
    server_name crocodile-frontend.std-1822.ist.mospolytech.ru;

    root /home/std/crocodile-frontend;

    location / {
       try_files $uri /index.html;
    }
}
```