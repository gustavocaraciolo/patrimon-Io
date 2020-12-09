import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IImovel, Imovel } from 'app/shared/model/imovel.model';
import { ImovelService } from './imovel.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-imovel-update',
  templateUrl: './imovel-update.component.html',
})
export class ImovelUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];

  editForm = this.fb.group({
    id: [],
    nome: [],
    user: [],
  });

  constructor(
    protected imovelService: ImovelService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ imovel }) => {
      this.updateForm(imovel);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(imovel: IImovel): void {
    this.editForm.patchValue({
      id: imovel.id,
      nome: imovel.nome,
      user: imovel.user,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const imovel = this.createFromForm();
    if (imovel.id !== undefined) {
      this.subscribeToSaveResponse(this.imovelService.update(imovel));
    } else {
      this.subscribeToSaveResponse(this.imovelService.create(imovel));
    }
  }

  private createFromForm(): IImovel {
    return {
      ...new Imovel(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      user: this.editForm.get(['user'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IImovel>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IUser): any {
    return item.id;
  }
}
