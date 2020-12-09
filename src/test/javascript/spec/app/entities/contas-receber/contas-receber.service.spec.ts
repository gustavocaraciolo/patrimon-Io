import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { ContasReceberService } from 'app/entities/contas-receber/contas-receber.service';
import { IContasReceber, ContasReceber } from 'app/shared/model/contas-receber.model';
import { Status } from 'app/shared/model/enumerations/status.model';

describe('Service Tests', () => {
  describe('ContasReceber Service', () => {
    let injector: TestBed;
    let service: ContasReceberService;
    let httpMock: HttpTestingController;
    let elemDefault: IContasReceber;
    let expectedResult: IContasReceber | IContasReceber[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(ContasReceberService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new ContasReceber(0, currentDate, currentDate, 0, Status.PAGO);
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

      it('should create a ContasReceber', () => {
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

        service.create(new ContasReceber()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a ContasReceber', () => {
        const returnedFromService = Object.assign(
          {
            dtRecebido: currentDate.format(DATE_FORMAT),
            dtRecebimento: currentDate.format(DATE_FORMAT),
            valor: 1,
            pago: 'BBBBBB',
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

      it('should return a list of ContasReceber', () => {
        const returnedFromService = Object.assign(
          {
            dtRecebido: currentDate.format(DATE_FORMAT),
            dtRecebimento: currentDate.format(DATE_FORMAT),
            valor: 1,
            pago: 'BBBBBB',
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

      it('should delete a ContasReceber', () => {
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
