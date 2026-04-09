import { useContext, useEffect, useState, type ChangeEvent } from "react";
import { type IProducto } from "./Interface/Producto";
import { CartContext } from "./CartContext";

export default function Store() {
  const [productos, setProductos] = useState<IProducto[]>([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => {
        const dataSegura = data as IProducto[];
        setProductos(dataSegura);
      });
  }, []);

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setBusqueda(e.target.value);
  }

  const _context = useContext(CartContext);

  if(!_context) throw new Error("Contexto no disponible");
  const { carrito } = _context;

  return carrito;
}