import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { SubscribersService } from './subscribers.service';

describe('SubscribersService', () => {
  let service: SubscribersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SubscribersService]
    });
    service = TestBed.inject(SubscribersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
