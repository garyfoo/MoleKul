/**
 * Created by garie on 12/10/2015.
 */
Template.channelListMenu.onCreated(function () {
    this.autorun(function () {
        if (Meteor.user()) {
            this.subscription = Meteor.subscribe('userChannels', Meteor.user().profile.subscriptions);
        }
    }.bind(this));
});

Template.channelListMenu.helpers({
    userChannels: function () {
        return Channels.find({$and: [{owner: Meteor.userId()}, {_id: {$in: Meteor.user().profile.subscriptions}}]});
    },
    subscribedChannels: function () {
        return Channels.find({$and: [{owner: {$ne: Meteor.userId()}}, {_id: {$in: Meteor.user().profile.subscriptions}}]});
    },
    addChannels: function () {
        var addChannelStatus = false;
        if (Meteor.user()) {
            if (Meteor.user().profile.subscriptions.length != 9) {
                addChannelStatus = true;
            }
            else {
                addChannelStatus = false;
            }
        }
        return addChannelStatus;
    },
    path: function() {
        return '/channel/' + this._id;
    }
});

Template.channelListMenu.events({
    'click .closeMenu': function(){
        IonSideMenu.snapper.close();
    }
});
