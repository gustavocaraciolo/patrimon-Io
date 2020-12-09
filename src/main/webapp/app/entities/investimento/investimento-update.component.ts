import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IInvestimento, Investimento } from 'app/shared/model/investimento.model';
import { InvestimentoService } from './investimento.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-investimento-update',
  templateUrl: './investimento-update.component.html',
})
export class InvestimentoUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];

  editForm = this.fb.group({
    id: [],
    investimento: [],
    user: [],
  });

  constructor(
    protected investimentoService: InvestimentoService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ investimento }) => {
      this.updateForm(investimento);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(investimento: IInvestimento): void {
    this.editForm.patchValue({
      id: investimento.id,
      investimento: investimento.investimento,
      user: investimento.user,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const investimento = this.createFromForm();
    if (investimento.id !== undefined) {
      this.subscribeToSaveResponse(this.investimentoService.update(investimento));
    } else {
      this.subscribeToSaveResponse(this.investimentoService.create(investimento));
    }
  }

  private createFromForm(): IInvestimento {
    return {
      ...new Investimento(),
      id: this.editForm.get(['id'])!.value,
      investimento: this.editForm.get(['investimento'])!.value,
      user: this.editForm.get(['user'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInvestimento>>): void {
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
