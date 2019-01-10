import {Injectable} from "@angular/core";
import {Donor} from "../../types/donor";
import {Patient} from "../../types/patient";
import {AngularFireDatabase} from "angularfire2/database";
import {Firebase} from '@ionic-native/firebase';
import {AngularFireAuth} from "angularfire2/auth";
import {SessionManager} from "./session-manager";
import {Message} from "../../types/message";

@Injectable()
export class FirebaseServiceProvider {

  user: string;

  private donorListRef1 = this.db.list<Donor>(`/donor-list/`);
  private patientListRef = this.db.list<Patient>('/patient-list/');

  constructor(private db: AngularFireDatabase, private firebase: Firebase, private afAuth: AngularFireAuth, private session: SessionManager) {

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
    this.user = this.afAuth.auth.currentUser.uid;
    this.donorListRef1 = this.db.list<Donor>(`/donor-list/${this.user}`);
    return this.donorListRef1;
  }

  getAdminDonorList(){
    return this.donorListRef1 = this.db.list<Donor>('/donor-list/');
  }

  async addDonor(donor: Donor, userUID: string) {
    //alert("User:" + this.user);
    this.user = userUID;
    console.log("From add Donor:" + this.user);
    // try{
    //   await this.donorListRef1.set(donor);
    //   return true;
    // } catch(e){
    //   console.error(e);
    //   return false;
    // }
    this.donorListRef1 = this.db.list<Donor>(`/donor-list/${this.user}`);

    return this.donorListRef1.set(this.user,donor);

  }

  updateDonorDetails(donor: Donor) {
    return this.donorListRef1.update(donor.key, donor);
  }

  deleteDonor(donor: Donor) {
    return this.donorListRef1.remove(donor.key);
  }

  setUserDisplayName(name: string) {
    console.log("done")
    return this.firebase.setUserProperty("displayName", name);
  }

  //SEND MESSAGE TO ADMIN BY DONOR
  sendMessage(message, donor){
    this.user = this.afAuth.auth.currentUser.uid;
    let messageAdmin = this.db.list<Message>(`message/${donor}`);
    return messageAdmin.push( message);
  }

  //GET MESSAGE SENT BY ADMIN
  getMessages(key:string){
    return this.db.list<Message>(`message/${key}`);
  }
}
