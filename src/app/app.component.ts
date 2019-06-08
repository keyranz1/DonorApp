import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OneSignal } from '@ionic-native/onesignal';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: string = "UserLoginPage";

  constructor(private platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen, private oneSignal: OneSignal) {

    this.initializeApp();

  }

  initializeApp(){
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();


    });
  }
}

