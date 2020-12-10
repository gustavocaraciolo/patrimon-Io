import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { ImovelService } from 'app/entities/imovel/imovel.service';
import { IImovel, Imovel } from 'app/shared/model/imovel.model';

describe('Service Tests', () => {
  describe('Imovel Service', () => {
    let injector: TestBed;
    let service: ImovelService;
    let httpMock: HttpTestingController;
    let elemDefault: IImovel;
    let expectedResult: IImovel | IImovel[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(ImovelService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Imovel(
        0,
        'AAAAAAA',
        'image/png',
        'AAAAAAA',
        'image/png',
        'AAAAAAA',
        'image/png',
        'AAAAAAA',
        0,
        currentDate,
        currentDate,
        currentDate
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dtInicialPagamento: currentDate.format(DATE_FORMAT),
            dtFinalPagamento: currentDate.format(DATE_FORMAT),
            diaPreferencialPgmt: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Imovel', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dtInicialPagamento: currentDate.format(DATE_FORMAT),
            dtFinalPagamento: currentDate.format(DATE_FORMAT),
            diaPreferencialPgmt: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dtInicialPagamento: currentDate,
            dtFinalPagamento: currentDate,
            diaPreferencialPgmt: currentDate,
          },
          returnedFromService
        );

        service.create(new Imovel()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Imovel', () => {
        const returnedFromService = Object.assign(
          {
            nome: 'BBBBBB',
            projeto: 'BBBBBB',
            tabelaPreco: 'BBBBBB',
            contrato: 'BBBBBB',
            valorTotal: 1,
            dtInicialPagamento: currentDate.format(DATE_FORMAT),
            dtFinalPagamento: currentDate.format(DATE_FORMAT),
            diaPreferencialPgmt: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dtInicialPagamento: currentDate,
            dtFinalPagamento: currentDate,
            diaPreferencialPgmt: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Imovel', () => {
        const returnedFromService = Object.assign(
          {
            nome: 'BBBBBB',
            projeto: 'BBBBBB',
            tabelaPreco: 'BBBBBB',
            contrato: 'BBBBBB',
            valorTotal: 1,
            dtInicialPagamento: currentDate.format(DATE_FORMAT),
            dtFinalPagamento: currentDate.format(DATE_FORMAT),
            diaPreferencialPgmt: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dtInicialPagamento: currentDate,
            dtFinalPagamento: currentDate,
            diaPreferencialPgmt: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Imovel', () => {
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
