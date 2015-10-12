/**
 * Created by garie on 12/10/2015.
 */
Template.commentWish.helpers({
    wishId: function () {
        return Router.current().params._id;
    }
});