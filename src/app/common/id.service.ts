import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class IdService {
private data = new BehaviorSubject<number>(0);

setData(id: number) {
this.data.next(id);
}

getData(): Observable<number> {
return this.data.asObservable();
}
}