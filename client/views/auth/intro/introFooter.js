/**
 * Created by garie on 12/10/2015.
 */
Template.introFooter.events({
    'click .login': function(){
        Router.go('login');
    },
    'click .signup': function(){
        Router.go('signup');
    }
});