import Producto from './models/Producto.js'

async function loadProductos() {
  return await Producto.find();
};

async function loadProducto(id) {
  return await Producto.findOne({ _id: id })
};

async function saveProducto(producto) {
  const newProducto = new Producto(producto);
  await newProducto.save();
};

async function deleteProducto(id) {
  await Producto.findOneAndRemove({ _id: id });
  return id;
};

async function updateProducto(id, newProduct) {
  const updatedProducto = await Producto.replaceOne({ _id: id }, newProduct );
  return updatedProducto;
};

export {
  loadProductos,
  loadProducto,
  saveProducto,
  deleteProducto,
  updateProducto
}