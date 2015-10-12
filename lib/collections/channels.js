/**
 * Created by garie on 12/10/2015.
 */
Channels = new Mongo.Collection('channels');

Channels.attachSchema(new SimpleSchema({
    name: {
        type: String,
        unique: true
    },
    description: {
        type: String,
        optional: true
    },
    owner: {
        type: String,
        optional: true
    },
    subscriberIds: {
        type: [String],
        optional: true,
        defaultValue: []
    },
    image: {
        type: String,
        optional: true,
        defaultValue: "http://semantic-ui.com/images/wireframe/image.png"
    },
    wishIds: {
        type: [String],
        optional: true,
        defaultValue: []
    },
    noOfLikes: {
        type: Number,
        optional: true,
        defaultValue: 0
    },
    noOfSubscribers: {
        type: Number,
        optional: true,
        defaultValue: 0
    },
    noOfWishes: {
        type: Number,
        optional: true,
        defaultValue: 0
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