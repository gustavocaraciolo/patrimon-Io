import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { AReceberService } from 'app/entities/a-receber/a-receber.service';
import { IAReceber, AReceber } from 'app/shared/model/a-receber.model';
import { Moeda } from 'app/shared/model/enumerations/moeda.model';
import { Status } from 'app/shared/model/enumerations/status.model';

describe('Service Tests', () => {
  describe('AReceber Service', () => {
    let injector: TestBed;
    let service: AReceberService;
    let httpMock: HttpTestingController;
    let elemDefault: IAReceber;
    let expectedResult: IAReceber | IAReceber[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(AReceberService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new AReceber(0, currentDate, currentDate, 0, Moeda.REAL, 'AAAAAAA', Status.PAGO, 'image/png', 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dtRecebido: currentDate.format(DATE_FORMAT),
            dtRecebimento: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a AReceber', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dtRecebido: currentDate.format(DATE_FORMAT),
            dtRecebimento: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dtRecebido: currentDate,
            dtRecebimento: currentDate,
          },
          returnedFromService
        );

        service.create(new AReceber()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a AReceber', () => {
        const returnedFromService = Object.assign(
          {
            dtRecebido: currentDate.format(DATE_FORMAT),
            dtRecebimento: currentDate.format(DATE_FORMAT),
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
            dtRecebido: currentDate,
            dtRecebimento: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of AReceber', () => {
        const returnedFromService = Object.assign(
          {
            dtRecebido: currentDate.format(DATE_FORMAT),
            dtRecebimento: currentDate.format(DATE_FORMAT),
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
            dtRecebido: currentDate,
            dtRecebimento: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a AReceber', () => {
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
