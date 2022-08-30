import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {NgbDate, NgbCalendar, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-datepicker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnChanges {

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  @Output() start = new EventEmitter<string>;
  @Output() end = new EventEmitter<string>;
  @Input() inStart?: string; 
  @Input() inEnd?: string; 

  constructor(private calendar: NgbCalendar, public formatter: NgbDateParserFormatter) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    // Emite los valores de fechas from y to hacia el formulario para agregar o editar la actividad
    this.start.emit(this.formatter.format(this.fromDate));
    this.end.emit(this.formatter.format(this.toDate));
  }

  // Detecta cuando el datepicker recibe valores y convierte las fechas a NgbDate
  ngOnChanges(): void {
    if (this.inStart && this.inEnd) {
      this.fromDate = this.formatter.parse(this.inStart) as NgbDate;
      this.toDate = this.formatter.parse(this.inEnd) as NgbDate;
    }
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
      this.end.emit(this.formatter.format(this.toDate));
    } else {
      this.toDate = null;
      this.fromDate = date;
      this.start.emit(this.formatter.format(this.fromDate));
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) &&
        date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) { return this.toDate && date.after(this.fromDate) && date.before(this.toDate); }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) ||
        this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }
}