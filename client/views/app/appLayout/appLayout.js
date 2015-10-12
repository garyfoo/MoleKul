/**
 * Created by garie on 12/10/2015.
 */
Template.appLayout.onRendered(function () {
    Session.set('currentTab', 'home');
    if(Meteor.isCordova) {
        StatusBar.show();
    }
    IonSideMenu.snapper.settings(
        {
            minPosition: -210,
            maxPosition: 210,
            hyperextensible: false,
            tapToClose: true,
            touchToDrag: false
        });
    IonSideMenu.snapper.on('start', function(){
        // Do Something
        if(Meteor.isCordova) {
            StatusBar.show();
        }
    });
    IonSideMenu.snapper.on('close', function(){
        // Do Something
        $(".overflow-scroll").removeClass("disable-Touch");
        $(".tabs").removeClass("disable-Touch");
        if(Meteor.isCordova) {
            StatusBar.show();
        }
    });
    IonSideMenu.snapper.on('open', function(){
        // Do Something
        $(".overflow-scroll").addClass("disable-Touch");
        $(".tabs").addClass("disable-Touch");
        if(Meteor.isCordova) {
            StatusBar.hide();
        }
    });
    IonSideMenu.snapper.on('drag', function(){
        if(Meteor.isCordova) {
            StatusBar.hide();
        }
    });
});

Template.appLayout.events({
    'click .menu-content' : function(event){
        if(IonSideMenu.snapper.state().state != "closed")
            IonSideMenu.snapper.close();
    }
});