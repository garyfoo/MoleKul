/**
 * Created by garie on 12/10/2015.
 */
Template.chnlActivityMenu.events({
    'click .profile': function(){
        IonModal.open('channelProfile');
        IonSideMenu.snapper.close();
    },
    'click #subscribeChnl': function(event, template){
        console.log("subscribeChnl is being clicked");
        event.preventDefault();
        Meteor.call('Channel.Subscribe', Router.current().params._id);
    }
});

Template.chnlActivityMenu.helpers({
    user: function () {
        if (Meteor.userId()) {
            return Meteor.user();
        }
    },
    channel: function () {
        return Channels.findOne({_id: Router.current().params._id})
    },
    subscribedChnl: function () {
        var subscriptions =  Meteor.user().profile.subscriptions;
        //if User is subscribed
        if (subscriptions.indexOf(Router.current().params._id) > -1 ) {
            return true;
        }
        //if user is not subscribed
        else {
            return false;
        }
    }
});