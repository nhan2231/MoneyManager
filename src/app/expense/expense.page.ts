import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ToastController} from '@ionic/angular'

@Component({
  selector: 'app-expense',
  templateUrl: './expense.page.html',
  styleUrls: ['./expense.page.scss'],
})
export class ExpensePage implements OnInit {

  item: string
  price: number
  month: string
  date: string
  year: string

  constructor(private db: AngularFireDatabase, private toastController: ToastController) { 
    
  }

  ngOnInit() {
    var day = new Date();
    this.date = String(day.getDate()).padStart(2, '0');
    this.month = String(day.getMonth() + 1).padStart(2, '0');
    this.year = String(day.getFullYear());
  }

  async addItem(){
    const itemsRef = this.db.list('' + this.year + '/' + this.month);
    itemsRef.push({ item: this.item ,price: this.price*1000, date: this.date});
    console.log('Item has been added' + this.month + " /  " +this.date)

    const toast = await this.toastController.create({
      color: 'dark',
      duration: 2000,
      message: 'Created successfully',
      showCloseButton: true
    });

    await toast.present();
  }

}
