import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { ListagemComponent } from './listagem.component';
import { VeiculoService } from '../../services/veiculo.service';
import { IVeiculo } from '../../models/veiculo.model';
import { RouterTestingModule } from '@angular/router/testing';

describe('ListagemComponent', () => {
  let component: ListagemComponent;
  let fixture: ComponentFixture<ListagemComponent>;
  let serviceSpy: jasmine.SpyObj<VeiculoService>;

  beforeEach(async () => {
    serviceSpy = jasmine.createSpyObj<VeiculoService>('veiculoService', ['getAll', 'create', 'update', 'delete']);

    await TestBed.configureTestingModule({
      declarations: [ListagemComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [{ provide: VeiculoService, useValue: serviceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(ListagemComponent);
    component = fixture.componentInstance;
  });

  it('deve carregar lista no init', () => {
    const mock: IVeiculo[] = [{ id: 1, placa: 'ABC-1234', chassi: 'C', renavam: 'R', modelo: 'Civic', marca: 'Honda', ano: 2021 }];
    serviceSpy.getAll.and.returnValue(of(mock));

    fixture.detectChanges(); // ngOnInit

    expect(serviceSpy.getAll).toHaveBeenCalled();
    expect(component.veiculos.length).toBe(1);
  });

  it('deve chamar delete ao remover', () => {
    serviceSpy.getAll.and.returnValue(of([]));
    serviceSpy.delete.and.returnValue(of(void 0));

    fixture.detectChanges();

    component.remove(5);

    expect(serviceSpy.delete).toHaveBeenCalledWith(5);
  });
});
