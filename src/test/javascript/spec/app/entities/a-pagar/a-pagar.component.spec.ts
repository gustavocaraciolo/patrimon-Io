import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PatrimonIoTestModule } from '../../../test.module';
import { APagarComponent } from 'app/entities/a-pagar/a-pagar.component';
import { APagarService } from 'app/entities/a-pagar/a-pagar.service';
import { APagar } from 'app/shared/model/a-pagar.model';

describe('Component Tests', () => {
  describe('APagar Management Component', () => {
    let comp: APagarComponent;
    let fixture: ComponentFixture<APagarComponent>;
    let service: APagarService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatrimonIoTestModule],
        declarations: [APagarComponent],
      })
        .overrideTemplate(APagarComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(APagarComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(APagarService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new APagar(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.aPagars && comp.aPagars[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
