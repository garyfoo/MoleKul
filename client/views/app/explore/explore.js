
var options = {
    keepHistory: 1000 * 60 * 5,
    localSearch: true
};

var fields = ['name'];

ChannelSearch = new SearchSource('channels', fields, options);

Template.explore.onRendered(function () {
    ChannelSearch.search('');
});

Template.explore.helpers({
    user: function () {
        if (Meteor.userId()) {
            return Meteor.user();
        }
    },
    getChannels: function() {
        return ChannelSearch.getData(true);
    },

    isLoading: function() {
        return ChannelSearch.getStatus().loading;
    }
});


Template.explore.events({
    'keyup #searchBox': _.throttle(function(e) {
        var text = $(e.target).val().trim();
        ChannelSearch.search(text);
    }, 200)
});