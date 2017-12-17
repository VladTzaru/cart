const TZARU_shoppingCart = ( function () {
    'use strict';
    /* -------------------------------------------------------
                  PRIVATE METHODS AND PROPERTIES
     -------------------------------------------------------*/
    // cart : Array
    let cart = [];

    // Item : Class
    class Item {
        constructor( name, price, count ) {
            this.name = name;
            this.price = price;
            this.count = count;
        }
    }

    // save : Function
    function save() {
        localStorage.setItem( "shoppingCart", JSON.stringify( cart ) );
    }

    // loadCart : Function
    function load() {
        cart = JSON.parse( localStorage.getItem( "shoppingCart" ) );
        if ( cart === null ) {
            cart = [];
        }
    }


    /* -------------------------------------------------------
                  PUBLIC METHODS AND PROPERTIES
     -------------------------------------------------------*/
    const obj = {};

    // addItemToCart : Function
    obj.addItem = function ( name, price = 0, count = 1 ) {
        name = name.toLowerCase();
        /*
        Iterate over cart array. If there's an item with same name,
        increment the count.
        */
        for ( let item of cart ) {
            if ( item.name === name ) {
                item.count += count;
                save();
                return;
            }
        }

        const item = new Item( name, price, count );
        cart.push( item );
        save();
    };

    // removeItemFromCart : Function
    obj.removeItem = function ( name ) {
        name = name.toLowerCase();

        for ( let i = 0; i < cart.length; i++ ) {
            if ( cart[ i ].name === name ) {
                cart[ i ].count--;
                if ( cart[ i ].count === 0 ) {
                    cart.splice( i, 1 );
                }
                break;
            }
        }
        save();
    };

    // removeItemFromCartAll : Function
    obj.removeItemAll = function ( name ) {
        name = name.toLowerCase();

        for ( let i = 0; i < cart.length; i++ ) {
            if ( cart[ i ].name === name ) {
                cart.splice( i, 1 );
                break;
            }
        }
        save();
    };

    // clearCart : Function
    obj.clear = function () {
        cart.length = 0;
        save();
    };

    // totalItemCount: Function
    obj.totalItemCount = function () {
        let itemCount = 0;
        for ( let i = 0; i < cart.length; i++ ) {
            itemCount += cart[ i ].count;
        }
        return itemCount;
    };

    // totalPrice : Function
    obj.totalPrice = function () {
        let total = 0;
        for ( let item of cart ) {
            total += item.price * item.count;
        }
        return total.toFixed( 2 );
    };

    // setCountForItem: Function
    obj.setCountForItem = function ( name, count ) {
        for ( let item of cart ) {
            if ( item.name === name ) {
                item.count = count;
                break;
            }
        }
        save();
    };

    // listCart : Function
    obj.list = function () { // Copy the cart to avoid object mutation
        const cartCopy = JSON.parse( JSON.stringify( cart ) );
        // Total cost per item
        for ( let item of cartCopy ) {
            item.total = ( item.price * item.count ).toFixed( 2 );
        }
        return cartCopy;
    };


    // Invoke methods and return obj
    load();

    return obj;
} )();
