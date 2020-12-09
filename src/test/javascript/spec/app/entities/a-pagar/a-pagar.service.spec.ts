import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { APagarService } from 'app/entities/a-pagar/a-pagar.service';
import { IAPagar, APagar } from 'app/shared/model/a-pagar.model';
import { Moeda } from 'app/shared/model/enumerations/moeda.model';
import { Status } from 'app/shared/model/enumerations/status.model';

describe('Service Tests', () => {
  describe('APagar Service', () => {
    let injector: TestBed;
    let service: APagarService;
    let httpMock: HttpTestingController;
    let elemDefault: IAPagar;
    let expectedResult: IAPagar | IAPagar[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(APagarService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new APagar(0, currentDate, currentDate, 0, Moeda.REAL, 'AAAAAAA', Status.PAGO, 'image/png', 'AAAAAAA');
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

      it('should create a APagar', () => {
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

        service.create(new APagar()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a APagar', () => {
        const returnedFromService = Object.assign(
          {
            dtPagamento: currentDate.format(DATE_FORMAT),
            dtVencimento: currentDate.format(DATE_FORMAT),
            valor: 1,
            moeda: 'BBBBBB',
            descricao: 'BBBBBB',
            status: 'BBBBBB',
            comprovantePagamento: 'BBBBBB',
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

      it('should return a list of APagar', () => {
        const returnedFromService = Object.assign(
          {
            dtPagamento: currentDate.format(DATE_FORMAT),
            dtVencimento: currentDate.format(DATE_FORMAT),
            valor: 1,
            moeda: 'BBBBBB',
            descricao: 'BBBBBB',
            status: 'BBBBBB',
            comprovantePagamento: 'BBBBBB',
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

      it('should delete a APagar', () => {
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
