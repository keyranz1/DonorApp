import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  passwordResetSteps: number;
  toggled: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private firebaseAuth: AngularFireAuth) {
    this.toggled = false;
    this.passwordResetSteps = 0;
  }

  changePassword(email: string){

  }
}
