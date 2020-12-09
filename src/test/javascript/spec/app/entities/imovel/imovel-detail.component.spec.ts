import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PatrimonIoTestModule } from '../../../test.module';
import { ImovelDetailComponent } from 'app/entities/imovel/imovel-detail.component';
import { Imovel } from 'app/shared/model/imovel.model';

describe('Component Tests', () => {
  describe('Imovel Management Detail Component', () => {
    let comp: ImovelDetailComponent;
    let fixture: ComponentFixture<ImovelDetailComponent>;
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
    });

    describe('OnInit', () => {
      it('Should load imovel on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.imovel).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
