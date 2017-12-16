(function() {
  'use strict';

  // ********************* VIEW ********************* //
  $(".add-to-cart").click(function(e) {
    e.preventDefault();
    const itemName = $(this).attr("data-name");
    const itemPrice = Number($(this).attr("data-price"));
    addItemToCart(itemName, itemPrice, 1);
    displayCart();
  });


  function displayCart() {
    const cartArray = listCart();
    let output = "";
    for (let item of cart) {
      output += `<li>${item.name} | $${item.price} | ${item.count}</li>`;
    }
    $("#display-cart").html(output);
    $("#total-price").html( totalPrice() );
  }


  // ********************* SHOPPING CART ********************* //
  let cart = [];


  class Item {
    constructor(name, price, count) {
      this.name = name;
      this.price = price;
      this.count = count;
    }
  }


  function addItemToCart(name, price, count) {    // Add an item to the cart

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
  }


  function removeItemFromCart(name) {   // Remove 1 item from cart

    name = name.toLowerCase();

    for (let i = 0; i < cart.length; i++) {
      if (cart[i].name === name) {
        cart[i].count--;
        if (cart[i].count === 0) {
          cart.splice(i, 1);
        }
        break;
      }
      saveCart();
    }
  }


  function removeItemFromCartAll(name) {    // Clear 1 item and its count at once

    name = name.toLowerCase();

    for (let i = 0; i < cart.length; i++) {
      if(cart[i].name === name) {
        cart.splice(i, 1);
        break;
      }
    }
    saveCart();
  }


  function clearCart() {    // Clear cart
    cart.length = 0;
    saveCart();
  }


  function totalPrice() {   // Total sum
    let total = 0;
    for (let item of cart) {
      total += item.price * item.count;
    }
    return total;
  }


  function totalItemCount() {   // All items in the cart
    let itemCount = 0;
    for (let i = 0; i < cart.length; i++) {
      itemCount += cart[i].count;
    }
    return itemCount;
  }


  function listCart() {   // Copy the cart to avoid object mutation
    const cartCopy = JSON.parse(JSON.stringify(cart));
    return cartCopy;
  }


  function saveCart() {
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
  }


  function loadCart() {
    cart = JSON.parse(localStorage.getItem("shoppingCart"));
    if (cart === null) {
      cart = [];
    }
  }


  // Invoke Methods
  loadCart();
  displayCart();


})();
