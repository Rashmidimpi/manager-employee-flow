import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApihandlerService } from '../shared/apihandler.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  errors = null;
  constructor(public router: Router, public fb: FormBuilder, private apiService: ApihandlerService) {
    this.registerForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      password: [''],
      dob: ['', Validators.required],

    })
  }

  ngOnInit(): void {
  }

  onSubmit() {

    console.log(this.registerForm.value);

    this.apiService.emailcheck({email: this.registerForm.value.email}).subscribe(
      (data) => {
        if(data[0]){
          this.openSwal('Email already register. Please try with another.', 'error');
        }else{
          this.registeruser();
        } 

      }
    )
    }
  registeruser(){
    let url = 'manager';
    let apidata = this.registerForm.value;
    console.log('apidata :: ', apidata);

    this.apiService.postrequest(url, apidata).subscribe((data) => {
      console.log(data);
      this.router.navigate(['/']);
      this.openSwal('User registed', 'success');
    },
      (error) => {
        console.log(error);
        this.openSwal('Something went wrong', 'error');
      }
    )
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

