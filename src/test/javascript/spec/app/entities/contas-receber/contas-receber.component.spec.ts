import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PatrimonIoTestModule } from '../../../test.module';
import { ContasReceberComponent } from 'app/entities/contas-receber/contas-receber.component';
import { ContasReceberService } from 'app/entities/contas-receber/contas-receber.service';
import { ContasReceber } from 'app/shared/model/contas-receber.model';

describe('Component Tests', () => {
  describe('ContasReceber Management Component', () => {
    let comp: ContasReceberComponent;
    let fixture: ComponentFixture<ContasReceberComponent>;
    let service: ContasReceberService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatrimonIoTestModule],
        declarations: [ContasReceberComponent],
      })
        .overrideTemplate(ContasReceberComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ContasReceberComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ContasReceberService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ContasReceber(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.contasRecebers && comp.contasRecebers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
