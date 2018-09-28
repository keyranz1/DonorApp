import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { Patient } from "../../../types/patient";
import { FirebaseServiceProvider } from "../../../providers/service/firebase-service-provider";
import { SessionManager } from "../../../providers/service/session-manager";

@IonicPage()
@Component({
  selector: 'page-add-patient',
  templateUrl: 'add-patient.html',
})
export class AddPatientPage {

  patient: Patient = {
    name: '',
    bloodgrp: undefined,
    admittedAt: '',
    gender: 0,
    age: undefined,
    address: '',
    phoneNumber: '',
    priority: 1,
    note: '',
    pints: undefined,
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private listService: FirebaseServiceProvider,
              private toastCtrl: ToastController, private sessionManager: SessionManager, private loadCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    if (this.sessionManager.getCurrentUser() === undefined) {
      this.navCtrl.setRoot("LoginPage");
    }
  }

  onAdd() {
    let toaster = this.toastCtrl.create({
      duration: 3000,
    });
    let loader = this.loadCtrl.create({
      duration: 10000,
    });
    loader.present()
      .then(() => this.listService.addPatient(this.patient))
      .then((ref) => {
        this.navCtrl.setRoot("PatientListPage", {key: ref.key})
          .then(() => {
            loader.dismiss()
              .then(() => {
                toaster.setCssClass("success-toaster");
                toaster.setMessage("Patient successfully added to the list.");
                return toaster.present();
              })
          })
          .catch(() => {
            toaster.setCssClass("failure-toaster");
            toaster.setMessage("Could not add new patient to the patient list.")
          })
      })
  }

  isValidInput() {
    let patient = this.patient;
    return (patient.name.length > 0 && patient.bloodgrp != undefined)
  }

}
