import {
  getProductosNegocio,
  getProductoNegocio,
  postProductoNegocio,
  deleteProductoNegocio,
  updateProductoNegocio
} from '../negocio/Productos.js';

async function getProductsController(req, res) {
  try {
    const productos = await getProductosNegocio();
    if (productos.length === 0) { return res.status(404).json({ error: "No hay productos cargados." }) }
    res.status(200).json(productos);
  } catch (err) { return res.status(404).json({ error: "No hay productos cargados." }); }
};

async function getProductController(req, res) {
  try {
    const prod = await getProductoNegocio(req.params);
    if (!prod) { return res.status(404).json({ error: "Producto no encontrado." }); }
    res.status(200).json(prod);
  } catch (err) { return res.status(404).json({ error: "Producto no encontrado." }); }
};

async function postProductController(req, res) {
  try {
    const newProducto = await postProductoNegocio(req.body);
    res.status(201).json(newProducto);
  } catch (err) { res.status(400).send(); }
};

async function updateProductController(req, res) {
  const { id } = req.params;
  const newData = req.body;

  try {
    const updatedProd = await updateProductoNegocio(id, newData);
    res.status(200).json(updatedProd);
  } catch (err) {
    res.status(404).json({ error: "Producto no encontrado." });
  }
};

async function deleteProductController(req, res) {
  try {
    const prod = await deleteProductoNegocio(req.params.id);
    res.status(201).json(prod);
  } catch (err) {
    res.status(404).json({ error: "Producto no encontrado." });
  }
};

async function getProducts() {
  try {
    const productos = await getProductosNegocio();
    if (productos.length === 0) { return { error: "No hay productos cargados." }; }
    return productos;
  } catch (err) {
    return { error: "No hay productos cargados." };
  }
};

export {
  getProductsController,
  getProductController,
  postProductController,
  updateProductController,
  deleteProductController,
  getProducts
}