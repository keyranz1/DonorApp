import { Component } from '@angular/core';
import {
  AlertController,
  IonicPage,
  LoadingController,
  NavController,
  NavParams,
  ToastController
} from 'ionic-angular';

import { CallNumber } from "@ionic-native/call-number";
import { SMS } from "@ionic-native/sms";
import {AngularFireAuth} from "angularfire2/auth";
import {Donor} from "../../types/donor";
import {FirebaseServiceProvider} from "../../providers/service/firebase-service-provider";
import {SessionManager} from "../../providers/service/session-manager";
import {MessagesPage} from "../messages/messages";

@IonicPage()
@Component({
  selector: 'page-donor-info-admin',
  templateUrl: 'donor-info-admin.html',
})
export class DonorInfoAdminPage {

  donor: Donor = {
    name: 'Sample Data',
    gender: 3,
    bloodgrp: 3,
    latestResponse: 0,
    latestDonation: '',
    DOB: '',
    address: '',
    phoneNumber: '',
    note: '',
  };
  currentUser: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, private sessionManager: SessionManager,
              private firebaseService: FirebaseServiceProvider, private callNumber: CallNumber, private messageDonor: SMS,
              private alertCtrl: AlertController, private toastCtrl: ToastController, private loadCtrl: LoadingController,
              private fauth: AngularFireAuth) {
    if (this.sessionManager.getCurrentUser() === undefined) {
      this.navCtrl.setRoot("AdminLoginPage");
      }

    this.donor = (this.navParams.get('donor'));

    let loader = this.loadCtrl.create({
      duration: 10000
    });

  }

  ionViewWillLoad() {


  }

  openChat(){
    let chatDonor = this.donor;
    console.log(chatDonor);
    this.navCtrl.push('MessagesPage',{chatDonor});
  }

  removeDonor() {
    let toaster = this.toastCtrl.create({
      duration: 3000
    });
    let loader = this.loadCtrl.create({
      duration: 10000
    });

    let alerter = this.alertCtrl.create({
      title: 'Delete Donor',
      subTitle: 'You are about to delete the current donor info.',
      message: 'Are you sure you want to continue?',
      buttons: [{
        text: 'No',
        role: 'destructive'
      }, {
        text: 'Yes',
        handler: () => {
          loader.present()
            .then(() => this.firebaseService.deleteDonor(this.donor))
            .then(() => {
              this.navCtrl.setRoot('DonorListPage')
                .then(() => loader.dismiss())
                .then(() => {
                  toaster.setMessage("Donor info successfully deleted.");
                  toaster.setCssClass('success-toaster');
                  return toaster.present();
                })
            })
            .catch(() => loader.dismiss()
              .then(() => {
                toaster.setMessage("Could not delete the donor info.");
                toaster.setCssClass("failure-toaster");
                return toaster.present();
              })
            )
        }
      }]
    });
    return alerter.present();
  }

  callDonor() {
    let alerter = this.alertCtrl.create({
      message: "Sorry! Cannot call the caller",
      buttons: ['Ok']
    });
    this.callNumber.isCallSupported()
      .then(() => this.callNumber.callNumber(this.donor.phoneNumber, true))
      .then((res) => console.log("dialer launched", res))
      .catch((error) => alerter.present());
  }

  smsDonor() {
    let alerter = this.alertCtrl.create({
      message: "Sorry! Could not message the caller",
      buttons: ['Ok']
    });
    let message = "A patient of your blood group needs blood. Please contact in this number if you want to help.";
    this.messageDonor.hasPermission()
      .then(() => this.messageDonor.send(this.donor.phoneNumber, message))
      .catch(() => alerter.present());
  }
}
