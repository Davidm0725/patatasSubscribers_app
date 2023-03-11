import { Component } from '@angular/core';
import { environment } from 'src/enviroments/environment';
import { SubscribersService } from '../services/subscribers.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/generic-components/confirm-dialog/confirm-dialog.component';

const urlBase = environment.URL_BASE;


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
  styles: [`
  :host ::ng-deep .p-dialog .product-image {
      width: 150px;
      margin: 0 auto 2rem auto;
      display: block;
  }
`],
  providers: [MessageService, ConfirmationService]

})
export class AdminPageComponent {
  displayedColumns: string[] = ['Id', 'Name', 'Email', 'Phone Number', 'Country Name', 'Area', 'Subscription State', 'Actions'];
  dataSource: any = [];
  crateDialog: boolean = false;
  submitted: boolean = false;
  page: number = 1;
  formCreate: any;


  constructor(
    private subscribers: SubscribersService,
    private fb: FormBuilder,
    private messageService: MessageService,
    public dialog: MatDialog
  ) { this.resetForm(); }

  ngOnInit() {
    this.getSubscribers(this.page);
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, element: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result, 'resul')
      if (result.confirm === 'Ok') {
        this.deleteSubs(result.subs);
      }
    });

  }

  resetForm() {
    this.formCreate = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      CountryCode: [''],
      phoneNumber: ['']
    });
  }

  getSubscribers(numPage: number) {
    let params = {
      page: numPage,
      count: 10,
      sortType: 0
    }
    this.subscribers.getSubscribers(`${urlBase}subscribers/`, params).subscribe(response => {
      this.dataSource = response.Data;
      console.log(this.dataSource, 'dtasourse');
    });
  }

  createSubscriber() {
    this.resetForm();
    // this.id = 0;
    // this.code = "";
    // this.title = "";
    this.submitted = false;
    this.crateDialog = true;
  }


  hideDialog() {
    this.crateDialog = false;
    this.submitted = false;
  }

  deleteSubs(element: any) {
    this.subscribers.deleteSubscribers(`${urlBase}subscribers/${element.Id}`).subscribe(response => {
      if (response.message === "Subscriber deleted successfully") {
        this.showMessage({ severity: 'success', detail: response.message, summary: 'Successful' });
        this.getSubscribers(this.page);
      } else {
        this.showMessage({ severity: 'error', detail: 'Internal server error.', summary: 'Error' });
      }
    });
  }

  showMessage(typeError: any) {
    const { severity, detail, summary } = typeError;
    this.messageService.add({ severity: severity, summary: summary, detail: detail, life: 3000 });
  }

  updateSubs(elemnt: any) {
    // this.id = elemnt.id;
    // this.code = elemnt.code;
    // this.title = elemnt.title;
    // this.description = elemnt.description;
    // this.updateCategoryAction = true;
    // this.submitted = false;
    // this.crateDialog = true;

  }
}
