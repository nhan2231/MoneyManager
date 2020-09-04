import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'
import { AngularFireDatabase} from '@angular/fire/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-date',
  templateUrl: './date.page.html',
  styleUrls: ['./date.page.scss'],
})
export class DatePage implements OnInit {
  years: any
  items: any

  year: any
  month: any
  totalSpent: number

  constructor(private db: AngularFireDatabase, private router: Router) { 
     db.list('YearList').valueChanges().subscribe(year => {
       this.years = year
     });
    
  }

  ngOnInit() {
    var day = new Date();
    this.month = String(day.getMonth() + 1).padStart(2, '0');
    this.year = String(day.getFullYear());
    this.chooseTime();
  }

  chooseTime(){
    this.totalSpent = 0
    this.db.list('' + this.year + '/' + this.month).snapshotChanges().subscribe(item => {
      item.forEach(unit => {
        this.totalSpent += unit.payload.val().price 
        console.log(this.totalSpent)
      })
      this.items = item
    });
   
    // this.db.list('' + this.year + '/' + this.month).snapshotChanges().subscribe(actions => {
    //   actions.forEach(action => {
    //     console.log(action.type);
    //     console.log(action.key);
    //     console.log(action.payload.val());
    //   });
    // });
  }

  edit(key, item){
    this.totalSpent = 0
    this.router.navigate(['edit', this.year, this.month, key])
    localStorage.setItem('expense', JSON.stringify(item))
  }

  delete(key){
    var flag = confirm('Delete this record?')
    if(flag == true){
      const itemsRef = this.db.list(this.year + "/" + this.month);
      itemsRef.remove(key);
    }
  }
}
