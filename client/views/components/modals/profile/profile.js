/**
 * Created by garie on 12/10/2015.
 */

Template.profile.helpers({
    user: function () {
        if (Meteor.userId()) {
            return Meteor.user();
        }
    },
    joinDate: function(date) {
        return moment(date).format('ll');
    }
});

Template.profile.events({
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
                        Meteor.users.update({_id: Meteor.userId()},{ $set: {"profile.image":downloadUrl} });
                    }
                });
            }
        });
        event.preventDefault();
    }
});