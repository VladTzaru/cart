const TZARU_shoppingCart = {};

// ********************* SHOPPING CART ********************* //
(function() {
    'use strict';

    // cart : Array
    TZARU_shoppingCart.cart = [];

    // Item : Class
    TZARU_shoppingCart.Item = function(name, price, count) {
      this.name = name;
      this.price = price;
      this.count = count;
    };

    // addItemToCart : Function
    TZARU_shoppingCart.addItemToCart = function(name, price = 0, count = 1) {
        name = name.toLowerCase();
        /*
        Iterate over cart array. If there's an item with same name,
        increment the count.
        */
        for (let item of this.cart) {
            if (item.name === name) {
                item.count += count;
                this.saveCart();
                return;
            }
        }

        const item = new this.Item(name, price, count);
        this.cart.push(item);
        this.saveCart();
    };

    // removeItemFromCart : Function
    TZARU_shoppingCart.removeItemFromCart = function(name) {
        name = name.toLowerCase();

        for (let i = 0; i < this.cart.length; i++) {
            if (this.cart[i].name === name) {
                this.cart[i].count--;
                if (this.cart[i].count === 0) {
                    this.cart.splice(i, 1);
                }
                break;
            }
        }
        this.saveCart();
    };

    // removeItemFromCartAll : Function
    TZARU_shoppingCart.removeItemFromCartAll = function(name) {
        name = name.toLowerCase();

        for (let i = 0; i < this.cart.length; i++) {
            if (this.cart[i].name === name) {
                this.cart.splice(i, 1);
                break;
            }
        }
        this.saveCart();
    };

    // clearCart : Function
    TZARU_shoppingCart.clearCart = function() {
        this.cart.length = 0;
        this.saveCart();
    };

    // totalPrice : Function
    TZARU_shoppingCart.totalPrice = function() {
        let total = 0;
        for (let item of this.cart) {
            total += item.price * item.count;
        }
        return total.toFixed(2);
    };

    // totalItemCount: Function
    TZARU_shoppingCart.totalItemCount = function() {
        let itemCount = 0;
        for (let i = 0; i < cart.length; i++) {
            itemCount += cart[i].count;
        }
        return itemCount;
    };

    // listCart : Function
    TZARU_shoppingCart.listCart = function() { // Copy the cart to avoid object mutation
        const cartCopy = JSON.parse(JSON.stringify(this.cart));
        // Total cost per item
        for (let item of cartCopy) {
            item.total = (item.price * item.count).toFixed(2);
        }
        return cartCopy;
    };

    // saveCart : Function
    TZARU_shoppingCart.saveCart = function() {
        localStorage.setItem("shoppingCart", JSON.stringify(this.cart));
    };

    // loadCart : Function
    TZARU_shoppingCart.loadCart = function() {
        this.cart = JSON.parse(localStorage.getItem("shoppingCart"));
        if (this.cart === null) {
            this.cart = [];
        }
    };
})();
