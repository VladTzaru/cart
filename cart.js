
(function() {
    'use strict';

    // displayCart : Function

    // ********************* VIEW ********************* //
    $(".add-to-cart").click(function(e) {
        e.preventDefault();
        const itemName = $(this).attr("data-name");
        const itemPrice = Number($(this).attr("data-price"));
        addItemToCart(itemName, itemPrice);
        displayCart();
    });


    $("#clear-cart").click(function(e) {
        clearCart();
        displayCart();
    });


    // Delete Item
    $("#display-cart").on("click", ".delete-item", function(e) {
        const itemName = $(this).attr("data-name");
        removeItemFromCartAll(itemName);
        displayCart();
    });


    // Add Item
    $("#display-cart").on("click", ".add-item", function(e) {
        const itemName = $(this).attr("data-name");
        addItemToCart(itemName);
        displayCart();
    });


    // Subtract Item
    $("#display-cart").on("click", ".subtract-item", function(e) {
        const itemName = $(this).attr("data-name");
        removeItemFromCart(itemName);
        displayCart();
    });


    function displayCart() {
        const cartArray = listCart();
        let output = "";
        for (let item of cartArray) {
            output += `<li>
            ${item.name} | $${item.price} * ${item.count} = ${item.total}
            <button type="button" class="subtract-item" data-name="${item.name}">-</button>
            <button type="button" class="add-item" data-name="${item.name}">+</button>
            <button type="button" class="delete-item" data-name="${item.name}">x</button>
            </li>`;
        }
        $("#display-cart").html(output);
        $("#total-price").html(totalPrice());
    }


    // ********************* SHOPPING CART ********************* //
    const TZARU_shoppingCart = {};

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
        for (let item of cart) {
            if (item.name === name) {
                item.count += count;
                saveCart();
                return;
            }
        }

        const item = new Item(name, price, count);
        cart.push(item);
        saveCart();
    };

    // removeItemFromCart : Function
    TZARU_shoppingCart.removeItemFromCart = function(name) {
        name = name.toLowerCase();

        for (let i = 0; i < cart.length; i++) {
            if (cart[i].name === name) {
                cart[i].count--;
                if (cart[i].count === 0) {
                    cart.splice(i, 1);
                }
                break;
            }
        }
        saveCart();
    };

    // removeItemFromCartAll : Function
    TZARU_shoppingCart.removeItemFromCartAll = function(name) {
        name = name.toLowerCase();

        for (let i = 0; i < cart.length; i++) {
            if (cart[i].name === name) {
                cart.splice(i, 1);
                break;
            }
        }
        saveCart();
    };

    // clearCart : Function
    TZARU_shoppingCart.clearCart = function() {
        cart.length = 0;
        saveCart();
    };

    // totalPrice : Function
    TZARU_shoppingCart.totalPrice = function() {
        let total = 0;
        for (let item of cart) {
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
        const cartCopy = JSON.parse(JSON.stringify(cart));
        // Total cost per item
        for (let item of cartCopy) {
            item.total = (item.price * item.count).toFixed(2);
        }
        return cartCopy;
    };

    // saveCart : Function
    TZARU_shoppingCart.saveCart = function() {
        localStorage.setItem("shoppingCart", JSON.stringify(cart));
    };

    // loadCart : Function
    TZARU_shoppingCart.loadCart = function() {
        cart = JSON.parse(localStorage.getItem("shoppingCart"));
        if (cart === null) {
            cart = [];
        }
    };



    // Invoke Methods
    TZARU_shoppingCart.loadCart();
    displayCart();


})();
