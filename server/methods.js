/**
 * Created by garie on 12/10/2015.
 */
Meteor.methods({
    'Wish.like': function (_id) {
        if (!Meteor.user()) {
            return;
        }

        if (_(Meteor.user().profile.likedWishIds).include(_id)) {
            Wishes.update({_id: _id}, {$inc: {noOfLikes: -1}, $pull: {likedUserIds: this.userId}});
            Meteor.users.update({_id: this.userId}, {$pull: {'profile.likedWishIds': _id}});
            return;
        }

        Wishes.update({_id: _id}, {$inc: {noOfLikes: 1}, $addToSet: {likedUserIds: this.userId}});
        Meteor.users.update({_id: this.userId}, {$addToSet: {'profile.likedWishIds': _id}});
    },
    'Channel.Subscribe': function (channelID) {
        if (!Meteor.user()) {
            return;
        }

        if (_(Meteor.user().profile.subscriptions).include(channelID)) {
            Channels.update({_id: channelID}, {$inc: {noOfSubscribers: -1}, $pull: {subscriberIds: this.userId}});
            Meteor.users.update({_id: this.userId}, {$pull: {'profile.subscriptions': channelID}});
            return;
        }

        Channels.update({_id: channelID}, {$inc: {noOfSubscribers: 1}, $addToSet: {subscriberIds: this.userId}});
        Meteor.users.update({_id: this.userId}, {$addToSet: {'profile.subscriptions': channelID}});
    },
    'noOfReplies': function (wishId) {
        Wishes.findOne({_id: wishId}).commentId.length;
    }
});