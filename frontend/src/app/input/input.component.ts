import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../model/product';
import { MasterService } from '../services/master.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  formProduct!: FormGroup;
  id!:number;

    constructor(private toastr: ToastrService,
                private formBuild: FormBuilder,
                private mast: MasterService,
                private router: Router,
                private route: ActivatedRoute) {
    this.formProduct = this.formBuild.group({
    'id': null,
    'name': new FormControl(null, [Validators.required, Validators.minLength(1)]),
    'price': new FormControl(null, [Validators.required, Validators.minLength(3)]),
    'category': new FormControl(null, [Validators.required, Validators.minLength(3)]),
    'create_date': null,
    'create_by': new FormControl(null, [Validators.required, Validators.minLength(3)])
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(rute => {
      this.id = parseInt(rute['id']);
      if (this.id) {
        console.log(this.id)
        this.mast.getProductById(this.id).subscribe({
          next: (value: { id: any; name: any; price: any; category: any; create_date: any; create_by: any; }): void => {
            this.formProduct.controls['id'].setValue(value.id)
            this.formProduct.controls['name'].setValue(value.name)
            this.formProduct.controls['price'].setValue(value.price)
            this.formProduct.controls['category'].setValue(value.category)
            this.formProduct.controls['create_date'].setValue(value.create_date)
            this.formProduct.controls['create_by'].setValue(value.create_by)
          }
        })
      }
    })
  }

  simpan():void{
    console.log(this.formProduct.controls);
    console.log(this.formProduct.valid);
    if (this.formProduct.valid){
      let data = <Product>{};
      data.id =this.formProduct.controls['id'].value
      data.name =this.formProduct.controls['name'].value
      data.price =this.formProduct.controls['price'].value
      data.category =this.formProduct.controls['category'].value
      data.create_date =this.formProduct.controls['create_date'].value
      data.create_by =this.formProduct.controls['create_by'].value

      if(this.id){
        data.id = this.id;
      }
      this.mast.insertData(data).subscribe({
        next:hasil =>{
          // alert('simpan berhasil')
          this.toastr.success(hasil.status, 'Simpan Berhasil');
          this.router.navigateByUrl('/update' + data.id);
        },
        error: err => {

          const pesan: any[] = err.error.status.arguments;
          console.log(pesan);
          let msg = '';
          for (let i = 0; i < pesan.length; i++) {
            if(pesan[i].code){
              msg += pesan[i].code + "\n"
            }

          }
          console.log(msg)
          this.toastr.error(msg, 'Error!',{
          })
        }
      });
    }else{
      this.toastr.error('Form Wajib Di LEngkapi!', 'Error')
    }
  }

  update():void{
    let data = <Product>{};
    data.id =this.formProduct.controls['id'].value
    data.name =this.formProduct.controls['name'].value
    data.price =this.formProduct.controls['price'].value
    data.category =this.formProduct.controls['category'].value
    data.create_date =this.formProduct.controls['create_date'].value
    data.create_by =this.formProduct.controls['create_by'].value
    if(this.id){
      data.id = this.id;
    }
    this.mast.updateProduct(data).subscribe({
      next:hasil =>{
        this.toastr.success(hasil.status, 'Simpan Berhasil')
        this.router.navigateByUrl('/list');
      },
      error: err => {
        console.log(err)
      }
    })
  }

}
