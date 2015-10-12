/**
 * Created by garie on 12/10/2015.
 */
AutoForm.hooks({
    'insertWishForm': {
        onSuccess: function (error, result) {
            IonModal.close();
            IonKeyboard.close();
            Channels.update({_id: Router.current().params._id},{$addToSet:{wishIds:result}});
            if (Session.get('photo')) {
                var photo = Session.get('photo');
                var blob = MeteorCameraUI.b64toBlob(photo.split(',')[1], "image/jpeg", 512);
                var uploader = new Slingshot.Upload("myFileUploads");
                console.log(uploader);
                uploader.send(blob, function (error, downloadUrl) {
                    if (error) {
                        // Log service detailed response.
                        console.log(error);
                    }
                    else {
                        Wishes.update({_id:result},{ $set: {images:downloadUrl}});
                    }
                });
            }
            Session.clearPersistent();
        },
        before: {
            insert: function (doc) {
                doc.channelId = Router.current().params._id;
                this.result(doc);
            }
        }
    }
});

Template.newWish.onRendered(function () {
    Session.setPersistent('inputStatus', true);
    Session.setPersistent('titleChars', 0);
    Session.setPersistent('despChars', 0);
});

Template.newWish.events({
    'input #wishTitle': function(){
        Session.setPersistent('inputStatus', true);
        Session.setPersistent('titleChars', $('#wishTitle').val().length);
    },

    'input #wishDescription': function(){
        Session.setPersistent('inputStatus', false);
        Session.setPersistent('despChars', $('#wishDescription').val().length);
    },

    'focus #wishTitle': function(){
        Session.setPersistent('inputStatus', true);
    },

    'focus #wishDescription': function(){
        Session.setPersistent('inputStatus', false);
    },

    'click #insertWishModal': function(){
        //$('#wishTitle').focus();
    },

    "click #cancel": function () {
        Session.clearPersistent();
    },

    "click #camera": function () {
        var options = {
            width: 00,
            height: 1200,
            quality: 100,
            correctOrientation: 1,
            allowEdit: true
        };
        MeteorCameraUI.getPicture(options, function (error, data) {
            if (error) {
                alert(err);
            } else {
                var images = [];
                Session.setPersistent('photo', data);
            }
        });
        event.preventDefault();
    }
});

Template.newWish.helpers({
    'photo': function(){
        return Session.get('photo');
    },
    titleCount: function() {
        return 100 - Session.get('titleChars');
    },
    despCount: function() {
        return 200 - Session.get('despChars');
    },

    inputState: function() {
        return Session.get('inputStatus');
    },
    charClass: function() {
        if (Session.get('titleChars') > 100) {
            return 'errCharCount';    //css class name
        } else {
            return 'charCount';       //css class name
        }
    },

    disableButton: function() {
        if (Session.get('titleChars') <= 0 ||
            Session.get('titleChars') > 100) {
            return 'disabled';
        }
    }

});