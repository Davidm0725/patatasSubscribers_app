import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageComponent } from './admin-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SubscribersService } from '../services/subscribers.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppModule } from 'src/app/app.module';

describe('AdminPageComponent', () => {
  let component: AdminPageComponent;
  let fixture: ComponentFixture<AdminPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminPageComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientTestingModule, AppModule],
      providers: [SubscribersService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test function hidedialog path save', () => {
    const eventMock = {
      action: 'save',
      creaDialog: false
    }
    component.hideDialog(eventMock);
  });

  it('test function hidedialog path cancel', () => {
    const eventMock = {
      action: 'cancel',
      creaDialog: false
    }
    component.hideDialog(eventMock);
  });

  it('test function crateSubscriber', () => {
    const eventMock = {
      action: 'cancel',
      creaDialog: false
    }
    component.createSubscriber();
    expect(component.crateDialog).toBeTrue;
  });

  it('test function update subcriber', () => {
    const elementMock = {
      name: 'Test',
      phoneNumber: 234123423432,
      email: 'test@e.com',
      countryCode: 'Zm'
    }
    component.updateSubs(elementMock);
    expect(component.crateDialog).toBeTrue;
  });

  it('test function paginator next', () => {
    component.nextPage();
    expect(component.page).toEqual(2);
  });

  it('test function paginator beforePage', () => {
    component.page = 2;
    component.beforePage();
    expect(component.page).toEqual(1);
  });

  it('test function show message error', () => {
    const errorMock = { severity: 'success', detail: 'Test message', summary: 'Successful' }
    component.showMessage(errorMock);
  });

  
});
