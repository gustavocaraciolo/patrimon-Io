import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { PatrimonIoTestModule } from '../../../test.module';
import { ContasPagarUpdateComponent } from 'app/entities/contas-pagar/contas-pagar-update.component';
import { ContasPagarService } from 'app/entities/contas-pagar/contas-pagar.service';
import { ContasPagar } from 'app/shared/model/contas-pagar.model';

describe('Component Tests', () => {
  describe('ContasPagar Management Update Component', () => {
    let comp: ContasPagarUpdateComponent;
    let fixture: ComponentFixture<ContasPagarUpdateComponent>;
    let service: ContasPagarService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatrimonIoTestModule],
        declarations: [ContasPagarUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ContasPagarUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ContasPagarUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ContasPagarService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ContasPagar(123);
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
        const entity = new ContasPagar();
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
