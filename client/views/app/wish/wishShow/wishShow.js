/**
 * Created by garie on 12/10/2015.
 */
Template.wishShow.onCreated(function () {
    var self = this;
    self.ready = new ReactiveVar();
    self.autorun(function() {
        var postId = Router.current().params._id;
        var handle = subsMgr.subscribe('wish', postId);
        self.ready.set(handle.ready());
    });
});

Template.wishShow.onRendered(function () {
    this.autorun(function () {
        if (!this.ready.get()) {
            IonLoading.show();
        } else {
            IonLoading.hide();
        }
    }.bind(this));
});


Template.wishShow.helpers({
    wish: function () {
        return Wishes.findOne({_id: Router.current().params._id});
    },

    comments: function () {
        return Comments.find({wishId: Router.current().params._id}, {sort: {createdAt: -1}});
    },
    wishDate: function(date) {
        return moment(date).fromNow(true);
    }
});