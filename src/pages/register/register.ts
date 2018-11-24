import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Donor} from "../../types/donor";
import {AngularFireDatabase} from "angularfire2/database";
import {AngularFireAuth} from "angularfire2/auth";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {



  email: string = '';
  password: string = '';
  confirmPassword: string = '';


  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireAuth, private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {

  }

  registerDonor() {


    let toaster = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });

        this.db.auth.createUserWithEmailAndPassword(this.email,this.password)
          .then((userData)=>{
            console.log(userData.uid);
             this.db.auth.signInWithEmailAndPassword(this.email,this.password)
               .then((result)=>{
                 console.log(result.uid);
                this.navCtrl.setRoot('AddDonorPage');
              })

          })
          .catch((error)=>{
            toaster.setMessage(error);
            return toaster.present();
          })

  }

}
