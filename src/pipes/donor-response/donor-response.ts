import { Pipe, PipeTransform } from '@angular/core';
import { DonorResponse } from "../../enums/donor-response-enum";

@Pipe({
  name: 'donorResponse',
})
export class DonorResponsePipe implements PipeTransform {

  transform(response: string): string {
    let value = parseInt(response);
    switch (value){
      case DonorResponse.Ready:
        return "app-ready";
      case DonorResponse.NotReady:
        return "app-not";
      case DonorResponse.NoResponse:
        return "app-noresponse";
    }
  }
}
