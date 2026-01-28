import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FormComponent } from "./form.component";
import { VeiculoService } from "../../services/veiculo.service";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";

describe("FormComponent", () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let serviceSpy: jasmine.SpyObj<VeiculoService>;

  beforeEach(async () => {
    serviceSpy = jasmine.createSpyObj<VeiculoService>("veiculoService", [
      "getAll",
      "create",
      "update",
      "delete",
    ]);

    await TestBed.configureTestingModule({
      declarations: [FormComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [{ provide: VeiculoService, useValue: serviceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
  });

  it("deve chamar create quando não tem id", () => {
    serviceSpy.getAll.and.returnValue(of([]));
    serviceSpy.create.and.returnValue(of({ id: 1 } as any));

    fixture.detectChanges();

    component.form.patchValue({
      id: null,
      placa: "AAA-0000",
      chassi: "CH",
      renavam: "RE",
      modelo: "M",
      marca: "B",
      ano: 2020,
    });

    component.submit();

    expect(serviceSpy.create).toHaveBeenCalled();
    expect(serviceSpy.update).not.toHaveBeenCalled();
  });

  it('deve chamar update quando tem id', () => {
    serviceSpy.getAll.and.returnValue(of([]));
    serviceSpy.update.and.returnValue(of({ id: 10 } as any));

    fixture.detectChanges();

    component.form.patchValue({
      id: 10,
      placa: 'AAA-0000',
      chassi: 'CH',
      renavam: 'RE',
      modelo: 'M',
      marca: 'B',
      ano: 2020
    });

    component.submit();

    expect(serviceSpy.update).toHaveBeenCalled();
  });
});
