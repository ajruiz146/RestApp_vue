//Orders
$("#createOrderSave").on( "click", function() {
    $("#ordersCreate").modal('hide');
    $('#form-create-orders').trigger("reset");
});

$("#update-order-save").on( "click", function() {
    $("#orderUpdate").modal('hide');
    $('#form-update-orders').trigger("reset");
});

$("#delete-orders-save").on( "click", function() {
    $("#ordersDelete").modal('hide');
});
//Users
$("#delete-user-save").on( "click", function() {
    $("#userDelete").modal('hide');
});

$("#create-user-save").on( "click", function() {
    $("#userCreate").modal('hide');
    $('#form-user-create').trigger("reset");
});

$("#update-user-save").on( "click", function() {
    $("#userEdit").modal('hide');
    $('#form-user-create').trigger("reset");
});
//Products
