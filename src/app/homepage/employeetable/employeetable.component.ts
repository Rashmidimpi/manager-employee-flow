import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddRecordDialogComponent } from '../add-record-dialog/add-record-dialog.component';
import { EditRecordDialogComponent } from '../edit-record-dialog/edit-record-dialog.component';
import { ApihandlerService } from 'src/app/shared/apihandler.service';
import Swal from 'sweetalert2';
import { config } from 'rxjs';


@Component({
  selector: 'app-employeetable',
  templateUrl: './employeetable.component.html',
  styleUrls: ['./employeetable.component.scss']
})
export class EmployeetableComponent implements OnInit {
  displayedColumns = ['id', 'first_name', 'last_name', 'address', 'birth_date', 'mobile', 'city', 'action'];
  dataSource = new MatTableDataSource();
  datalist = [];
  value = '';
  recordFound: boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private apiService: ApihandlerService, private dialog: MatDialog, private router: Router, private route: ActivatedRoute, private ApihandlerService: ApihandlerService) { }

  ngOnInit(): void {
    this.getEmployeeList();
  }

  getEmployeeList() {
    let url = 'employee';
    this.apiService.getrequest(url).subscribe(response => {
      console.log(response);
      this.datalist = response;
      this.dataSource = new MatTableDataSource(response);
      console.log(this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }



  deleterecord(id) {
    console.log(id);
    this.apiService.deleterequest('employee/', id).subscribe(
      (data) => {
        console.log(data);
        this.getEmployeeList()
        this.getEmployeeList();
        this.openSwal('Record Deleted', 'success');
      },
      (error) => {
        console.log(error);
        this.openSwal('Something went wrong', 'error');
      })


  }

  editrecord(id, first_name, last_name, address, birth_date, mobile, city) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '70%';
    dialogConfig.width = '60%';

    dialogConfig.data = {
      id: id,
      first_name: first_name,
      last_name: last_name,
      address: address,
      birth_date: birth_date,
      mobile: mobile,
      city: city,
    };
    console.log(dialogConfig.data);

    const dialogRef = this.dialog.open(EditRecordDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data);
        this.updateEmployee(id, data);
      }
    );
  }

  addemployee() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '90%';
    dialogConfig.width = '50%';


    const dialogRef = this.dialog.open(AddRecordDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data);
        this.createNewRecord(data);
      }
    );

  }

  createNewRecord(data) {
    if (data) {
      console.log("create data :: ", data);

      let url = 'employee';
      this.apiService.postrequest(url, data).subscribe(
        (data) => {
          console.log("new", data);
          // console.log(response.status);
          this.getEmployeeList();
          this.openSwal('Employee data stored', 'success');

        },
        (error) => {
          console.log(error);
          this.openSwal('Something went wrong', 'error');
        });
    }
  }

  updateEmployee(id, data) {
    console.log(data);
    this.apiService.updaterequest('employee/', id, data).subscribe(
      (data) => {
        // alert("user updated");
        this.getEmployeeList();
        this.openSwal('Employee data updated', 'success');
      },
      (error) => {
        console.log(error);
        this.openSwal('Something went wrong', 'error');
      })

  }

  openSwal(title, icon) {

    Swal.fire({
      title: title,
      icon: icon,
      showDenyButton: false,
      showCancelButton: false,
      confirmButtonText: `Ok`,
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        // Swal.fire('Saved!', '', 'success')
        // this.router.navigate(['/review'], { queryParams: { test_id: this.test_id } });
      } else if (result.isDenied) {

      }
    })
  }


}
