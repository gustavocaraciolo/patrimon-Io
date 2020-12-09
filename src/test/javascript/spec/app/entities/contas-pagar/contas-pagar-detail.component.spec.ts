import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PatrimonIoTestModule } from '../../../test.module';
import { ContasPagarDetailComponent } from 'app/entities/contas-pagar/contas-pagar-detail.component';
import { ContasPagar } from 'app/shared/model/contas-pagar.model';

describe('Component Tests', () => {
  describe('ContasPagar Management Detail Component', () => {
    let comp: ContasPagarDetailComponent;
    let fixture: ComponentFixture<ContasPagarDetailComponent>;
    const route = ({ data: of({ contasPagar: new ContasPagar(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatrimonIoTestModule],
        declarations: [ContasPagarDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ContasPagarDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ContasPagarDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load contasPagar on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.contasPagar).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
