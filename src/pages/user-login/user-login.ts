import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {SessionManager} from "../../providers/service/session-manager";
import {AngularFireAuth} from "angularfire2/auth";
import {User} from "../../types/user";

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-login',
  templateUrl: 'user-login.html',
})
export class UserLoginPage {

  timesTapped = 0;
  user = {
    email: "manish@gmail.com",
    password: "panditmanish",
    displayName: "Morang"
  } as User;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private alertCtrl: AlertController, private sessionManager: SessionManager,
              private fireauth: AngularFireAuth, private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
  }


  tapped(){
    let alerter = this.alertCtrl.create({
      message: "Are you sure you want to enter Admin's Login Page?",
      buttons: [{
        text: "Yes",
        handler: () => {
          this.navCtrl.push('AdminLoginPage');
        }
      },{
        text: "Cancel",
        handler: () => {
        }
      }
      ]
    });

    this.timesTapped++;

    console.log(this.timesTapped);
    if(this.timesTapped == 5){
       alerter.present()
         .then(()=>{this.timesTapped = 0})
    }
  }

  login(){

    let toaster = this.toastCtrl.create({
      duration: 3000,
    });

    this.fireauth.auth.signInWithEmailAndPassword(this.user.email,this.user.password)
      .then((res) => {
        toaster.setMessage(res.message);
        toaster.present();
        this.sessionManager.setCurrentUser(this.user);
      })
      .then(()=> {
        this.navCtrl.setRoot('DonorInfoPage', {user: this.user});
      })
      .catch((error) => {
        console.log(error);
        toaster.setMessage(error.message);
        toaster.present();
      });
  }

}
