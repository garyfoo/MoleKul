/**
 * Created by garie on 12/10/2015.
 */
Template._card.events({
    'load .imgLoad': function(event) {
        event.preventDefault();

        //  Hide your loader DIV (for example)
        hideLoader();
    }
});

function hideLoader() {
    $('.ui.active.dimmer').hide();
}