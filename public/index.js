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