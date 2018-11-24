import { Component, OnInit } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { Patient } from "../../../types/patient";
import { FirebaseServiceProvider } from "../../../providers/service/firebase-service-provider";
import { SessionManager } from "../../../providers/service/session-manager";
import {Sorter} from "../../../utilities/sorter";

@IonicPage()
@Component({
  selector: 'patient-list',
  templateUrl: 'patient-list.html',
})
export class PatientListPage implements OnInit {
  patientList: Patient[];
  searchParams: {
    searchPatientList: Patient[];
    searchToggled: boolean;
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private listService: FirebaseServiceProvider,
              private sessionManager: SessionManager, private loadCtrl: LoadingController) {
    this.patientList = [];
    this.searchParams = {
      searchToggled: false,
      searchPatientList: []
    }
  }

  ngOnInit() {
    let loader = this.loadCtrl.create({
      duration: 10000
    });

    loader.present()
      .then(() => {
        this.listService
          .getPatientList() // Gives DB LIst
          .snapshotChanges() // Gives Key and Value
          .map(
            changes => {
              return changes.map(c => ({ // return object for each chages
                key: c.payload.key, ...c.payload.val()
              }))
            })
          .subscribe((data) => {
            this.patientList = data.map(array => {
              console.log(array);
              return array;
            });
          return loader.dismiss();
          });
      })
  }

  ionViewWillLoad() {
    if (this.sessionManager.getCurrentUser() === undefined) {
      this.navCtrl.setRoot("AdminLoginPage");
    }
  }

  searchOption(event: any) {
    this.searchParams.searchPatientList = this.patientList.filter((patient: Patient) => {
      return patient.name.toLowerCase().includes(event.value.toLowerCase());
    });
    console.log(this.searchParams.searchPatientList);
  }

  sort(event: any) {
    switch (event.toString()) {
      case "name":
        this.patientList = Sorter.sortByName(this.patientList);
        break;
      case "priority":
        this.patientList = Sorter.sortByPriority(this.patientList);
        break;
    }
  }
}
