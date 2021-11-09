import { AxiosResponse } from 'axios';
import { all, takeLatest, select, call, put } from 'redux-saga/effects'; 
import { IState } from '../..';
import api from '../../../services/api';
import { addProductToCartRequest, addProductToCartSuccess, addProductToCartFailure } from './actions';
import { ActionTypes } from './types';

type checkProductStockRequest = ReturnType<typeof addProductToCartRequest>;

interface IStockResponse {
    id: number;
    quantity: number;
}

function* checkProductStock( action :checkProductStockRequest){
    const { payload } = action

    // console.log('Maradona', payload.product.id );

    const currentQuantity: number = yield select((state: IState) => {
        return state.cart.items.find( item => item.product.id == payload.product.id )?.quantity ?? 0
    });

    const avalibleStockResponse: AxiosResponse<IStockResponse> = yield call(api.get, `stock/${payload.product.id}`);
    
    if(avalibleStockResponse.data.quantity > currentQuantity){
        yield put(addProductToCartSuccess(payload.product));
    } else {
        yield put(addProductToCartFailure(payload.product.id));
    }
    // console.log("Dentro do carrinho tenho"," ", currentQuantity," - ", payload.product.title );
}

export default all([
    takeLatest( ActionTypes.addProductToCartRequest, checkProductStock )
]);
