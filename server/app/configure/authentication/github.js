'use strict';
var path = require('path');
var passport = require('passport');
var GithubStrategy = require('passport-github').Strategy;
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');

module.exports = function(app) {

    var githubConfig = app.getValue('env').GITHUB;

    var githubCredentials = {
        clientID: githubConfig.clientID,
        clientSecret: githubConfig.clientSecret,
        callbackURL: githubConfig.callbackURL
    };

    var verifyCallback = function(accessToken, refreshToken, profile, done) {
        console.log('Here is my acccessss tookoeeen', accessToken);
        UserModel.findOne({
            'github.id': profile.id
        }, function(err, user) {

            if (err) return done(err);

            if (user) {
                done(null, user);
            } else {
                UserModel.create({
                    github: {
                        token: accessToken,
                        id: profile.id,
                        displayName: profile.displayName,
                        username: profile.username,
                        profileUrl: profile.profileUrl,
                        reposUrl: profile._json.repos_url,
                        image: profile._json.avatar_url,
                        location: profile._json.location
                    }
                }).then(function(user) {
                    done(null, user);
                }, function(err) {
                    console.error('Error creating user from Github authentication', err);
                    done(err);
                });
            }

        });

    };

    passport.use(new GithubStrategy(githubCredentials, verifyCallback));

    app.get('/auth/github', passport.authenticate('github', {
        scope: ["user", "user:email", "public_repo", "read:org", "repo",]
    }));

    app.get('/auth/github/callback',
        passport.authenticate('github', {
            failureRedirect: '/login'
        }),
        function(req, res) {
            res.redirect('/');
        });

};