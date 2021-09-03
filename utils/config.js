import { Strategy as FacebookStrategy} from 'passport-facebook';
import passport from "passport";

export const FACEBOOK_CLIENT_ID = '559885825005670';
export const FACEBOOK_CLIENT_SECRET = '6a2926fd1ded556381f2275ddfbee1f2';
export const PORT = 8080;
export const MONGO_URI = 'mongodb+srv://user:pass@cluster0.99scg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

// Configuración de Passport
passport.use(new FacebookStrategy({
  clientID: FACEBOOK_CLIENT_ID,
  clientSecret: FACEBOOK_CLIENT_SECRET,
  callbackURL: '/auth/facebook/callback',
  enableProof: true,
  profileFields: ['id', 'displayName', 'photos', 'emails'],
  scope: ['email']
}, function (accessToken, refreshToken, userProfile, done) {
  return done(null, userProfile);
}));

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (usuario, done) {
  return done(null, usuario);
});

export const passportConfig = passport;