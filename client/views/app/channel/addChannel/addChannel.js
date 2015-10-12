/**
 * Created by garie on 12/10/2015.
 */
AutoForm.hooks({
    'insertChannelForm': {
        onSuccess: function (error, result) {
            if (Session.get('newChannelImg')) {
                var photo = Session.get('newChannelImg');
                var blob = MeteorCameraUI.b64toBlob(photo.split(',')[1], "image/jpeg", 512);
                console.log(uploader);
                var uploader = new Slingshot.Upload("myFileUploads");
                uploader.send(blob, function (error, downloadUrl) {
                    if (error) {
                        // Log service detailed response.
                        console.log(error);
                    }
                    else {
                        Channels.update({_id:result},{ $set: {image:downloadUrl}});
                    }
                });
            }
            Meteor.users.update({_id: Meteor.userId()},{$addToSet:{"profile.ownedChnls": result}});
            Meteor.users.update({_id: Meteor.userId()},{$addToSet:{"profile.subscriptions": result}} );
            Channels.update({ _id: result}, {$addToSet:{subscriberIds: Meteor.userId()}});
            Session.clearPersistent();
            Router.go('channel.show', {_id: result});
        }
    }
});

Template.addChannel.helpers({
    addChannelImg: function () {
        return Session.get('newChannelImg');
    },
    addChnlDescriptionInput: function () {
        return Session.get('addChnlDescriptionInput');
    },
    addChnlTitleInput: function () {
        var title = Session.get('addChnlTitleInput');
        if (title){
            return title.split('#')[1];
        }
    },
    allowCreate: function () {
        if (Session.get('addChnlDescriptionInput') && Session.get('addChnlTitleInput') && Session.get('newChannelImg')){
            return true;
        }
        else {
            return false;
        }
    },
    userId: function () {
        return Meteor.userId();
    },
    addSubscriberId: function () {
        return [Meteor.userId()];
    }
});

Template.addChannel.onRendered(function () {
    Session.setDefaultPersistent('titleChars', 0);
    Session.setDefaultPersistent('despChars', 0);
});

Template.addChannel.events({
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
                Session.setPersistent('newChannelImg', data);
            }
        });
        event.preventDefault();
    },
    'click .clear': function(){
        Session.clearPersistent();
        event.preventDefault();
    }
});