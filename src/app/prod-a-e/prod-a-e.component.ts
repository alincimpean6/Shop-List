import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppModule } from '../app.module';
import { AppComponent } from '../app.component';
import { SnackBarService } from '../snackBar/snack-bar.service';

@Component({
  selector: 'app-prod-a-e',
  templateUrl: './prod-a-e.component.html',
  styleUrls: ['./prod-a-e.component.scss']
})
export class ProdAEComponent implements OnInit {
  listForm: FormGroup;


  constructor(private fb: FormBuilder, private productServ: ProductService, private dialogR: MatDialogRef<ProdAEComponent>, @Inject(MAT_DIALOG_DATA) public data:any, private snackBarService: SnackBarService){
  this.listForm = this.fb.group({
    check: false,
    id: '',
    name: '',
    amount: '',
    price: '',
    totalPrice: ''
  });
  }

  ngOnInit(): void {
      this.listForm.patchValue(this.data);
  }

  onFormSubmit(){
    if(this.listForm.valid){
      if(this.data){
        const sum = this.listForm.value.amount3 * this.listForm.value.price;
        const updatedData = { check: this.listForm.value.check, id: this.listForm.value.id, name: this.listForm.value.name, amount: this.listForm.value.amount, price: this.listForm.value.price, totalPrice:sum};
        console.log(updatedData);
        this.productServ.updateProduct(this.data.id,updatedData).subscribe({
          next: (val: any) => { 
            this.snackBarService.openMessage(2,"Product updated sucessfully", "Ok");
          this.dialogR.close(true);
          },
          error: (err: any) => { 
            console.error(err);
          }
        });
      } else {
      const sum = this.listForm.value.amount * this.listForm.value.price;
      const updatedData = { check: this.listForm.value.check, id: this.listForm.value.id, name: this.listForm.value.name, amount: this.listForm.value.amount, price: this.listForm.value.price, totalPrice:sum};
      this.productServ.addProduct(updatedData).subscribe({
        next: (val: any) => { 
        this.snackBarService.openMessage(2,"Product added succesfully", "Ok");
        this.dialogR.close(true);
        },
        error: (err: any) => { 
          console.error(err);
        }
      });
    }
  }
  }

}
