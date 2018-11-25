import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {FirebaseServiceProvider} from "../../providers/service/firebase-service-provider";
import {Message} from "../../types/message";
import {AngularFireAuth} from "angularfire2/auth";
import {Donor} from "../../types/donor";

/**
 * Generated class for the MessageForDonorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message-for-donor',
  templateUrl: 'message-for-donor.html',
})
export class MessageForDonorPage {

  donor: Donor;
  message: Message = {
    messagerKey: this.fAuth.auth.currentUser.uid,
    time: 0,
    text: ''
  };

  donorMessages: Message[] = [];
  adminMessages: Message[] = [];
  conversation: Message[] = [];
  sortedConversation: Message[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private loadCtrl: LoadingController,
              private service: FirebaseServiceProvider, private fAuth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    let loader = this.loadCtrl.create({
      duration: 10000
    });
    this.service
      .getMessageFromAdmin(this.fAuth.auth.currentUser.uid) // Gives DB LIst
      .snapshotChanges() // Gives Key and Value
      .map(
        changes => {
          return changes.map(c => ({ // return object for each changes
            key: c.payload.key, ...c.payload.val()
          }));
        }).subscribe((data) => {
      this.donorMessages = data.map(array => {
        return array;
      });
      console.log(this.donorMessages);
      this.donorMessages.forEach((value) => {
        this.conversation.push(value);
      })
    });
    this.service
      .getMessageFromDonor(this.fAuth.auth.currentUser.uid) // Gives DB LIst
      .snapshotChanges() // Gives Key and Value
      .map(
        changes => {
          return changes.map(c => ({ // return object for each changes
            key: c.payload.key, ...c.payload.val()
          }));
        }).subscribe((data) => {
      this.adminMessages = data.map(array => {
        return array;
      });
      console.log(this.adminMessages);
      this.adminMessages.forEach((value) => {
        this.conversation.push(value);
      });
    });

    this.sortedConversation = this.conversation.sort((a, b) => {
      if (a.time > b.time) {
        return -1;
      } else if (a['time'] < b['time']) {
        return 1;
      }
    });
    console.log(this.conversation);


  }

  sendMessage() {

    const date = new Date();
    this.message.time = date.getTime();
    this.service.sendMessageToAdmin(this.message)
      .then(() => {
        this.conversation = [];
        this.ionViewDidLoad();
      })

  }

}
