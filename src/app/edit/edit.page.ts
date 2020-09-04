import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase} from '@angular/fire/database';
import { ToastController} from '@ionic/angular'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  key: any 
  expense: any
  year: any
  month: any

  item: string
  price: number
  date: string

  constructor(private route: ActivatedRoute, private db: AngularFireDatabase, private toastController: ToastController) { }

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.key = param['key']
      this.year = param['year']
      this.month = param['month']
    })
    this.expense = JSON.parse(localStorage.getItem('expense'))
    this.item = this.expense.item;
    this.price = this.expense.price;
    this.date = this.expense.date;
  }

  async updateItem(){
    const itemsRef = this.db.list(this.year + '/' + this.month);
    itemsRef.update(this.key, { item: this.item, price: this.price, date: this.date });

    const toast = await this.toastController.create({
      color: 'dark',
      duration: 2000,
      message: 'Updated successfully',
      showCloseButton: true
    });

    await toast.present();
  }

}

