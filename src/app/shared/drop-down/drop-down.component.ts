import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrl: './drop-down.component.css'
})
export class DropDownComponent {

 @Output() sendCategory:EventEmitter<string> = new EventEmitter();

  categories:string[]=[
    'business','entertainment','general','health','science','sports','technology'
  ]




  getCategory(category:string){
    this.sendCategory.emit(category)
  }

}
