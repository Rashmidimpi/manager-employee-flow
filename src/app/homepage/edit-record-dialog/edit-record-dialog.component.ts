import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApihandlerService } from 'src/app/shared/apihandler.service';
import { EmployeetableComponent } from '../employeetable/employeetable.component';
import { AddRecordDialogComponent } from '../add-record-dialog/add-record-dialog.component';



@Component({
  selector: 'app-edit-record-dialog',
  templateUrl: './edit-record-dialog.component.html',
  styleUrls: ['./edit-record-dialog.component.scss']
})
export class EditRecordDialogComponent implements OnInit {
  title = "Edit Employee"
  item ;
  editRecordform: FormGroup;

  constructor(private apiService: ApihandlerService,private fb: FormBuilder, private dialogRef: MatDialogRef<EditRecordDialogComponent> , @Inject(MAT_DIALOG_DATA) data) {

    
    this.item = data;
    console.log("item", this.item);
    
    this.editRecordform = this.fb.group({
      first_name: [this.item.first_name,[Validators.required,  Validators.pattern('[a-zA-Z ]*')]],
      last_name: [this.item.last_name,[Validators.required,  Validators.pattern('[a-zA-Z ]*')]],
      address: [this.item.address, Validators.required],
      birth_date: [this.item.birth_date, Validators.required],
      mobile: [this.item.mobile, Validators.required],
      city: [this.item.city, Validators.required],
      
    });
    console.log(' editRecordDialog ', this.item);
  }
 
  ngOnInit(): void {
  }

  save(){
    if (this.editRecordform.valid) {
      this.dialogRef.close(this.editRecordform.value);
    }
  }

  close(){
    this.dialogRef.close();
  }

}
