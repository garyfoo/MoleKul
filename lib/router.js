/**
 * Created by garie on 12/10/2015.
 */

//AppLayout

Router.configure({
    layoutTemplate: 'appLayout'
});

//AuthLayout

Router.configure({
    layoutTemplate: 'authLayout'
});

Router.route('/intro', function () {
    this.layout('authLayout');

    this.render('intro');

    this.render('introFooter', {
        to: 'authFooter'
    });
});

Router.onBeforeAction(function () {
    if (!Meteor.user() && !Meteor.loggingIn()) {
        this.redirect('/intro');
    } else {
        // required by Iron to process the route handler
        this.next();
    }
}, {
    except: ['login', 'signup', 'intro']
});

AccountsTemplates.configureRoute('signUp', {
    name: 'signup',
    path: '/signup',
    template: 'signup',
    yieldTemplates: {
        nav: {to: 'authNav'}
    },
    layoutTemplate: 'authLayout',
    redirect: '/'
});

AccountsTemplates.configureRoute('signIn', {
    name: 'login',
    path: '/login',
    template: 'login',
    yieldTemplates: {
        nav: {to: 'authNav'}
    },
    layoutTemplate: 'authLayout',
    redirect: '/'
});