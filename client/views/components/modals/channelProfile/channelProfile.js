/**
 * Created by garie on 12/10/2015.
 */
Template.channelProfile.onCreated(function () {
    var channelProfileSubs = new SubsManager();
    this.autorun(function () {
        this.subscription = channelProfileSubs.subscribe('channelfeed', Router.current().params._id);
    }.bind(this));
});

Template.channelProfile.helpers({
    channel: function () {
        return Channels.findOne({_id: Router.current().params._id})
    }
});

Template.channelProfile.events({
    'click .camera': function(){
        var options = {
            width: 800,
            height: 800,
            quality: 100,
            correctOrientation: 1,
            allowEdit: true
        };
        MeteorCameraUI.getPicture(options, function (error, data) {
            if (error) {
                alert(err);
            } else {
                var photo = data;
                var blob = MeteorCameraUI.b64toBlob(photo.split(',')[1], "image/jpeg", 512);
                var uploader = new Slingshot.Upload("myFileUploads");
                uploader.send(blob, function (error, downloadUrl) {
                    if (error) {
                        // Log service detailed response.
                        console.log(error);
                    }
                    else {
                        Channels.update({_id: Router.current().params._id},{ $set: {"image":downloadUrl} });
                    }
                });
            }
        });
        event.preventDefault();
    }
});