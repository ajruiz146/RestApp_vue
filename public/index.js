$(".save-button").on( "click", function() {
    console.log("Entra")
    $(".modal").modal('hide');
});

$(".reset-form").on( "click", function() {
    $("form").trigger("reset");
});

window.onclick = function(event){
    if(!event.target.matches('.drop-button')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0;  i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')){
                openDropdown.classList.remove('show');
            }
        }
    }
}

if($(".hide-left-sidebar").length) {
    $("#sidenav-main").css("display", "none")
    $(".main-content").css("margin-left", "0")
    $('.navbar-collapse').attr('style', 'display: none !important');
}

if($(".router-link-exact-active").text() == "kitchen") {
    $(".router-link-exact-active").text("RestApp")
}

if($(".router-link-exact-active").text() == "bar") {
    $(".router-link-exact-active").text("RestApp")
}

if($(".router-link-exact-active").text() == "qr") {
    $(".router-link-exact-active").text("RestApp")
}

$('#printPdf').click(function(){
    $(".bg-gradient-success").css("display", "none")
    $(".footer").css("display", "none")
    window.print();

    $(".bg-gradient-success").css("display", "block")
    $(".footer").css("display", "block")
    return false;
});