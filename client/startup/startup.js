/**
 * Created by garie on 12/10/2015.
 */
Meteor.startup(function() {
    //Define Subscription Manager
    subsMgr = new SubsManager();
    //Define Momentjs config
    moment.locale('en', {
        relativeTime : {
            future: "in%s",
            past:   "%ss",
            s:  "few seconds ago",
            m:  "1m",
            mm: "%dm",
            h:  "1h",
            hh: "%dh",
            d:  "1d",
            dd: "%dd",
            M:  "1m",
            MM: "%dm",
            y:  "1y",
            yy: "%dy"
        }
    });
    //Load Google Maps API
    GoogleMaps.load({
        key: 'AIzaSyB2PAQSygmg15Wr5t6IfqEjug3Y1JUf5eE',
        libraries: 'places'
    });
    //Get CurrentLocation
    Geolocation.currentLocation();
    if (Meteor.isCordova) {
        StatusBar.styleDefault();
        IonKeyboard.hideKeyboardAccessoryBar();
    }
});