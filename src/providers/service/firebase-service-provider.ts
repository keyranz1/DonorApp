import { Injectable } from "@angular/core";
import { Donor } from "../../types/donor";
import { Patient } from "../../types/patient";
import { AngularFireDatabase } from "angularfire2/database";
import { Firebase } from '@ionic-native/firebase';
import {User} from "../../types/user";

@Injectable()
export class FirebaseServiceProvider {

  private donorListRef = this.db.list<Donor>('/donor-list');
  private patientListRef = this.db.list<Patient>('/patient-list/');

  constructor(private db: AngularFireDatabase, private firebase: Firebase) {
  }

  getPatientList() {
    return this.patientListRef;
  }

  addPatient(patient: Patient) {
    return this.patientListRef.push(patient);
  }

  updatePatientDetails(patient: Patient) {
    return this.patientListRef.update(patient.key, patient);
  }

  deletePatient(patient: Patient) {
    return this.patientListRef.remove(patient.key);
  }


  getDonorList() {
    return this.donorListRef;
  }

  addDonor(donor: Donor) {
    return this.donorListRef.push(donor);
  }

  updateDonorDetails(donor: Donor) {
    return this.donorListRef.update(donor.key, donor);
  }

  deleteDonor(donor: Donor) {
    return this.donorListRef.remove(donor.key);
  }

  setUserDisplayName(name: string){
    console.log("done")
    return this.firebase.setUserProperty("displayName", name);
  }

}
