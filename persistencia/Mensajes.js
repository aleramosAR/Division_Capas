import Mensaje from './models/Mensaje.js';

async function loadMensajes() {
  return await Mensaje.find();
};

async function saveMensaje(mensaje) {
  const newMensaje = new Mensaje(mensaje);
  await newMensaje.save();
};

export { loadMensajes, saveMensaje }