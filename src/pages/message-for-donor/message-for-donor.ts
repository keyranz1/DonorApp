import {Component,ViewChild, ElementRef, Renderer2} from '@angular/core';
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

  @ViewChild('content') content: any;

  donor: Donor;
  message: Message = {
    messagerKey: this.fAuth.auth.currentUser.uid,
    time: 0,
    text: '',
    isAdminMessage: false
  };
  photoUrl: string = "";

  conversation: Message[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private loadCtrl: LoadingController,
              private service: FirebaseServiceProvider, private fAuth: AngularFireAuth,
              private renderer: Renderer2, private element: ElementRef) {
    this.donor = this.navParams.get('donor');

    this.photoUrl = this.donor.photoUrl;
  }

  ionViewDidEnter() {
    this.content.scrollToBottom(300);
  }

  ionViewDidLoad() {

    this.content.scrollToBottom(300);


    this.service
      .getMessages(this.fAuth.auth.currentUser.uid) // Gives DB LIst
      .snapshotChanges() // Gives Key and Value
      .map(
        changes => {
          return changes.map(c => ({ // return object for each changes
            key: c.payload.key, ...c.payload.val()
          }));
        }).subscribe((data) => {
      this.conversation = data.map(array => {
        return array;
      });}}

  sendMessage() {

    const date = new Date();
    this.message.time = date.getTime();
    this.service.sendMessage(this.message, this.fAuth.auth.currentUser.uid)
      .then(() => {
        this.conversation = [];
        this.message.text = '';
      })
      .then(() => this.ionViewDidLoad())
  }

}
