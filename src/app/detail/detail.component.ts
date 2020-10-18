import {Component} from '@angular/core';
import {Operation} from "./models/operation";

@Component({
  selector: 'detail-page',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {


  handleOperation(operation: Operation) {
    console.log(operation)
  }


}
