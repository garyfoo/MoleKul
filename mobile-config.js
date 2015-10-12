/**
 * Created by garie on 12/10/2015.
 */
App.info({
    name: 'MoleKul',
    description: 'A place where everyone can share their passions',
    author: 'LG',
    email: 'gfmr90@gmail.com',
    website: 'tbc.com',
    version: '0.0.1'
});

App.setPreference('StatusBarOverlaysWebView', true);
App.setPreference('StatusBarStyle', 'default');
App.setPreference('KeyboardDisplayRequiresUserAction', false);
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.accessRule('*', {external: false});