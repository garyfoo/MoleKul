if (Meteor.isServer) {
    
    SearchSource.defineSource('channels', function(searchText, options) {
        //var options = {limit: 20};
        
        if(searchText) {
            var regExp = buildRegExp(searchText);
            var selector = {name: regExp};

            //console.log(Channels.find(selector).fetch());

            return Channels.find(selector).fetch();
        } else {

            return Channels.find({}).fetch();
        }
    });

    function buildRegExp(searchText) {
        // this is a dumb implementation
        var parts = searchText.trim().split(/[ \-\:]+/);
        var newRegEx = new RegExp("(" + parts.join('|') + ")", "ig");

        return new RegExp("(" + parts.join('|') + ")", "ig");
    }
}