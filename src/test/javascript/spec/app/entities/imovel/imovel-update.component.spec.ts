import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { PatrimonIoTestModule } from '../../../test.module';
import { ImovelUpdateComponent } from 'app/entities/imovel/imovel-update.component';
import { ImovelService } from 'app/entities/imovel/imovel.service';
import { Imovel } from 'app/shared/model/imovel.model';

describe('Component Tests', () => {
  describe('Imovel Management Update Component', () => {
    let comp: ImovelUpdateComponent;
    let fixture: ComponentFixture<ImovelUpdateComponent>;
    let service: ImovelService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatrimonIoTestModule],
        declarations: [ImovelUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ImovelUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ImovelUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ImovelService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Imovel(123);
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
        const entity = new Imovel();
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
