
var options = {
    keepHistory: 1000 * 60 * 5,
    localSearch: true
};

var fields = ['name'];

ChannelSearch = new SearchSource('channels', fields, options);
console.log(ChannelSearch);
console.log(ChannelSearch.getData());
//ChannelSearch.search('');

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
        console.log("called getChannels");
        console.log("get data from search **** ", ChannelSearch.getData());
        return ChannelSearch.getData(true);
    },

    isLoading: function() {
        console.log("called is loading");
        console.log(ChannelSearch.getStatus());
        return ChannelSearch.getStatus().loading;
    }
});


Template.explore.events({
    'keyup #searchBox': _.throttle(function(e) {
        console.log("detecting key up");
        var text = $(e.target).val().trim();
        console.log("search text is --- ", text);
        ChannelSearch.search(text);
        console.log("data in search ..... ", ChannelSearch.getData());
    }, 200)
});