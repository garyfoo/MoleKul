/**
 * Created by garie on 12/10/2015.
 */

Template.nav.events({
    'click .sideMenu': function(){
        if( IonSideMenu.snapper.state().state=="left" ){
            IonSideMenu.snapper.close();
        } else {
            IonSideMenu.snapper.open('left');
        }
    }
});