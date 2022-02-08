import React, { createContext, useContext, useEffect, useState } from 'react';

export const cartContext = createContext([])

export function useCartContext() {return useContext(cartContext)} 

export default function CartContextProvider({ children }) {
    const [cartList, setCartList] = useState([]);
    const [totalPrice, setTotalPrice] = useState(priceSum());
    const [totalQuantity, setTotalQuantity] = useState('');

    function addToCart(item){
        if (findDuplicate(item)){
            cartList.find( ({id}) => id === item.id).quantity += item.quantity;
        }else{
            setCartList([...cartList, item]);
            
        }
    }

    function clearCart(){
        setCartList([]);
    }

    function removeItem(item){
        setCartList(cartList.filter(({id}) => id !== item.id))
    }

    function findDuplicate(item){
        return cartList.find( ({id}) => id === item.id)
    }

    function addQuantity(item){
        let quantityToAdd = Number(cartList.find( ({id}) => id === item.id).quantity);
        if (quantityToAdd<item.stock) {
            quantityToAdd += 1
        }
        cartList.find( ({id}) => id === item.id).quantity = quantityToAdd;
    }

    function subtractQuantity(item){
        let quantityToSub = cartList.find( ({id}) => id === item.id).quantity;
        if (quantityToSub>1) {
            quantityToSub = quantityToSub-1
        }
        cartList.find( ({id}) => id === item.id).quantity = quantityToSub;
    }

    function priceSum(){
        let priceSum = 0;
        for (let index = 0; index < cartList.length; index++) {
            priceSum = priceSum + (cartList[index].quantity*cartList[index].price);
        }
        return priceSum
    }

    function quantitySum(){
        let quantitySum = 0;
        for (let index = 0; index < cartList.length; index++) {
            quantitySum = quantitySum + Number(cartList[index].quantity);
        }
        return quantitySum
    }

    useEffect(() => {
      if (cartList.length === 0){
        setTotalPrice(0)
      };
    }, [cartList]);
    

    return <cartContext.Provider value={{ cartList, addToCart, clearCart, removeItem, addQuantity, subtractQuantity, priceSum, totalPrice, setTotalPrice, quantitySum, totalQuantity, setTotalQuantity, findDuplicate }}>
        {children}
    </cartContext.Provider>;
}
