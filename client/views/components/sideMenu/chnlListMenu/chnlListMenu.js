/**
 * Created by garie on 12/10/2015.
 */

Template.chnlListMenu.onCreated(function () {
    var self = this;
    self.ready = new ReactiveVar();
    if (Meteor.user()) {
        self.autorun(function () {
            var handle = subsMgr.subscribe('userChannels', Meteor.user().profile.subscriptions);
            self.ready.set(handle.ready());
        });
    }
});


Template.chnlListMenu.helpers({
    userChannels: function () {
        if(Meteor.user()){
            return Channels.find({$and: [{owner: Meteor.userId()}, {_id: {$in: Meteor.user().profile.subscriptions}}]});
        }
    },
    subscribedChannels: function () {
        if(Meteor.user()){
            return Channels.find({$and: [{owner: {$ne: Meteor.userId()}}, {_id: {$in: Meteor.user().profile.subscriptions}}]});
        }
    },
    path: function () {
        return '/channel/' + this._id;
    }
});

Template.chnlListMenu.events({
    'click .closeMenu': function () {
        IonSideMenu.snapper.close();
    }
});
