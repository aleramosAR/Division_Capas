import express from 'express';
import handlebars from 'express-handlebars';
import cookieParser from "cookie-parser";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import session from "express-session";
import {PORT, passportConfig} from './utils/config.js';
import { storeData, initDatabase } from './persistencia/datos.js'
import { getProducts } from './controllers/ProductControllers.js'
import { getMensajes } from './controllers/MensajesControllers.js'
import routes from './routes/index.js';

(async () => {
  try {
		await initDatabase();
		connectSocket();
  } catch (err) {
    console.log(err.message);
  }
})();

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
configApp(app);

function configApp(app) {
	app.use(cookieParser())
	app.use(session(storeData));
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(express.static('public'));
	app.use(routes);
	app.use(passportConfig.initialize());
	app.use(passportConfig.session());

	app.engine('hbs', handlebars({ extname: 'hbs', defaultLayout: 'layout.hbs' }));
	app.set("views", "./views");
	app.set('view engine', 'hbs');
}

async function showProducts() {
	try { io.sockets.emit("listProducts", await getProducts()); }
	catch (e) { console.log(e); }
};

async function showMensajes() {
	try { io.sockets.emit("listMensajes", await getMensajes()); }
	catch (e) { console.log(e); }
};

function connectSocket() {
	io.on("connection", (socket) => {
		console.log("Nuevo cliente conectado!");
		io.sockets.emit("initApp", { PORT });
		showProducts();
		showMensajes();

		socket.on("postProduct", () => {
			showProducts();
		}).on("updateProduct", () => {
			showProducts();
		}).on("deleteProduct", () => {
			showProducts();
		}).on("postMensaje", data => {
			showMensajes();
		}).on('disconnect', () => {
			console.log('Usuario desconectado')
		});
	});
}

httpServer.listen(PORT, () => { console.log(`Ya me conecte al puerto ${PORT}.`); })
.on("error", (error) => console.log("Hubo un error inicializando el servidor.") );