var channelSeeds =
    [
        {
            "name": "everything",
            "description": "This is a channel for everyone. Start making content for everyone today!"
        },
        {
            "name": "wishingwell",
            "description": "Welcome to the wishing well! It is said that your wishes can come true if you wish them through this chanel so start wishing!"
        },
        {
            "name": "appfeedback",
            "description": "Please leave feedback! Your Feedback would be absolutely valuable and critical for your user experience!"
        }
    ];

if(Channels.find().count() === 0) {
    _.each(channelSeeds, function (channel) {
        Channels.insert(channel);
        console.log("Inserted ", channel.name, channel.description);
    });
}