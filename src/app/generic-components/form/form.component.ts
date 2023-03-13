import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubscribersService } from 'src/app/components/services/subscribers.service';
import { environment } from 'src/enviroments/environment';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

const urlBase = environment.URL_BASE;


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  styles: [`
  :host ::ng-deep .p-dialog .product-image {
      width: 150px;
      margin: 0 auto 2rem auto;
      display: block;
  }
`],
  providers: [MessageService]
})
export class FormComponent {
  @Input() openForm!: boolean;
  @Input() subsUpdate!: any;
  @Output() hideForm = new EventEmitter<any>();
  formCreate: any;
  crateDialog!: boolean;
  submitted: boolean = false;
  page: number = 1;
  countries!: any;

  constructor(
    private fb: FormBuilder,
    private subscribers: SubscribersService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.resetForm();
  }


  ngOnInit() {
    this.crateDialog = this.openForm;
    this.getCountries();
    this.validateUpdate();

  }

  validateUpdate() {
    const { action, subsUpdate } = this.subsUpdate;
    if (action === 'update') {
      this.formCreate.setValue({
        name: subsUpdate.Name,
        email: subsUpdate.Email,
        countryCode: subsUpdate.CountryName,
        phoneNumber: subsUpdate.PhoneNumber
      });
    }


  }

  getCountries() {
    let params = {
      page: this.page,
      count: 10,
      sortType: 0
    }
    this.subscribers.getCountries(`${urlBase}countries/`, params).subscribe(
      {
        next: resp => {
          if (resp.Data) {
            this.countries = resp.Data;
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Internal server error', life: 3000 });
          }
        },
        error: err => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.Message, life: 3000 });
          this.router.navigate(['/', 'login'])
        }
      });
  }

  hideDialog(action: any) {
    this.crateDialog = false;
    this.submitted = false;
    this.hideForm.emit({ creaDialog: this.crateDialog, action: action });
    this.resetForm();
  }

  resetForm() {
    this.formCreate = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      countryCode: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern("[0-9 ]{12}")]]
    });
  }

  saveAll(form: FormGroup) {
    const { action } = this.subsUpdate;
    if (action === 'update') {
      this.saveUpdateSubscriber(form)
    } else {
      this.createSubscriber(form);
    }

  }

  saveUpdateSubscriber(formUpdate: any) {
    const { subsUpdate } = this.subsUpdate;
    const body = {
      "Id": subsUpdate.Id,
      "Name": formUpdate.value.name,
      "Email": formUpdate.value.email,
      "CountryCode": formUpdate.value.countryCode.Code,
      "PhoneNumber": formUpdate.value.phoneNumber,
      "JobTitle": "",
      "Area": "",
      "Topics": []
    };
    this.subscribers.updateSubscribers(`${urlBase}subscribers/`, body).subscribe(
      {
        next: resp => {
          if (resp === null) {
            this.hideDialog('save');
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Internal server error', life: 3000 });
          }
        },
        error: err => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.Message, life: 3000 });
          this.router.navigate(['/', 'login'])
        }
      });
  }

  createSubscriber(form: FormGroup) {
    this.submitted = true;
    let bodyParamas = {
      "Name": form.value.name,
      "Email": form.value.email,
      "CountryCode": form.value.countryCode.Code,
      "PhoneNumber": form.value.phoneNumber,
      "JobTitle": "",
      "Area": "",
      "Topics": []
    };
    if (form.valid) {
      this.subscribers.createSubscribers(`${urlBase}subscribers/`, bodyParamas).subscribe(
        {
          next: resp => {
            if (resp.length === 0) {
              this.hideDialog('save');
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Internal server error', life: 3000 });
            }
          },
          error: err => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.Message, life: 3000 });
            this.router.navigate(['/', 'login'])
          }
        });
    }
  }
}
