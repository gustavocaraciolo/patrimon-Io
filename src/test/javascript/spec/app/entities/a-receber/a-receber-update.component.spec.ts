import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { PatrimonIoTestModule } from '../../../test.module';
import { AReceberUpdateComponent } from 'app/entities/a-receber/a-receber-update.component';
import { AReceberService } from 'app/entities/a-receber/a-receber.service';
import { AReceber } from 'app/shared/model/a-receber.model';

describe('Component Tests', () => {
  describe('AReceber Management Update Component', () => {
    let comp: AReceberUpdateComponent;
    let fixture: ComponentFixture<AReceberUpdateComponent>;
    let service: AReceberService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatrimonIoTestModule],
        declarations: [AReceberUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(AReceberUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AReceberUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AReceberService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new AReceber(123);
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
        const entity = new AReceber();
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
