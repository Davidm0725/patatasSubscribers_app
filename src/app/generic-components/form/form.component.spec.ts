import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';
import { SubscribersService } from 'src/app/commons/services/subscribers.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { FormComponent } from './form.component';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormComponent],
      imports: [
        HttpClientTestingModule,
        AppModule],
      providers: [SubscribersService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    component.subsUpdate = { action: 'update', subsUpdate: { Name: 'test', Email: 'test@c.com', CountryName: 'Zm', PhoneNumber: '823749238744' } }
    component.formCreate = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      countryCode: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test function saveall path update', () => {
    component.subsUpdate = { action: 'update', subsUpdate: { Name: 'test', Email: 'test@c.com', CountryName: 'Zm', PhoneNumber: '823749238744' } }
    component.saveAll(component.formCreate);
  });

  it('test function saveall path create subscriber', () => {
    component.subsUpdate = { action: 'create', subsUpdate: { Name: 'test', Email: 'test@c.com', CountryName: 'Zm', PhoneNumber: '823749238744' } }
    component.saveAll(component.formCreate);
  });
});
