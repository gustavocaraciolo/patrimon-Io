import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { PatrimonIoTestModule } from '../../../test.module';
import { APagarDetailComponent } from 'app/entities/a-pagar/a-pagar-detail.component';
import { APagar } from 'app/shared/model/a-pagar.model';

describe('Component Tests', () => {
  describe('APagar Management Detail Component', () => {
    let comp: APagarDetailComponent;
    let fixture: ComponentFixture<APagarDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ aPagar: new APagar(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatrimonIoTestModule],
        declarations: [APagarDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(APagarDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(APagarDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load aPagar on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.aPagar).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeContentType, fakeBase64);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64);
      });
    });
  });
});
