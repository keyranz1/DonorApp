import {Component, ViewChild} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Donor} from "../../types/donor";
import {FirebaseServiceProvider} from "../../providers/service/firebase-service-provider";
import {Message} from "../../types/message";
import {AngularFireAuth} from "angularfire2/auth";
import {SessionManager} from "../../providers/service/session-manager";

@IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {

  donor: Donor;
  message: Message = {
    messagerKey: this.fAuth.auth.currentUser.uid,
    time: 0,
    text: '',
    isAdminMessage: true,
  };
  conversation: Message[] = [];
  isAdminLoggedIn = false;
  donorDetails: any[];

  @ViewChild('content') content : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private service: FirebaseServiceProvider,
              private fAuth: AngularFireAuth, private loadCtrl: LoadingController,
              private sessionManager: SessionManager) {
    if (!this.sessionManager.getCurrentUser()) {
      this.navCtrl.setRoot("UserLoginPage");
    }
    this.donor = this.navParams.get('donor');
  }

  ionViewDidLoad() {

    console.log(this.fAuth.auth.currentUser.uid);
    if (this.fAuth.auth.currentUser.uid == 'WtiYexd5QOMuOsV5v4Yi6tFxsYy2'){
      this.isAdminLoggedIn = true;
      this.message.isAdminMessage = true;
    } else {
      this.message.isAdminMessage = false;
    }

    console.log(this.donor);


    this.content.scrollToBottom(300);

    this.service
      .getMessages(this.donor.key) // Gives DB LIst
      .snapshotChanges() // Gives Key and Value
      .map(
        changes => {
          return changes.map(c => ({ // return object for each changes
            key: c.payload.key, ...c.payload.val()
          }));
        }).subscribe((data) => {
      this.conversation = data.map(array => {
        return array;
      });
    });
  }

  ionViewWillLoad() {

    this.content.scrollToBottom(300);

  }

  sendMessage() {
    if (this.fAuth.auth.currentUser.uid == 'WtiYexd5QOMuOsV5v4Yi6tFxsYy2'){
      this.isAdminLoggedIn = true;
      this.message.isAdminMessage = true;
    } else {
      this.message.isAdminMessage = false;
    }
    const date = new Date();
    this.message.time = date.getTime();
    this.service.sendMessage(this.message, this.donor.key)
      .then(() => {
        this.conversation = [];
        this.message.text = '';
        this.ionViewDidLoad();
      })
  }

}
