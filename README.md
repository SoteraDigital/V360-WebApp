# V360-WebApp
added a node.js application (server.js) which will start two web servers.

"http://localhost:8059"

Will point to the web dashboard application which handles bluetooth transactions.

The http://localhost:8503 is a http proxy used to forward network request to the camera while bypassing CORS restrictions on web browsers.

If ports require changes they can be updated on servers.js and setvars.js
