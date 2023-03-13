import { Component } from '@angular/core';
import { environment } from 'src/enviroments/environment';
import { SubscribersService } from '../services/subscribers.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/generic-components/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';

const urlBase = environment.URL_BASE;


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
  providers: [MessageService, ConfirmationService]

})
export class AdminPageComponent {
  displayedColumns: string[] = ['Id', 'Name', 'Email', 'Phone Number', 'Country Name', 'Area', 'Subscription State', 'Actions'];
  dataSource: any = [];
  crateDialog = false;
  page: number = 1;
  formCreate: any;
  subscriberUpdate: any;


  constructor(
    private subscribers: SubscribersService,
    private messageService: MessageService,
    public dialog: MatDialog,
    private router: Router,
  ) { }

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
      if (result.confirm === 'Ok') {
        this.deleteSubs(result.subs);
      }
    });

  }

  getSubscribers(numPage: number) {
    let params = {
      page: numPage,
      count: 10,
      sortType: 0
    }
    this.subscribers.getSubscribers(`${urlBase}subscribers/`, params).subscribe(
      {
        next: resp => {
          if (resp.Data) {
            this.dataSource = resp.Data;
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Internal server error', life: 3000 });
          }
        },
        error: err => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.Message, life: 3000 });
          setTimeout(() => {
            this.router.navigate(['/', 'login']);
          }, 1000);
        }

      });
  }

  hideDialog(event: any) {
    this.crateDialog = event.creaDialog;
    if (event.action === 'save') {
      this.getSubscribers(this.page);
    } else {
      this.subscriberUpdate = "";
    }
  }

  createSubscriber() {
    this.subscriberUpdate = { action: 'create', subsUpdate: "" };
    this.crateDialog = true;
  }


  deleteSubs(element: any) {
    this.subscribers.deleteSubscribers(`${urlBase}subscribers/${element.Id}`).subscribe(
      {
        next: response => {
          if (response.message === "Subscriber deleted successfully") {
            this.showMessage({ severity: 'success', detail: response.message, summary: 'Successful' });
            this.getSubscribers(this.page);
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

  showMessage(typeError: any) {
    const { severity, detail, summary } = typeError;
    this.messageService.add({ severity: severity, summary: summary, detail: detail, life: 3000 });
  }

  updateSubs(element: any) {
    this.subscriberUpdate = { action: 'update', subsUpdate: element };
    this.crateDialog = true;
  }
}
