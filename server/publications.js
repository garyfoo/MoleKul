/**
 * Created by garie on 12/10/2015.
 */
Meteor.publishComposite('homefeed', function(limit) {
    if (limit > Wishes.find().count()){
        limit = 0;
    }
    return {
        find: function() {
            return Wishes.find({}, {sort: {createdAt: -1}, limit: limit } );
        },
        children: [
            {
                find: function(wish) {
                    return Meteor.users.find({_id: wish.userId});
                }
            },
            {
                find: function(wish) {
                    return Meteor.users.find({_id: wish.likedUserIds});
                }
            }
        ]
    };
});

Meteor.publishComposite('channelfeed', function(channelId) {
    return {
        find: function() {
            return Channels.find({_id: channelId});
        },
        children: [
            {
                find: function(channel) {
                    return Wishes.find({ _id: {$in: channel.wishIds }}, {sort: {createdAt: -1} } );
                },
                children: [
                    {
                        find: function(wish) {
                            return Meteor.users.find({_id: wish.userId});
                        }
                    },
                    {
                        find: function(wish) {
                            return Meteor.users.find({_id: wish.likedUserIds});
                        }
                    }
                ]
            }
        ]
    };
});

Meteor.publishComposite('wish', function(_id) {
    return {
        find: function() {
            return Wishes.find({_id: _id});
        },
        children: [
            {
                find: function(wish) {
                    return Meteor.users.find({_id: wish.userId});
                }
            },
            {
                find: function(wish) {
                    return Meteor.users.find({_id: wish.likeIds});
                }
            },
            {
                find: function(wish) {
                    return Comments.find({wishId: wish._id});
                },
                children: [
                    {
                        find: function(comment) {
                            return Meteor.users.find({_id: comment.userId});
                        }
                    }
                ]
            }
        ]
    };
});
