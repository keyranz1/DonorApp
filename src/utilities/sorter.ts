import { Donor } from "../types/donor";

export class Sorter {

  static sortByName(list: any[]) {
    return list.sort(function (a, b) {
      if (a.name < b.name)
        return -1;
      else if (a.name > b.name)
        return 1;
      return 0;
    });
  }

  static sortByLastDonation(donorList: Donor[]) {
    return donorList.sort((a, b) => {
      console.log(a);
      let d = new Date(a.latestDonation);
      let c = new Date(b.latestDonation);
      return c.getTime() - d.getTime();
    })
  }

  static sortByPriority(patientList: any[]){
    return patientList.sort((a,b) => {
      if (a.priority < b.priority)
        return -1;
      else if (a.priority > b.priority)
        return 1;
      return 0;
    })
  }
}
