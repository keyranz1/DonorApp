import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Donor} from "../../types/donor";
import {FirebaseServiceProvider} from "../../providers/service/firebase-service-provider";
import {Message} from "../../types/message";
import {AngularFireAuth} from "angularfire2/auth";
import {Sorter} from "../../utilities/sorter";
import {SessionManager} from "../../providers/service/session-manager";

/**
 * Generated class for the MessagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
    text: ''
  };
  adminMessages: Message[] = [{messagerKey: null, text: 'Start Conversation', time: 0}];

  constructor(public navCtrl: NavController, public navParams: NavParams, private service: FirebaseServiceProvider,
              private fAuth: AngularFireAuth, private loadCtrl: LoadingController,
              private sessionManager: SessionManager) {
    this.donor = this.navParams.get('donor');
    }

  ionViewDidLoad() {
    let loader = this.loadCtrl.create({
      duration: 10000
    });
    loader.present()
      .then(()=>{
        this.service
          .getAdminMessage(this.donor) // Gives DB LIst
          .snapshotChanges() // Gives Key and Value
          .map(
            changes => {
              return changes.map(c => ({ // return object for each changes
                key: c.payload.key, ...c.payload.val()
              }));
            }).subscribe((data) => {
          this.adminMessages =   data.map(array => {
            return array;
          });
        });
      })
      .then(() => loader.dismissAll())
  }

  ionViewWillLoad() {
    if (!this.sessionManager.getCurrentUser()) {
      this.navCtrl.setRoot("AdminLoginPage");
    }
  }

  sendMessage(){
    const date = new Date();
    this.message.time = date.getTime();
     this.service.sendMessageToDonor(this.donor, this.message)
       .then(() => {
          this.ionViewDidLoad();
       })
  }

}
