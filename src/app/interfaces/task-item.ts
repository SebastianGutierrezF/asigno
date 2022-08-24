import { NgbDate } from "@ng-bootstrap/ng-bootstrap";

export interface TaskItem {
    id: string,
    title: string,
    start: NgbDate,
    end: NgbDate,
    status: string,
    name: string,
    notes: string
}
