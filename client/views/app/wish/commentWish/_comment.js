/**
 * Created by garie on 12/10/2015.
 */
Template._comment.helpers({
    commentDate: function(date) {
        return moment(date).fromNow(true);
    }
});