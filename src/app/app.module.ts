import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { MyApp } from './app.component';
import { FIREBASE_CONFIG } from "./firebase-credentials";
import { SideMenuComponent } from "../side-menu/side-menu";
import { HttpClientModule } from "@angular/common/http";
import { AngularFireAuth } from "angularfire2/auth";
import { FirebaseServiceProvider } from "../providers/service/firebase-service-provider";
import { SessionManager } from "../providers/service/session-manager";
import { CallNumber } from "@ionic-native/call-number";
import { SMS } from "@ionic-native/sms";
import { DirectivesModule } from "../directives/directives.module";
import { Firebase } from "@ionic-native/firebase";


@NgModule({
  declarations: [
    MyApp,
    SideMenuComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    HttpClientModule,
    DirectivesModule,

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireAuth,
    FirebaseServiceProvider,
    SessionManager,
    CallNumber,
    Firebase,
    SMS
  ]
})
export class AppModule {

}
