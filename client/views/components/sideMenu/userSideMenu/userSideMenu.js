/**
 * Created by garie on 12/10/2015.
 */
Template.userSideMenu.events({
    'click .profile': function(){
        IonModal.open('profile');
        IonSideMenu.snapper.close();
    },
    'click .logout': function(){
        AccountsTemplates.logout();
    }
});

Template.userSideMenu.helpers({
    user: function () {
        if (Meteor.userId()) {
            return Meteor.user();
        }
    }
});