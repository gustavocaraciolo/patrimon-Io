import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { PatrimonIoTestModule } from '../../../test.module';
import { ContasReceberUpdateComponent } from 'app/entities/contas-receber/contas-receber-update.component';
import { ContasReceberService } from 'app/entities/contas-receber/contas-receber.service';
import { ContasReceber } from 'app/shared/model/contas-receber.model';

describe('Component Tests', () => {
  describe('ContasReceber Management Update Component', () => {
    let comp: ContasReceberUpdateComponent;
    let fixture: ComponentFixture<ContasReceberUpdateComponent>;
    let service: ContasReceberService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatrimonIoTestModule],
        declarations: [ContasReceberUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ContasReceberUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ContasReceberUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ContasReceberService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ContasReceber(123);
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
        const entity = new ContasReceber();
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
