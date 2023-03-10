import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthQuery } from 'src/app/shared/models';
import { environment } from 'src/enviroments/environment';
import { AuthService } from '../services/auth.service';
const urlBase = environment.URL_BASE;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent {
  params!: AuthQuery;
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
  }

  onSubmit(form: FormGroup) {
    const body = {
      UserName: form.value.userName, Password: form.value.password
    }
    if (form.valid) {
      this.authservice.auth(`${urlBase}account/login`, body).subscribe(resp => {
        if (resp.Status === 1) {
          this.router.navigate(['/', 'admin'])
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: resp.error, life: 3000 });
        }
      })
    }
  }
}
