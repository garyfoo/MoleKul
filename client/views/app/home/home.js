/**
 * Created by garie on 12/10/2015.
 */
Template.home.onCreated(function () {
    var self = this;
    self.ready = new ReactiveVar();
    Session.setDefault('queryLimit', 4);
    self.autorun(function() {
        var handle = subsMgr.subscribe('homefeed', Session.get('queryLimit'));
        self.ready.set(handle.ready());
    });
});

Template.home.onRendered(function () {
    this.autorun(function () {
        if (!this.ready.get()) {
            IonLoading.show({
                customTemplate: '<i class="icon ion-loading-c"></i>'
            });
        } else {
            IonLoading.hide();
            // run the above func every time the user scrolls
            $('.overflow-scroll').scroll(showMoreVisible);
        }
    }.bind(this));
});

Template.home.helpers({
    wishes: function () {
        if (Meteor.user()) {
            var chSubscribed = Meteor.user().profile.subscriptions;
        }
        return Wishes.find({channelId:{$in:chSubscribed}},{sort: {createdAt: -1}});
    },
    wishDate: function (date) {
        return moment(date).fromNow('minute');
    },
    wishesExist: function () {
        if (Meteor.user()) {
            if (Wishes.find({channelId:{$in:Meteor.user().profile.subscriptions}}).count() != 0) {
                return true;
            }
            else {
                return false;
            }
        }
    },
    moreResults: function () {
        return !(Wishes.find().count() < Session.get("queryLimit"));
    },
    user: function () {
        if (Meteor.userId()) {
            return Meteor.user();
        }
    }
});

// whenever #showMoreResults becomes visible, retrieve more results
function showMoreVisible() {
    var threshold, target = $("#showMoreResults");
    if (!target.length) return;

    threshold = $('.overflow-scroll').scrollTop() + $('.overflow-scroll').height() - target.height();

    if (target.offset().top < threshold) {
        if (!target.data("visible")) {
            console.log("target became visible (inside viewable area)");
            target.data("visible", true);
            Session.set("queryLimit",
                Session.get("queryLimit") + 4);
        }
    } else {
        if (target.data("visible")) {
            console.log("target became invisible (below viewable arae)");
            target.data("visible", false);
        }
    }
}