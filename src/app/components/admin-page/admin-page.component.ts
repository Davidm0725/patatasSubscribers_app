import { Component, inject } from '@angular/core';
import { environment } from 'src/enviroments/environment';
import { SubscribersService } from '../../commons/services/subscribers.service';
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
  page = 1;
  totalPage = 0;
  resultxPage = 0;
  formCreate: any;
  subscriberUpdate: any;
  countSubs!: number;
  private subscribers = inject(SubscribersService);
  private messageService = inject(MessageService);
  private dialog = inject(MatDialog);
  private router = inject(Router);

  constructor() { }

  ngOnInit() {
    this.getSubscribers();
  }

  resultXpage() {
    this.resultxPage = this.countSubs
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

  getSubscribers() {
    let params = {
      criteria: "",
      page: this.page,
      count: 10,
      sortOrder: "",
      sortType: 0
    }
    this.subscribers.getSubscribers(`${urlBase}subscribers/`, params).subscribe(
      {
        next: resp => {
          if (resp.Data) {
            this.countSubs = resp.Count;
            this.dataSource = resp.Data;
            this.totalPage = Math.ceil(this.countSubs / 10)
          } else {
            this.showMessage({ severity: 'error', summary: 'Error', detail: 'Internal server error', life: 3000 });
          }
        },
        error: err => {
          this.showMessage({ severity: 'error', summary: 'Error', detail: err.error.Message, life: 3000 });
          setTimeout(() => {
            this.router.navigate(['/', 'login']);
          }, 1000);
        }

      });
  }

  hideDialog(event: any) {
    this.crateDialog = event.creaDialog;
    if (event.action === 'save') {
      this.getSubscribers();
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
            this.getSubscribers();
          } else {
            this.showMessage({ severity: 'error', summary: 'Error', detail: 'Internal server error', life: 3000 });
          }
        },
        error: err => {
          this.showMessage({ severity: 'error', summary: 'Error', detail: err.error.Message, life: 3000 });
          this.router.navigate(['/', 'login'])
        }

      });
  }

  showMessage(msgShow: any) {
    const { severity, detail, summary } = msgShow;
    this.messageService.add({ severity: severity, summary: summary, detail: detail, life: 3000 });
  }

  updateSubs(element: any) {
    this.subscriberUpdate = { action: 'update', subsUpdate: element };
    this.crateDialog = true;
  }

  validatePaginator(): boolean {
    if (this.countSubs > (this.page * 10)) {
      return false
    } else {
      return true;
    }
  }

  countResultsValidate() {
    if (this.countSubs < 10) {
      this.resultxPage = this.countSubs;
    } else {
      this.resultxPage = 10;
    }
  }

  nextPage() {
    this.page = this.page + 1;
    this.getSubscribers();
  }

  beforePage() {
    this.page = this.page - 1;
    this.getSubscribers();
  }
}
