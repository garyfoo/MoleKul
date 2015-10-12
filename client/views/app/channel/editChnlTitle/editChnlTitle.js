/**
 * Created by garie on 12/10/2015.
 */

Template.editChnlTitle.helpers({
    titleCount: function() {
        return 35 - Session.get('titleChars');
    },
    addChnlTitleInput: function () {
        return Session.get('addChnlTitleInput');
    }
});


Template.editChnlTitle.events({
    'input': function(){
        Session.setPersistent('titleChars', $('textarea').val().length);
    },
    'click .save': function() {
        Session.setPersistent('addChnlTitleInput', filterTitle($('#editTitleInput').val()));
        Router.go('addchannel');
    }
});

function filterTitle(input) {
    input = input.replace(/ /g,'');
    //If contains # only
    if (input == "#") {
        return;
    }
    else if (input == "") {
        Session.clear('addChnlTitleInput');
        return;
    }
    //If input #input
    else if (input.slice(0,1) != '#' && input.indexOf("#") >= 0) {
        return "#" + input.split("#")[1];
    }
    //If contains no # but there's input
    else if (input.slice(0,1) != '#' && input.indexOf("#") <= 0 && input != "") {
        return "#" + input;
    }
    //If contains #input
    else {
        return input;
    }
}