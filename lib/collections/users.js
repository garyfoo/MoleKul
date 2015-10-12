/**
 * Created by garie on 12/10/2015.
 */
Meteor.users.before.insert(function (userId, doc) {
    doc.profile.likedWishIds = [];
    //Placeholder Image
    doc.bio = {};
    doc.settings = {};
    doc.bio.handedness = "";
    doc.profile.subscriptions = [];
    doc.settings.leftMenu = false;
    doc.profile.image = "https://s3-ap-southeast-2.amazonaws.com/wunderwish/user_placeholder.png";
});

Meteor.users.helpers({
    likedWishes: function () {
        return Wishes.find({_id: {$in: this.likedWishIds}});
    }
});

//Subscribe new users to default channels after signing up
Meteor.users.after.insert(function (userId, doc) {
    var everything = Channels.find({}, { limit: 3 } ).fetch()[0]._id;
    var wishingWell = Channels.find({}, { limit: 3 } ).fetch()[1]._id;
    var appfeedback = Channels.find({}, { limit: 3 } ).fetch()[2]._id;
    var user = this._id;
    //Subscribe user to a channel
    var channelName = doc.profile.firstName.toLowerCase();
    if (Channels.find({name: channelName}).count == 0) {
        Channels.insert({name: channelName, owner: user, subscriberIds: [user]}, function(error, result) {
            //Subscribe new users to channels to #everything and #wishingwell
            Meteor.users.update({_id: user}, {$addToSet: {'profile.subscriptions': {$each: [result, everything, wishingWell, appfeedback]}}});
            Channels.update({ _id: {$in: [everything, wishingWell, appfeedback ] }}, {$addToSet:{subscriberIds:user}}, {multi:true});
        });
    } else {
        var count = Channels.find({name: channelName}).count()+1;
        var uniqueChannelName = channelName + count;
        Channels.insert({name: uniqueChannelName, owner: user, subscriberIds: [user]}, function(error, result) {
            //Subscribe new users to channels to #everything and #wishingwell
            Meteor.users.update({_id: user}, {$addToSet: {'profile.subscriptions': {$each: [result, everything, wishingWell, appfeedback]}}});
            Channels.update({ _id: {$in: [everything, wishingWell, appfeedback ] }}, {$addToSet:{subscriberIds:user}}, {multi:true});
        });
    }
});