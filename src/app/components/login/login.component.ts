import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { environment } from 'src/enviroments/environment';
import { AuthService } from '../../commons/services/auth.service';
const urlBase = environment.URL_BASE;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent {
  hide = true;
  loginForm: any;

  constructor(private fb: FormBuilder,
    private router: Router,
    public authservice: AuthService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
    localStorage.removeItem('Token');
  }

  onSubmit(form: FormGroup) {
    const body = {
      UserName: form.value.userName, Password: form.value.password
    }
    if (form.valid) {
      this.authservice.auth(`${urlBase}account/login`, body).subscribe(
        {
          next: resp => {
            if (resp.Status === 1) {
              localStorage.setItem('Token', resp.Token);
              this.router.navigate(['/', 'admin'])
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Internal server error', life: 3000 });
            }
          },
          error: err => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.error, life: 3000 });
          }
        });
    }
  }
}


