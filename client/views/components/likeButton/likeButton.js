/**
 * Created by garie on 12/10/2015.
 */
Template.likeButton.events({
    'click .likeButton': function (event, template) {
        event.preventDefault();
        Meteor.call('Wish.like', this._id);
    }
});

Template.likeButton.helpers({
    hasLikedClass: function () {
        if (!Meteor.user()) {
            return;
        }
        if(_(Meteor.user().profile.likedWishIds).contains(this._id)) {
            return 'red';
        }
    }
});