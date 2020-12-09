import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'imovel',
        loadChildren: () => import('./imovel/imovel.module').then(m => m.PatrimonIoImovelModule),
      },
      {
        path: 'contas-pagar',
        loadChildren: () => import('./contas-pagar/contas-pagar.module').then(m => m.PatrimonIoContasPagarModule),
      },
      {
        path: 'contas-receber',
        loadChildren: () => import('./contas-receber/contas-receber.module').then(m => m.PatrimonIoContasReceberModule),
      },
      {
        path: 'investimento',
        loadChildren: () => import('./investimento/investimento.module').then(m => m.PatrimonIoInvestimentoModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class PatrimonIoEntityModule {}
