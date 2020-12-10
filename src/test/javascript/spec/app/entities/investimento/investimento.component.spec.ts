import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PatrimonIoTestModule } from '../../../test.module';
import { InvestimentoComponent } from 'app/entities/investimento/investimento.component';
import { InvestimentoService } from 'app/entities/investimento/investimento.service';
import { Investimento } from 'app/shared/model/investimento.model';

describe('Component Tests', () => {
  describe('Investimento Management Component', () => {
    let comp: InvestimentoComponent;
    let fixture: ComponentFixture<InvestimentoComponent>;
    let service: InvestimentoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatrimonIoTestModule],
        declarations: [InvestimentoComponent],
      })
        .overrideTemplate(InvestimentoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(InvestimentoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(InvestimentoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Investimento(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.investimentos && comp.investimentos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
