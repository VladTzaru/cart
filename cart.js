(function() {
  'use strict';


  const cart = [];


  class Item {
    constructor(name, price, count) {
      this.name = name;
      this.price = price;
      this.count = count;
    }
  }


  function addItemToCart(name, price, count) {   // Add an item to the cart

    // Check value type
    if (typeof name !== 'string') {
      console.log('Type of Name must be a string');
      return;
    }

    if (typeof price !== 'number' || typeof count !== 'number') {
      console.log('Type of Price and Count must be a number');
      return;
    }

    name = name.toLowerCase();

    /*
    Iterate over cart array. If there's an item with same name,
    increment the count.
    */
    for (let item of cart) {
      if (item.name === name) {
        item.count += count;
        return;
      }
    }

    const item = new Item(name, price, count);
    cart.push(item);
  }


  function removeItemFromCart(name) {   // Remove 1 item from cart

    // Check params type
    if (typeof name !== 'string') {
      console.log('Type of Name must be a string');
      return;
    }

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
  }


  function removeItemFromCartAll(name) {   // Clear 1 item and its count at once

    // Check params type
    if (typeof name !== 'string') {
      console.log('Type of Name must be a string');
      return;
    }

    name = name.toLowerCase();
    for (let i = 0; i < cart.length; i++) {
      if(cart[i].name === name) {
        cart.splice(i, 1);
        break;
      }
    }
  }


  function clearCart() {   // Clear cart
    cart.length = 0;
    return cart;
  }


  function totalPrice() {  // Total sum
    let total = 0;
    for (let item of cart) {
      total += item.price;
    }
    return total;
  }


  function totalCount() {  // All items in the cart
    let itemCount = 0;
    for (let i = 0; i < cart.length; i++) {
      itemCount += i;
    }
    return itemCount;
  }



  addItemToCart('apple', 3, 10);
  addItemToCart('snop', 10, 4);
  addItemToCart('bang', 12, 4);

  const total = totalCount();
  console.log(total);

  // Save cart - localstorage
  // load localstorage
  // Display cart
  // Total amount - Price
  // Total count
  // Checkout
  // Review
  // Buy








})();
