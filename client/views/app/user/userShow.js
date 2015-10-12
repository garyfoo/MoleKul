/**
 * Created by garie on 12/10/2015.
 */
Template.userShow.onCreated(function () {
    var self = this;
    self.ready = new ReactiveVar();
    self.autorun(function() {
        var userId = Router.current().params._id;
        var handle = subsMgr.subscribe('user', userId);
        self.ready.set(handle.ready());
    });
});

Template.userShow.onRendered(function () {
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

Template.userShow.helpers({
    user: function () {
        return Meteor.users.findOne({_id: Router.current().params._id});
    },
    ownedChnls: function () {
        return Channels.find({owner: Router.current().params._id});
    },
    ownedChnlCount: function () {
        return Channels.find({owner: Router.current().params._id}).count();
    },
    joinDate: function(date) {
        return moment(date).format('ll');
    }
});