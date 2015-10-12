/**
 * Created by garie on 12/10/2015.
 */
// Clients may insert Wishes only if a user is logged in
Wishes.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();
Comments.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();
Channels.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();