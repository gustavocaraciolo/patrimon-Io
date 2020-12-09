import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { PatrimonIoTestModule } from '../../../test.module';
import { AReceberDetailComponent } from 'app/entities/a-receber/a-receber-detail.component';
import { AReceber } from 'app/shared/model/a-receber.model';

describe('Component Tests', () => {
  describe('AReceber Management Detail Component', () => {
    let comp: AReceberDetailComponent;
    let fixture: ComponentFixture<AReceberDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ aReceber: new AReceber(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatrimonIoTestModule],
        declarations: [AReceberDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(AReceberDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AReceberDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load aReceber on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.aReceber).toEqual(jasmine.objectContaining({ id: 123 }));
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
