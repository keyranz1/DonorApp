import { Donor } from "../types/donor";

export class Sorter {

  static sortByName(donorList: Donor[]) {
    return donorList.sort(function (a, b) {
      if (a.name < b.name)
        return -1;
      else if (a.name > b.name)
        return 1;
      return 0;
    });
  }

  static sortByLastDonation(donorList: Donor[]) {
    return donorList.sort((a, b) => {
      let d = new Date(a.latestDonation);
      let c = new Date(b.latestDonation);
      return c.getTime() - d.getTime();
    })
  }
}
