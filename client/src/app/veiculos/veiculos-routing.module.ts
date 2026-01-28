import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ListagemComponent } from "./pages/listagem/listagem.component";
import { FormComponent } from "./pages/form/form.component";

const routes: Routes = [
  { path: "listagem", component: ListagemComponent },
  { path: "editar/:id", component: FormComponent },
  { path: "cadastrar", component: FormComponent },
  { path: "**", redirectTo: "listagem" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VeiculosRoutingModule {}
