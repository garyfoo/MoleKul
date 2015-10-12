/**
 * Created by garie on 12/10/2015.
 */
Meteor.publishComposite('homefeed', function(limit) {
    if (limit > Wishes.find().count()){
        limit = 0;
    }
    return {
        find: function() {
            return Wishes.find({channelId:{$in:Meteor.user().profile.subscriptions}}, {sort: {createdAt: -1}, limit: limit } );
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