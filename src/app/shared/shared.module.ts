import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './paginator/paginator.component';
import { DropDownComponent } from './drop-down/drop-down.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    PaginatorComponent,
    DropDownComponent
  ],
  imports: [
    CommonModule,
    NgbDropdownModule
  ],
  exports:[PaginatorComponent, DropDownComponent]
})
export class SharedModule { }
