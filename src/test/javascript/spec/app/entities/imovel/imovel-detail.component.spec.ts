import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { PatrimonIoTestModule } from '../../../test.module';
import { ImovelDetailComponent } from 'app/entities/imovel/imovel-detail.component';
import { Imovel } from 'app/shared/model/imovel.model';

describe('Component Tests', () => {
  describe('Imovel Management Detail Component', () => {
    let comp: ImovelDetailComponent;
    let fixture: ComponentFixture<ImovelDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ imovel: new Imovel(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatrimonIoTestModule],
        declarations: [ImovelDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ImovelDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ImovelDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load imovel on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.imovel).toEqual(jasmine.objectContaining({ id: 123 }));
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
