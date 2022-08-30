import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgbTimeAdapter, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

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
      const inStartTime = this.inStartTime?.split(':');
      const inEndTime = this.inEndTime?.split(':');
      this.startTime.hour = Number.parseInt(inStartTime[0]);
      this.startTime.minute = Number.parseInt(inStartTime[1]);  
      this.endTime.hour = Number.parseInt(inEndTime[0]);
      this.endTime.minute = Number.parseInt(inEndTime[1]);  
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
