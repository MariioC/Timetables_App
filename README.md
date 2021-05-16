# App-Motorcycles with VUE, NODE, SOCKET, POSTGRES

## Description

This app, is an example of how to use socket.io 

In summary, You can take one or more turns, within different timatables available.
There is a maximum of 8 turns available, if you select one turn, the second time you select that turn, your selection will be deleted. And in case there are no turns available, you will not be able to take the turn in that timetable.

Those turns will be show in real time via websockets in VUE and all data will be save in the database of postgresql.

You can clone this repository and then...

## Project setup

## Client
For the client side, you need execute:

```
cd client
```
and then...

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

## Server
For the server, you need create a database in postgres.

The script .sql is inside the folder "database" in the server.

```
server > database > database.sql
```

You can copy and paste the content in terminal from postgres.

...And the you need execute:

```
cd server
```

```
npm install
```

### execute server for development

```
npm run dev
```

# Note
The server use PORT 3000, if you want modify that, you need modify the config API in VUE, that file is in

```
client/src/services/config.js - Variable API_URI
```

## DEMO GIFS

Here you have two demostrations of the app

### Login
[![Login ](https://j.gifs.com/08RY3y.gif)]

### Home
[![Demo ](https://j.gifs.com/pZY8Vp.gif)]