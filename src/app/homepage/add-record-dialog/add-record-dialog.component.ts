import { Component, OnInit,Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-add-record-dialog',
  templateUrl: './add-record-dialog.component.html',
  styleUrls: ['./add-record-dialog.component.scss']
})
export class AddRecordDialogComponent implements OnInit {
  title = "Add Employee"
  createRecordform: FormGroup;

  constructor( private fb: FormBuilder, private dialogRef: MatDialogRef<AddRecordDialogComponent> ) {

    this.createRecordform = this.fb.group({
      first_name: ['', [Validators.required,  Validators.pattern('[a-zA-Z ]*')]],
      last_name: ['', [Validators.required,  Validators.pattern('[a-zA-Z ]*')]],
      address: ['', Validators.required],
      birth_date: ['', Validators.required],
      mobile: ['',Validators.required],
      city: ['', Validators.required],
      
    });
   }

  ngOnInit(): void {
  }

  save(){
    
     if (this.createRecordform.valid) {
      this.dialogRef.close(this.createRecordform.value);
     
    }
   
    
  }

  close(){
    this.dialogRef.close();
  }

}
