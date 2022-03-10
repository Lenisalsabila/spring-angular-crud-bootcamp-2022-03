import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { MasterService } from '../services/master.service';

@Component({
  selector: 'app-beranda',
  templateUrl: './beranda.component.html',
  styleUrls: ['./beranda.component.css']
})
export class BerandaComponent implements OnInit {
  list!:Product[];
  constructor(private mast: MasterService) { }

  ngOnInit(): void {
    this.mast.list().subscribe({
      next:(hasil: Product[]) =>{
        this.list =hasil
      },
      error: (err: any) => {
       // console.log(err)
      }, complete:()=>{

      }
    })
  }
  deleteProduct(id:number):void {
    this.mast.deleteProduct(id).subscribe((res: any) => {
      this.list = this.list.filter(item => item.id !== id);
      console.log('Delete successfully')
    })
  }

}
