import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.css']
})
export class TimePickerComponent implements OnChanges {
  startTime: NgbTimeStruct = {hour: 0, minute: 0, second: 0};
  endTime: NgbTimeStruct = {hour: 0, minute: 0, second: 0};
  @Input() inStartTime?: string;
  @Input() inEndTime?: string;
  @Output() outStartTime = new EventEmitter<string>;
  @Output() outEndTime = new EventEmitter<string>;
  
  constructor() {}

  ngOnChanges(): void {
    if (this.inStartTime && this.inEndTime) {
      // Separa el tiempo de la fecha recibida con input
      const sDateTime = this.inStartTime.split(' ')[1];
      const eDateTime = this.inEndTime.split(' ')[1];      

      // Separa horas y minutos de el tiempo recibido
      const inStartTime = sDateTime?.split(':');
      const inEndTime = eDateTime?.split(':');      

      // Asigna los valores correspondientes al selector de tiempo para editarlo
      this.startTime = {hour: Number.parseInt(inStartTime[0]), minute: Number.parseInt(inStartTime[1]), second: 0};
      this.endTime = {hour: Number.parseInt(inEndTime[0]), minute: Number.parseInt(inEndTime[1]), second: 0};
    }
  }

  sendStartTime(time: NgbTimeStruct) {
    const sTime = time.hour + ':' + time.minute;    
    if (sTime) {
      this.outStartTime.emit(sTime);
    }
  }
  
  sendEndTime(time: NgbTimeStruct) {
    const sTime = time.hour + ':' + time.minute;
    if (sTime) {
      this.outEndTime.emit(sTime);
    }
  }

}
