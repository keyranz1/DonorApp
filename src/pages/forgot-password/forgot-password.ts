import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";

/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {

  email: string = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AngularFireAuth, private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }



  checkEmail(){
    let toaster = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });

    this.auth.auth.sendPasswordResetEmail(this.email).then(()=>{
      toaster.setMessage("Check your email to reset password.");
      toaster.setCssClass("success-toaster");
      toaster.present()
        .then(()=>{
          this.navCtrl.setRoot("UserLoginPage");
        })
    })
      .catch((err)=>{
        console.log(err);
        toaster.setCssClass("failure-toaster");
        toaster.setMessage(err.message);
      toaster.present();
      })
  }

}
