import { createContext } from "react";
import type { ICartItem } from "./Interface/CartItem";

interface CartContextType {
  carrito: ICartItem[];
  agregarAlCarrito: (item: ICartItem) => void;
  total: number;
}

export const CartContext = createContext<CartContextType | null>(null);