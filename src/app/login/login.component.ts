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
      email: ['',[Validators.required, ,Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]], 
    })
   }

  ngOnInit(): void {
  }

  ascii_to_hexa(str) {
    var arr1 = [];
    for (var n = 0, l = str.length; n < l; n++) {
      var hex = Number(str.charCodeAt(n)).toString(16);
      arr1.push(hex);
    }
    return arr1.join('');
  }

  onSubmit() {
    console.log(this.loginForm.value);

    if (this.loginForm.valid) {
    var response_data = [];
    let url = 'manager';
    let apidata = this.loginForm.value;
      apidata['password'] = this.ascii_to_hexa(this.loginForm.value.password);
    

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
       
      } else if (result.isDenied) {

      }
    })
  }

}
