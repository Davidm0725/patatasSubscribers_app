import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
 
@Injectable({
    providedIn: 'root'
})
export class ComponentStatesService {
 
    // declarations
    objToken = new BehaviorSubject<any>(null);
    objToken$ = this.objToken.asObservable();
    // methods
    setobjToken(status: any) { this.objToken.next(status); 
    }
 
}