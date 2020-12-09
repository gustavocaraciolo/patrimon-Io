import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PatrimonIoTestModule } from '../../../test.module';
import { ContasReceberDetailComponent } from 'app/entities/contas-receber/contas-receber-detail.component';
import { ContasReceber } from 'app/shared/model/contas-receber.model';

describe('Component Tests', () => {
  describe('ContasReceber Management Detail Component', () => {
    let comp: ContasReceberDetailComponent;
    let fixture: ComponentFixture<ContasReceberDetailComponent>;
    const route = ({ data: of({ contasReceber: new ContasReceber(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatrimonIoTestModule],
        declarations: [ContasReceberDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ContasReceberDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ContasReceberDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load contasReceber on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.contasReceber).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
