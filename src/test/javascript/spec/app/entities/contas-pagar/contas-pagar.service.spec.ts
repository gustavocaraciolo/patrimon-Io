import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { ContasPagarService } from 'app/entities/contas-pagar/contas-pagar.service';
import { IContasPagar, ContasPagar } from 'app/shared/model/contas-pagar.model';
import { Status } from 'app/shared/model/enumerations/status.model';

describe('Service Tests', () => {
  describe('ContasPagar Service', () => {
    let injector: TestBed;
    let service: ContasPagarService;
    let httpMock: HttpTestingController;
    let elemDefault: IContasPagar;
    let expectedResult: IContasPagar | IContasPagar[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(ContasPagarService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new ContasPagar(0, currentDate, currentDate, 0, Status.PAGO);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dtPagamento: currentDate.format(DATE_FORMAT),
            dtVencimento: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a ContasPagar', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dtPagamento: currentDate.format(DATE_FORMAT),
            dtVencimento: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dtPagamento: currentDate,
            dtVencimento: currentDate,
          },
          returnedFromService
        );

        service.create(new ContasPagar()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a ContasPagar', () => {
        const returnedFromService = Object.assign(
          {
            dtPagamento: currentDate.format(DATE_FORMAT),
            dtVencimento: currentDate.format(DATE_FORMAT),
            valor: 1,
            pago: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dtPagamento: currentDate,
            dtVencimento: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of ContasPagar', () => {
        const returnedFromService = Object.assign(
          {
            dtPagamento: currentDate.format(DATE_FORMAT),
            dtVencimento: currentDate.format(DATE_FORMAT),
            valor: 1,
            pago: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dtPagamento: currentDate,
            dtVencimento: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a ContasPagar', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
