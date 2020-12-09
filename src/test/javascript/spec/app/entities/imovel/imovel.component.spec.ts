import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PatrimonIoTestModule } from '../../../test.module';
import { ImovelComponent } from 'app/entities/imovel/imovel.component';
import { ImovelService } from 'app/entities/imovel/imovel.service';
import { Imovel } from 'app/shared/model/imovel.model';

describe('Component Tests', () => {
  describe('Imovel Management Component', () => {
    let comp: ImovelComponent;
    let fixture: ComponentFixture<ImovelComponent>;
    let service: ImovelService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatrimonIoTestModule],
        declarations: [ImovelComponent],
      })
        .overrideTemplate(ImovelComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ImovelComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ImovelService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Imovel(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.imovels && comp.imovels[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
