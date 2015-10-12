/**
 * Created by garie on 12/10/2015.
 */

//AppLayout

Router.configure({
    layoutTemplate: 'appLayout'
});


Router.route('/', function () {
    this.layout('appLayout');

    this.render('home');

    this.render('nav', {
        to: 'nav'
    });
    this.render('userSideMenu', {
        to: 'leftMenu'
    });
    this.render('footer', {
        to: 'footer'
    });
},{
    name: 'home'
});

Router.route('/channel/:_id', function () {
    this.layout('appLayout');

    this.render('chnlShow');

    this.render('nav', {
        to: 'nav'
    });
    this.render('channelPanel', {
        to: 'leftMenu'
    });
    this.render('footer', {
        to: 'footer'
    });
},{
    name: 'channel.show'
});

Router.route('/addchannel', function () {
    this.layout('appLayout');

    this.render('addChannel');

    this.render('nav', {
        to: 'nav'
    });
},{
    name: 'addchannel'
});

Router.route('/editchnltitle', function () {
    this.layout('appLayout');

    this.render('editChnlTitle');
},{
    name: 'editchnltitle'
});

Router.route('/editchnldesp', function () {
    this.layout('appLayout');

    this.render('editChnlDesp');
},{
    name: 'editchnldesp'
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