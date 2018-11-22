import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {CallNumber} from "@ionic-native/call-number";

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  passwordResetSteps: number;
  toggled: boolean;
  currentUser: any;
  email: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private firebaseAuth: AngularFireAuth,
              private call: CallNumber, private alertCtrl: AlertController, private toastCtrl: ToastController) {
    this.toggled = false;
    this.passwordResetSteps = 0;

  }

  sendResetCode() {

    let toaster = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });

    this.firebaseAuth.auth.sendPasswordResetEmail(this.email)
      .then((res) => {
       toaster.setMessage("Please check your email for password reset");
       toaster.setCssClass('success-toaster');
       toaster.present();
      })
      .catch((err)=> {
        toaster.setMessage(err.message);
        toaster.setCssClass('failure-toaster');
        toaster.present();
      });
  }

  callDeveloper() {
    let alerter = this.alertCtrl.create({
      message: "Sorry! Cannot call the caller",
      buttons: ['Ok']
    });
    let number = '9853205041';
    this.call.callNumber(number, true)
      .catch(() => {
        return alerter.present();
      })
  }
}
