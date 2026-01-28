import { Component, OnInit } from "@angular/core";
import { IVeiculo } from "../../models/veiculo.model";
import { FormBuilder, Validators } from "@angular/forms";
import { VeiculoService } from "../../services/veiculo.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrl: "./form.component.scss",
})
export class FormComponent implements OnInit {
  public loading = false;
  public error: string | null = null;
  public titulo: string = "Cadastrar Veículo";


  form = this._fb.nonNullable.group({
    id: this._fb.control<number | null>(null),
    placa: ["", [Validators.required]],
    chassi: ["", [Validators.required]],
    renavam: ["", [Validators.required]],
    modelo: ["", [Validators.required]],
    marca: ["", [Validators.required]],
    ano: [
      new Date().getFullYear(),
      [Validators.required, Validators.min(1900), Validators.max(2100)],
    ],
  });

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _service: VeiculoService,
    private readonly _route: ActivatedRoute,
    private readonly _router: Router
  ) {}

  public ngOnInit(): void {
    const ID = this._route.snapshot.paramMap.get('id');
    if (ID != null) {
      this.titulo = "Editar veículo";
      this._load(Number.parseInt(ID));
    }
  }

  private _load(id: number): void {
    this.loading = true;
    this.error = null;

    this._service.get(id).subscribe({
      next: (data) => this._edit(data),
      error: () => (this.error = 'Falha ao carregar os dados do veículo'),
      complete: () => (this.loading = false)
    });
  }
  
  private _edit(veiculo: IVeiculo): void {
    this.form.patchValue({
      id: veiculo.id ?? null,
      placa: veiculo.placa,
      chassi: veiculo.chassi,
      renavam: veiculo.renavam,
      modelo: veiculo.modelo,
      marca: veiculo.marca,
      ano: veiculo.ano
    });
  }

  public submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const isEdit = !!value.id;

    const action$ = isEdit
      ? this._service.update(value as IVeiculo)
      : this._service.create({
          placa: value.placa,
          chassi: value.chassi,
          renavam: value.renavam,
          modelo: value.modelo,
          marca: value.marca,
          ano: Number(value.ano)
        });

    action$.subscribe({
      next: () => {
        this.resetForm();
        this._router.navigate(['../listagem']);
      },
      error: () => (this.error = 'Falha ao salvar')
    });
  }

  public resetForm(): void {
    this.form.reset({
      id: null,
      placa: '',
      chassi: '',
      renavam: '',
      modelo: '',
      marca: '',
      ano: new Date().getFullYear()
    });
  }
}
