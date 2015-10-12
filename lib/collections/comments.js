/**
 * Created by garie on 12/10/2015.
 */
Comments = new Mongo.Collection('comments');

Comments.helpers({
    author: function () {
        return Meteor.users.findOne({_id: this.userId});
    }
});

Comments.attachSchema(new SimpleSchema({
    body: {
        type: String,
        label: "Comment",
        max: 140
    },
    userId: {
        type: String,
        autoValue: function () {
            if (this.isInsert) {
                return this.userId;
            } else {
                this.unset();
            }
        }
    },
    wishId: {
        type: String,
        optional: true
    },
    createdAt: {
        type: Date,
        autoValue: function () {
            if (this.isInsert) {
                return new Date();
            } else {
                this.unset();
            }
        }
    }
}));

//Subscribe new users to default channels after signing up
Comments.after.insert(function (userId, doc) {
    var comment = this._id;
    //Update wish with commentId to a channel
    Wishes.update({_id: doc.wishId}, {$addToSet: {commentId: comment}});
});