/**
 * Created by garie on 12/10/2015.
 */
Wishes = new Mongo.Collection("wishes");

Wishes.attachSchema(new SimpleSchema({
        title: {
            type: String,
            label: "Make a Wish!",
            max: 100,
            autoform: {
                rows: 1
            }
        },
        description: {
            type: String,
            label: "Tell me more about your wish!",
            optional: true,
            max: 200,
            autoform: {
                rows: 5
            }
        },
        images: {
            type: String,
            optional: true
        },
        location: {
            type: String,
            optional: true
        },
        createdAt: {
            type: Date,
            autoValue: function () {
                if (this.isInsert) {
                    var created = new Date;
                    var date = Date.now();
                    return created;
                } else if (this.isUpsert) {
                    return {$setOnInsert: new Date};
                } else {
                    this.unset();  // Prevent user from supplying their own value
                }
            }
        },
        userId: {
            type: String,
            autoValue: function () {
                if (this.isSet) {
                    return;
                }
                if (this.isInsert) {
                    return this.userId;
                } else {
                    this.unset();
                }
            }
        },
        commentId: {
            type:[String],
            optional: true,
            defaultValue: []
        },
        channelId: {
            type: String,
            optional: true
        },
        likedUserIds: {
            type: [String],
            optional: true,
            defaultValue: []
        },
        noOfLikes: {
            type: Number,
            optional: true,
            defaultValue: 0
        },
        noOfComments: {
            type: Number,
            optional: true,
            defaultValue: 0
        }
    })
);