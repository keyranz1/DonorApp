import {Component, Input} from '@angular/core';
import {LoadingController, Nav} from "ionic-angular";
import {AngularFireAuth} from "angularfire2/auth";
import {SessionManager} from "../providers/service/session-manager";

@Component({
  selector: 'side-menu',
  templateUrl: 'side-menu.html'
})
export class SideMenuComponent {
  @Input() navigation: Nav;
  menuPages: Array<{ title: string, icon: string, action: any }>;

  constructor(private afAuth: AngularFireAuth, private loadCtrl: LoadingController,
              private sessionManager: SessionManager, private fAuth: AngularFireAuth) {
    this.initializePages();
  }

  initializePages(): void {


    // if (this.fAuth.auth.currentUser.uid == 'WtiYexd5QOMuOsV5v4Yi6tFxsYy2') {
      this.menuPages = [
        {
          title: "Patient List",
          icon: "app-patient-list",
          action: () => {
            this.changePage('PatientListPage');
          }
        },
        {
          title: "Donor List",
          icon: "app-donor-list",
          action: () => {
            this.changePage('DonorListPage');
          }
        },
        {
          title: "Settings",
          icon: "settings",
          action: () => {
            return this.navigation.setRoot('SettingsPage');
          }
        },
        {
          title: "Logout",
          icon: "log-out",
          action: () => {
            this.logOut();
          }
        },
      ];
    // } else {
    //   this.menuPages = [
    //     {
    //       title: "Settings",
    //       icon: "settings",
    //       action: () => {
    //         return this.navigation.setRoot('SettingsPage');
    //       }
    //     }
    //     ,
    //     {
    //       title: "Logout",
    //       icon: "log-out",
    //       action: () => {
    //         this.logOut();
    //       }
    //     }
    //   ];
    // }

  }

  logOut() {
    let loader = this.loadCtrl.create({
      content: "logging out",
      duration: 10000,
    });

    loader.present()
      .then(() => this.afAuth.auth.signOut())
      .then(() => this.navigation.setRoot('AdminLoginPage'))
      .then(() => this.sessionManager.setCurrentUser(undefined))
      .then(() => loader.dismiss())
      .catch(() => {
        return loader.dismiss();
      })
  }

  changePage(page: string) {
    this.navigation.setRoot(page)
      .catch(() => {
        return this.navigation.setRoot('AdminLoginPage');
      })
  }
}
