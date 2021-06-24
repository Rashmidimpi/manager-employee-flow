import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApihandlerService } from '../shared/apihandler.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errors = null;

  constructor(private apiService: ApihandlerService,public router: Router, public fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['',Validators.required],
      password: [''], 
    })
   }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.loginForm.value);
    var response_data = [];
    let url = 'manager';
    let apidata = this.loginForm.value;
    console.log('apidata :: ', apidata);

    this.apiService.loginrequest(apidata).subscribe((data) => {
      console.log(data);
      if(data[0]){
        localStorage.setItem("isLoggedin", "true");
        this.router.navigate(['/home']);
      } else {
        localStorage.setItem("isLoggedin", "false");
        this.openSwal('Please enter valid credentials', 'error');
      }
      

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
