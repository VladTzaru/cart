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
    TZARU_shoppingCart.addItem = function(name, price = 0, count = 1) {
        name = name.toLowerCase();
        /*
        Iterate over cart array. If there's an item with same name,
        increment the count.
        */
        for (let item of this.cart) {
            if (item.name === name) {
                item.count += count;
                this.save();
                return;
            }
        }

        const item = new this.Item(name, price, count);
        this.cart.push(item);
        this.save();
    };

    // removeItemFromCart : Function
    TZARU_shoppingCart.removeItem = function(name) {
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
        this.save();
    };

    // removeItemFromCartAll : Function
    TZARU_shoppingCart.removeItemAll = function(name) {
        name = name.toLowerCase();

        for (let i = 0; i < this.cart.length; i++) {
            if (this.cart[i].name === name) {
                this.cart.splice(i, 1);
                break;
            }
        }
        this.save();
    };

    // clearCart : Function
    TZARU_shoppingCart.clear = function() {
        this.cart.length = 0;
        this.save();
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


    // setCountForItem: Function
    TZARU_shoppingCart.setCountForItem = function(name, count) {
      for (let item of this.cart) {
        if (item.name === name) {
          item.count = count;
          break;
        }
      }
      this.save();
    };

    // listCart : Function
    TZARU_shoppingCart.list = function() { // Copy the cart to avoid object mutation
        const cartCopy = JSON.parse(JSON.stringify(this.cart));
        // Total cost per item
        for (let item of cartCopy) {
            item.total = (item.price * item.count).toFixed(2);
        }
        return cartCopy;
    };

    // save : Function
    TZARU_shoppingCart.save = function() {
        localStorage.setItem("shoppingCart", JSON.stringify(this.cart));
    };

    // loadCart : Function
    TZARU_shoppingCart.load = function() {
        this.cart = JSON.parse(localStorage.getItem("shoppingCart"));
        if (this.cart === null) {
            this.cart = [];
        }
    };
})();
