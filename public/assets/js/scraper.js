console.log("scraper working");

// Initialize modal script
(function ($) {
    $(function () {

        //initialize all modals           
        $('.modal').modal();

        //now you can open modal from code
        //$('#modal1').modal('open');

        //or by click on trigger
        $('.trigger-modal').modal();

    }); // end of document ready
})(jQuery); // end of jQuery name space

// Get JSON from SAVED route
$.getJSON('/saved', function(data){
    console.log(data);
    for (i = 0; i < data.length; i++) {
        $('#data-here').append('<div class="row">' +
        '<div class="col s12">' +
            '<div class="card grey lighten-5">' +
            '<div class="card-content grey-text">' +
                '<span class="card-title">' + data[i].title + '</span>' +
            '</div>' +
            '<div class="card-action">' +
                '<a href="#">Read Article</a>' +
                '<a href="#">Save Article</a>' +
            '</div>' +
            '</div>' +
        '</div>');
    }
})