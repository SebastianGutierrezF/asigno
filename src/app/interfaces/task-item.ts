import { NgbDate } from "@ng-bootstrap/ng-bootstrap";

export interface TaskItem {
    id: string,
    title: string,
    start: NgbDate | string,
    end: NgbDate | string,
    status: string,
    userName: string,
    user: string,
    notes: string
}
