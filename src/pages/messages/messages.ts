import {Component} from '@angular/core';
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
  donorMessages: Message[] = [];
  conversation: Message[] = [];
  sortedConversation: Message[] = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, private service: FirebaseServiceProvider,
              private fAuth: AngularFireAuth, private loadCtrl: LoadingController,
              private sessionManager: SessionManager) {
    this.donor = this.navParams.get('donor');
    console.log('page created')
  }

  ionViewDidLoad() {

    let loader = this.loadCtrl.create({
      duration: 10000
    });
    this.service
      .getMessageFromAdmin(this.donor.key) // Gives DB LIst
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
      });


      this.service
        .getMessageFromDonor(this.donor.key) // Gives DB LIst
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


        console.log(' this conversation', this.conversation);

        this.sortedConversation = this.sorter(this.conversation);
        this.sortedConversation.forEach((msg) => {
          if (msg.messagerKey.indexOf('d8wP8yc9iQWWMlje0cCQd4vFBJn2') > -1) {
            msg['admin'] = true;
          } else {
            msg['admin'] = false;
          }
        });
      });

    });
  }

  ionViewWillLoad() {
    if (!this.sessionManager.getCurrentUser()) {
      this.navCtrl.setRoot("AdminLoginPage");
    }
  }

  sendMessage() {
    const date = new Date();
    this.message.time = date.getTime();
    this.service.sendMessageToDonor(this.donor.key, this.message)
      .then(() => {
        this.conversation = [];
        this.message.text = '';
        this.ionViewDidLoad();
      })
  }

  sorter(conv: Message[]) {
    console.log(conv);
    let sortedConversation = conv.sort((a, b) => {
      let t1 = a.time;
      let t2 = b.time;
      if (t1 === t2) {
        return 0;
      }
      else if (t1 - t2 < 0) {
        return -1;
      } else {
        return 1;
      }
    });

    return sortedConversation;
  }


}
