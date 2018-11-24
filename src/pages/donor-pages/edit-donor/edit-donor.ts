import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { FirebaseServiceProvider } from "../../../providers/service/firebase-service-provider";
import { Donor } from "../../../types/donor";

/**
 * Generated class for the EditDonorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-donor',
  templateUrl: 'edit-donor.html',
})
export class EditDonorPage {

  donor: Donor;

  constructor(public navCtrl: NavController, public navParams: NavParams, private firebaseService: FirebaseServiceProvider,
              private loadCtrl: LoadingController, private toastCtrl: ToastController) {
    this.donor = this.navParams.get('donor');
  }

  updateDonor() {
    let loader = this.loadCtrl.create({
      duration: 10000
    });

    let toaster= this.toastCtrl.create({
      duration: 3000
    });

    loader.present()
      .then(()=>this.firebaseService.updateDonorDetails(this.donor))
      .then(() => this.navCtrl.setRoot("DonorInfoPage"))
      .then(()=>loader.dismiss())
      .then(()=>{
        toaster.setMessage("Updated Donor Info.");
        toaster.setCssClass("success-toaster");
        return toaster.present()
      })
      .catch(()=>{
       loader.dismiss()
         .then(()=>{
           toaster.setCssClass("failure-toaster");
           toaster.setMessage("Could Not Update Donor Info");
           return toaster.present();
         })
      })
  }

  isValid() {
    return (this.donor.name.length > 0 && this.donor.bloodgrp != undefined && this.donor.phoneNumber.length > 0)
  }
}
