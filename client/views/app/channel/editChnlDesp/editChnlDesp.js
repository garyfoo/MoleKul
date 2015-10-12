/**
 * Created by garie on 12/10/2015.
 */
Template.editChnlDesp.events({
    'input': function(){
        Session.setPersistent('despChars', $('textarea').val().length);
    },
    'click .save': function() {
        Session.setPersistent('addChnlDescriptionInput', filterDesp($('#editDescriptionInput').val()));
        Router.go('newchannel');
    }
});

Template.editChnlDesp.helpers({
    despCount: function() {
        return 50 - Session.get('despChars');
    },
    addChnlDescriptionInput: function () {
        return Session.get('addChnlDescriptionInput');
    }
});

function filterDesp(input) {
    if (input == "") {
        Session.clear('addChnlDescriptionInput');
        return;
    }
    //If contains #input
    else {
        return input;
    }
}