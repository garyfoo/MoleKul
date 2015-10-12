/**
 * Created by garie on 12/10/2015.
 */

Template.chnlShow.onCreated(function () {
    var self = this;
    self.ready = new ReactiveVar();
    self.autorun(function() {
        var postId = Router.current().params._id;
        var handle = subsMgr.subscribe('channelfeed', postId);
        self.ready.set(handle.ready());
    });
});

Template.chnlShow.onRendered(function () {
    this.autorun(function () {
        if (!this.ready.get()) {
            IonLoading.show({
                customTemplate: '<i class="icon ion-loading-c"></i>'
            });
        } else {
            IonLoading.hide();
        }
    }.bind(this));
});

Template.chnlShow.helpers({
    user: function () {
        if (Meteor.userId()) {
            return Meteor.user();
        }
    },
    channel: function () {
        return Channels.findOne({_id: Router.current().params._id});
    },
    wishes: function () {
        return Wishes.find({channelId:{$in:[Router.current().params._id]}},{sort: {createdAt: -1}});
    },
    wishesExist: function () {
        if (Wishes.find({channelId:{$in:[Router.current().params._id]}}).count() != 0) {
            return true;
        }
        else {
            return false;
        }
    },
    createDate: function (date) {
        return moment(date).format('LL');
    }
});