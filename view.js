(function() {
    "use strict";
    // ********************* VIEW ********************* //
    $(".add-to-cart").click(function(e) {
        e.preventDefault();
        const itemName = $(this).attr("data-name");
        const itemPrice = Number($(this).attr("data-price"));
        TZARU_shoppingCart.addItemToCart(itemName, itemPrice);
        displayCart();
    });


    $("#clear-cart").click(function(e) {
        TZARU_shoppingCart.clearCart();
        displayCart();
    });


    // Delete Item
    $("#display-cart").on("click", ".delete-item", function(e) {
        const itemName = $(this).attr("data-name");
        TZARU_shoppingCart.removeItemFromCartAll(itemName);
        displayCart();
    });


    // Add Item
    $("#display-cart").on("click", ".add-item", function(e) {
        const itemName = $(this).attr("data-name");
        TZARU_shoppingCart.addItemToCart(itemName);
        displayCart();
    });


    // Subtract Item
    $("#display-cart").on("click", ".subtract-item", function(e) {
        const itemName = $(this).attr("data-name");
        TZARU_shoppingCart.removeItemFromCart(itemName);
        displayCart();
    });


    function displayCart() {
        const cartArray = TZARU_shoppingCart.listCart();
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
        $("#total-price").html(TZARU_shoppingCart.totalPrice());
    }


    // Invoke Methods
    TZARU_shoppingCart.loadCart();
    displayCart();
})();
