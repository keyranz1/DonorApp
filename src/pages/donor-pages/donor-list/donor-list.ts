import { Component, OnInit } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { Donor } from "../../../types/donor";
import { FirebaseServiceProvider } from "../../../providers/service/firebase-service-provider";
import { SessionManager } from "../../../providers/service/session-manager";
import { Sorter } from "../../../utilities/sorter";
import {AngularFireAuth} from "angularfire2/auth";

@IonicPage()
@Component({
  selector: 'page-donor-list',
  templateUrl: 'donor-list.html',
})
export class DonorListPage implements OnInit {
  donorList: Donor[];
  totalList: Donor[];
  searchParams: {
    searchDonorList: Donor[];
    searchToggled: boolean;
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private listService: FirebaseServiceProvider,
              private sessionManager: SessionManager,
              private fAuth: AngularFireAuth,
              private loadCtrl: LoadingController) {
    this.donorList = [];
    this.totalList = [];
    this.searchParams = {
      searchDonorList: [],
      searchToggled: false
    };
  }

  ngOnInit() {
    console.log(this.fAuth.auth.currentUser);
    let loader = this.loadCtrl.create({
      duration: 10000
    });
    loader.present()
      .then(()=>{
        this.listService
          .getAdminDonorList() // Gives DB LIst
          .snapshotChanges() // Gives Key and Value
          .map(
            changes => {
              return changes.map(c => ({ // return object for each changes
                key: c.payload.key, ...c.payload.val()
              }));
            }).subscribe((data) => {
          this.donorList= this.totalList =  data.map(array => {
             let value = array.key;
            return array[value];
           });
        });
      })
      .then(()=>{
      this.donorList = Sorter.sortByName(this.totalList);
    })
      .then(()=>{
        return loader.dismiss()
      })

  }

  ionViewWillLoad() {
    if (!this.sessionManager.getCurrentUser()) {
      this.navCtrl.setRoot("AdminLoginPage");
    }
  }

  searchOption(event: any) {
    this.searchParams.searchDonorList = this.totalList.filter((donor: Donor) => {
      return donor.name.toLowerCase().includes(event.value.toLowerCase())
    });
  }

  showByBloodType(event: any) {
    this.donorList = this.totalList;
    if (event !== '8') {
      this.donorList = this.filterByBloodType(event);
    } else {
      this.donorList = this.totalList;
    }
  }

  filterByBloodType(value: number) {
    return this.donorList.filter((donor: Donor) => {
      return donor.bloodgrp === value;

    });
  }

  sort(event: any) {
    switch (event.toString()) {
      case "name":
        this.donorList = Sorter.sortByName(this.donorList);
        break;
      case "lastDonation":
        this.donorList = Sorter.sortByLastDonation(this.donorList).reverse();
        break;
    }
  }

}

