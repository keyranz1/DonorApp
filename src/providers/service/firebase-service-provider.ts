import {Injectable} from "@angular/core";
import {Donor} from "../../types/donor";
import {Patient} from "../../types/patient";
import {AngularFireDatabase} from "angularfire2/database";
import {Firebase} from '@ionic-native/firebase';
import {User} from "firebase/app";
import {AngularFireAuth} from "angularfire2/auth";
import {SessionManager} from "./session-manager";
import {Message} from "../../types/message";
import set = Reflect.set;


@Injectable()
export class FirebaseServiceProvider {

  user: string;

  private donorListRef1 = this.db.list<Donor>(`/donor-list/`);
  private patientListRef = this.db.list<Patient>('/patient-list/');

  constructor(private db: AngularFireDatabase, private firebase: Firebase, private afAuth: AngularFireAuth, private session: SessionManager) {
    // this.user = this.afAuth.auth.currentUser.uid;

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

  //GET MESSAGE SENT BY DONOR
  getMessageFromDonor(key: string){
    const admin = 'd8wP8yc9iQWWMlje0cCQd4vFBJn2';
    return this.db.list<Message>(`message/${admin}/${key}`);
  }

  //SEND MESSAGE TO ADMIN BY DONOR
  sendMessageToAdmin(message){
    const admin = 'd8wP8yc9iQWWMlje0cCQd4vFBJn2';
    this.user = this.afAuth.auth.currentUser.uid;
    const messageAdmin = this.db.list<Message>(`message/${admin}/${this.user}`);
    return messageAdmin.push( message);
  }

  //SEND MESSAGE TO DONOR BY ADMIN
  sendMessageToDonor(donorKey: string, message: Message){
    this.user = this.afAuth.auth.currentUser.uid;
    const messageDonor = this.db.list<Message>(`message/${donorKey}/${this.user}`);
    return messageDonor.push( message);
  }

  //GET MESSAGE SENT BY ADMIN
  getMessageFromAdmin(key:string){
    const admin = 'd8wP8yc9iQWWMlje0cCQd4vFBJn2';
    return this.db.list<Message>(`message/${key}/${admin}`);
  }
}
