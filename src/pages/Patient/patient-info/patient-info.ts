import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  IonicPage,
  LoadingController,
  NavController,
  NavParams,
  ToastController
} from 'ionic-angular';
import { Patient } from "../../../types/patient";
import { FirebaseServiceProvider } from "../../../providers/service/firebase-service-provider";
import { CallNumber } from "@ionic-native/call-number";
import { SMS } from "@ionic-native/sms";

/**
 * Generated class for the PatientInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patient-info',
  templateUrl: 'patient-info.html',
})
export class PatientInfoPage implements OnInit {

  patient: Patient;

  constructor(public navCtrl: NavController, public navParams: NavParams, private listService: FirebaseServiceProvider,
              private alertCtrl: AlertController, private loadCtrl: LoadingController, private toastCtrl: ToastController,
              private callNumber: CallNumber, private message: SMS) {
    this.patient = this.navParams.get('patient');
  }

  ngOnInit() {
    if (this.patient == undefined) {
      this.navCtrl.push('PatientListPage');
    }
  }

  removePatient() {
    let toaster = this.toastCtrl.create({
      duration: 3000
    });

    let loader = this.loadCtrl.create({
      duration: 10000
    });

    let alerter = this.alertCtrl.create({
      title: 'Delete Patient',
      subTitle: 'You are about to delete the current patient info.',
      message: 'Are you sure you want to continue?',
      buttons: [{
        text: 'No',
        role: 'destructive'
      }, {
        text: 'Yes',
        handler: () => {
          loader.present()
            .then(() => this.listService.deletePatient(this.patient))
            .then(() => {
              this.navCtrl.setRoot('PatientListPage')
                .then(() => loader.dismiss())
                .then(() => {
                  toaster.setMessage("Patient successfully deleted.");
                  toaster.setCssClass('success-toaster');
                  return toaster.present();
                })
            })
            .catch(() => loader.dismiss()
              .then(() => {
                toaster.setMessage("Could not delete the patient info.");
                toaster.setCssClass("failure-toaster");
                return toaster.present();
              })
            )
        }
      }]
    });
    return alerter.present();
  }

  callPatient() {
    let alerter = this.alertCtrl.create({
      message: "Sorry! Cannot call the caller",
      buttons: ['Ok']
    });
    this.callNumber.isCallSupported()
      .then(() => this.callNumber.callNumber(this.patient.phoneNumber, true))
      .then((res) => console.log("dialer launched", res))
      .catch((error) => alerter.present());
  }

  smsPatient() {
    let alerter = this.alertCtrl.create({
      message: "Sorry! Could not message the caller",
      buttons: ['Ok']
    });
    let toaster = this.toastCtrl.create({
      message: "Message sent to the patient",
      duration: 3000,
    });

    let message = "Please call at this number. - Youth for Blood";
    this.message.hasPermission()
      .then(() => this.message.send(this.patient.phoneNumber, message))
      .then(() => toaster.present())
      .catch(() => alerter.present());
  }
}
