import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PatrimonIoTestModule } from '../../../test.module';
import { ContasPagarComponent } from 'app/entities/contas-pagar/contas-pagar.component';
import { ContasPagarService } from 'app/entities/contas-pagar/contas-pagar.service';
import { ContasPagar } from 'app/shared/model/contas-pagar.model';

describe('Component Tests', () => {
  describe('ContasPagar Management Component', () => {
    let comp: ContasPagarComponent;
    let fixture: ComponentFixture<ContasPagarComponent>;
    let service: ContasPagarService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatrimonIoTestModule],
        declarations: [ContasPagarComponent],
      })
        .overrideTemplate(ContasPagarComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ContasPagarComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ContasPagarService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ContasPagar(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.contasPagars && comp.contasPagars[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
