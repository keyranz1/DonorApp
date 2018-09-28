import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { Patient } from "../../../types/patient";
import { FirebaseServiceProvider } from "../../../providers/service/firebase-service-provider";

@IonicPage()
@Component({
  selector: 'page-edit-patient',
  templateUrl: 'edit-patient.html',
})
export class EditPatientPage {

  patient: Patient;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController,
              private firebaseService: FirebaseServiceProvider, private loadCtrl: LoadingController) {
    this.patient = this.navParams.get('patient');
  }

  updateData() {
    let toaster = this.toastCtrl.create({
      duration: 3000
    });
    let loader = this.loadCtrl.create({
      duration: 10000,
    });
    loader.present()
      .then(() => {
        this.firebaseService.updatePatientDetails(this.patient)
          .then(() => {
            this.navCtrl.setRoot("PatientListPage")
              .then(() => loader.dismiss())
              .then(() => {
                toaster.setMessage("Patient Info Updated");
                toaster.setCssClass("success-toaster");
                return toaster.present();
              })

          })
          .catch(() => {
            loader.dismiss()
              .then(() => {
                toaster.setCssClass("failure-toaster");
                toaster.setMessage("Could Not Update Patient Info.");
                return toaster.present();
              })

          })
      })


  }

  isValidInput() {
    let patient = this.patient;
    return (patient.name.length > 0 && patient.bloodgrp != undefined)
  };
}
