import React from "react";
import { useSelector } from "react-redux";
import { IState } from "../store";
import { ICartItem } from "../store/modules/cart/types";

const Cart : React.FC = () => {
    const cart = useSelector<IState, ICartItem[]>(state => state.cart.items)

    return (
        <table>
            <thead>
                <tr>
                    <th>Produto</th>
                    <th>Preço</th>
                    <th>Quantidade</th>
                    <th>Subtotal</th>
                </tr>
            </thead>
            <tbody>
                {cart.map(itemCarrinho => (
                    <tr key= {itemCarrinho.product.id}>
                        <td>{itemCarrinho.product.title}</td>
                        <td>{itemCarrinho.product.price}</td>
                        <td>{itemCarrinho.quantity}</td>
                        <td> {(  itemCarrinho.product.price * itemCarrinho.quantity ).toFixed(2)} </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Cart;