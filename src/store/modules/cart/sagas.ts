import { all, takeLatest, select } from 'redux-saga/effects'; 
import { IState } from '../..';
import { addProductToCartRequest } from './actions';

type checkProductStockRequest = ReturnType<typeof addProductToCartRequest>;

function* checkProductStock( action :checkProductStockRequest){
    const { payload } = action
    console.log('Maradona', payload.product.id );
    const currentQuantity: number = yield select((state: IState) => {
        return state.cart.items.find( item => item.product.id == payload.product.id )?.quantity ?? 0
    });
    console.log("Dentro do carrinho tenho"," ", currentQuantity," - ", payload.product.title );
}

export default all([
    takeLatest('ADD_PRODUCT_TO_CART_REQUEST', checkProductStock )
]);
