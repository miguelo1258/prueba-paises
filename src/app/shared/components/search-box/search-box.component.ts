import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.deboncerSuscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.deboncerSuscription=this.debouncer
    .pipe(debounceTime(1000))
    .subscribe(value => this.onDebounce.emit(value));
  }

  private debouncer: Subject<string>= new Subject<string>();
  private deboncerSuscription?: Subscription;

  @Input()
  public placeholder:string='';

  @Input()
  public initialValue:string='';

  @Output()
  public onValue= new EventEmitter<string>();

  @Output()
  public onDebounce= new EventEmitter<string>();

  public emitValue (value:string){
    this.onValue.emit(value)
  }

  onKeyPress(searchTerm:string){
    this.debouncer.next(searchTerm)

  }


}
