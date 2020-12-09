import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { PatrimonIoTestModule } from '../../../test.module';
import { APagarUpdateComponent } from 'app/entities/a-pagar/a-pagar-update.component';
import { APagarService } from 'app/entities/a-pagar/a-pagar.service';
import { APagar } from 'app/shared/model/a-pagar.model';

describe('Component Tests', () => {
  describe('APagar Management Update Component', () => {
    let comp: APagarUpdateComponent;
    let fixture: ComponentFixture<APagarUpdateComponent>;
    let service: APagarService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatrimonIoTestModule],
        declarations: [APagarUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(APagarUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(APagarUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(APagarService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new APagar(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new APagar();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
