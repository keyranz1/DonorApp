import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Donor } from "../../../types/donor";
import { FirebaseServiceProvider } from "../../../providers/service/firebase-service-provider";
import { SessionManager } from "../../../providers/service/session-manager";
import {AngularFireAuth} from "angularfire2/auth";

@IonicPage()
@Component({
  selector: 'add-donor',
  templateUrl: 'add-donor.html',
})
export class AddDonorPage {

  user = this.db.auth.currentUser.uid;


  donor: Donor = {
    name: '',
    gender: 2,
    bloodgrp: undefined,
    latestResponse: 0,
    latestDonation: '',
    DOB: '',
    address: '',
    phoneNumber: '',
    note: '',
    key: this.user
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private listService: FirebaseServiceProvider,
              private toastCtrl: ToastController, private sessionManager: SessionManager, private db: AngularFireAuth) {}

  ionViewDidLoad() {
    console.log("After Loading:" + this.user);
  }

  onAdd() {
    let toaster = this.toastCtrl.create({
      duration: 3000,
    });
    this.listService.addDonor(this.donor, this.user)
      .then(() => {
        this.navCtrl.setRoot('DonorInfoPage', this.donor)
          .then(() => {
            toaster.setCssClass("success-toaster");
            toaster.setMessage("Donor successfully added to the Donor list. Now Please verify your email address");
            toaster.present()
              .catch(() => {
                toaster.setCssClass("failure-toaster");
                toaster.setMessage("Failed to add the donor to the Donor list");
                return toaster.present();
              })
          })
      })
  }

  isValid() {
    return (this.donor.name.length > 0 && this.donor.bloodgrp != undefined && this.donor.phoneNumber.length > 0)
  }

}
