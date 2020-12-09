import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PatrimonIoTestModule } from '../../../test.module';
import { AReceberComponent } from 'app/entities/a-receber/a-receber.component';
import { AReceberService } from 'app/entities/a-receber/a-receber.service';
import { AReceber } from 'app/shared/model/a-receber.model';

describe('Component Tests', () => {
  describe('AReceber Management Component', () => {
    let comp: AReceberComponent;
    let fixture: ComponentFixture<AReceberComponent>;
    let service: AReceberService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatrimonIoTestModule],
        declarations: [AReceberComponent],
      })
        .overrideTemplate(AReceberComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AReceberComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AReceberService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new AReceber(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.aRecebers && comp.aRecebers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
