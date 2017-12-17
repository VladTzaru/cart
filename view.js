(function() {
    "use strict";
    // ********************* VIEW ********************* //
    $(".add-to-cart").click(function(e) {
        e.preventDefault();
        const itemName = $(this).attr("data-name");
        const itemPrice = Number($(this).attr("data-price"));
        TZARU_shoppingCart.addItem(itemName, itemPrice);
        displayCart();
    });


    $("#clear-cart").click(function(e) {
        TZARU_shoppingCart.clear();
        displayCart();
    });


    // Delete Item
    $("#display-cart").on("click", ".delete-item", function(e) {
        const itemName = $(this).attr("data-name");
        TZARU_shoppingCart.removeItemAll(itemName);
        displayCart();
    });


    // Add Item
    $("#display-cart").on("click", ".add-item", function(e) {
        const itemName = $(this).attr("data-name");
        TZARU_shoppingCart.addItem(itemName);
        displayCart();
    });


    // Subtract Item
    $("#display-cart").on("click", ".subtract-item", function(e) {
        const itemName = $(this).attr("data-name");
        TZARU_shoppingCart.removeItem(itemName);
        displayCart();
    });


    // Add a number of items at once (input value)
    $("#display-cart").on("change", ".count-item", function(e) {
      const itemName = $(this).attr("data-name");
      const count = Number( $(this).val() );
      TZARU_shoppingCart.setCountForItem(itemName, count);
      if (count <= 0) {
        TZARU_shoppingCart.removeItemAll(itemName);
      }
      displayCart();
    });


    function displayCart() {
        const cartArray = TZARU_shoppingCart.list();
        let output = "";
        for (let item of cartArray) {
            output += `<li>
              ${item.name} <input data-name="${item.name}" class="count-item" type="number" value="${item.count}"> | $${item.price} * ${item.count} = ${item.total}
              <button type="button" class="subtract-item" data-name="${item.name}">-</button>
              <button type="button" class="add-item" data-name="${item.name}">+</button>
              <button type="button" class="delete-item" data-name="${item.name}">x</button>
            </li>`;
        }
        $("#display-cart").html(output);
        $("#total-price").html(TZARU_shoppingCart.totalPrice());
    }


    // Invoke Methods
    TZARU_shoppingCart.load();
    displayCart();
})();
