import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormArray,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-cartelera-reserva',
  templateUrl: './cartelera-reserva.component.html',
  styleUrls: ['./cartelera-reserva.component.css'],
})
export class CarteleraReservaComponent implements OnInit {
  cartelera: any;
  tiquetesList: any;
  productosList: any;
  error: any;
  formCreate: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();

  tiquetesSeleccionadosList = [];
  productosSeleccionadosList = [];

  listTiquetesSeleccionados = [];
  listCantidadesSeleccionadas = [];

  listProductosSeleccionados = [];
  listCantidadProductosSeleccionados = [];

  subTotalTiquete = 0;
  totalTiquete = 0;
  subTotalProducto = 0;
  totalProducto = 0;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private gService: GenericService,
    private notificacion: NotificacionService
  ) {
    const idCartelera = +this.route.snapshot.paramMap.get('id');
    this.getCartelera(idCartelera);
  }

  ngOnInit(): void {
    localStorage.removeItem('tiquetes');
    localStorage.removeItem('productos');
  }

  getCartelera(id: number) {
    this.gService.get('carteleras/id', id).subscribe(
      (respuesta: any) => {
        this.cartelera = respuesta;
        this.reactiveForm();
      },
      (error) => {
        this.error = error;
        this.notificacion.msjValidacion(this.error);
      }
    );
  }

  getProductos() {
    this.gService
      .list('productos/')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          console.log(data);
          this.productosList = data;
        },
        (error: any) => {
          this.notificacion.mensaje(error.message, error.name, 'error');
        }
      );
  }

  getDisponibles(){
    
  }

  reactiveForm() {
    this.getProductos();
    if (this.cartelera) {
      this.formCreate = this.formBuilder.group({
        cartelera_id: [this.cartelera.id, [Validators.required]],
        user_id: ['', [Validators.required]],
        fechaHoraVenta: [this.cartelera.fechaHora, [Validators.required]],
        hora: [this.cartelera.hora, [Validators.required]],

        subtotal: ['', [Validators.required]],
        total: ['', [Validators.required]],
        impuesto: [0.13, [Validators.required]],

        cant: '',
        tique: '',
        cantP: '',
        prod: '',

        producto_id: this.formBuilder.array([]),
        cantidadp: this.formBuilder.array([]),
        tiquete_id: this.formBuilder.array([]),
        cantidad: this.formBuilder.array([]),

        estado: [true, [Validators.required]],
      });
    }
  }

  get cantidades(): FormArray {
    return this.formCreate.get('cantidad') as FormArray;
  }
  get tiquete_id(): FormArray {
    return this.formCreate.get('tiquete_id') as FormArray;
  }

  get cantidadesP(): FormArray {
    return this.formCreate.get('cantidadp') as FormArray;
  }
  get producto_id(): FormArray {
    return this.formCreate.get('producto_id') as FormArray;
  }

  public errorHandling = (control: string, error: string) => {
    return this.formCreate.controls[control].hasError(error);
  };

  addTiquete() {
    let idTiquete = this.formCreate.get('tique').value;
    let cant = this.formCreate.get('cant').value;

    let misTiquetes = [];
    if (localStorage.getItem('tiquetes')) {
      misTiquetes = JSON.parse(localStorage.getItem('tiquetes'));
    }

    if (misTiquetes.length == 0) {
      misTiquetes.push({ idTiquete, cant });
      localStorage.setItem('tiquetes', JSON.stringify(misTiquetes));
      this.sumarTiquete(idTiquete, cant);
    } else if (!misTiquetes.find((x) => x.idTiquete == idTiquete)) {
      misTiquetes.push({ idTiquete, cant });
      localStorage.setItem('tiquetes', JSON.stringify(misTiquetes));
      this.sumarTiquete(idTiquete, cant);
    }
    this.cargarTablaTiquetes();
  }

  addProducto() {
    let idProducto = this.formCreate.get('prod').value;
    let cantP = this.formCreate.get('cantP').value;

    let misProductos = [];
    if (localStorage.getItem('productos')) {
      misProductos = JSON.parse(localStorage.getItem('productos'));
    }

    if (misProductos.length == 0) {
      misProductos.push({ idProducto, cantP });
      localStorage.setItem('productos', JSON.stringify(misProductos));
      this.sumarProducto(idProducto, cantP);
    } else if (!misProductos.find((x) => x.idTiquete == idProducto)) {
      misProductos.push({ idProducto, cantP });
      localStorage.setItem('productos', JSON.stringify(misProductos));
      this.sumarProducto(idProducto, cantP);
    }
    this.cargarTablaProductos();
  }

  sumarTiquete(idtiquete: number, cantidad: number) {
    let precio = this.cartelera.tiquetes.find((x) => x.id == idtiquete).precio;
    this.subTotalTiquete += precio * cantidad;
    this.totalTiquete = this.subTotalTiquete + this.subTotalTiquete * 0.13;
  }

  sumarProducto(idProd: number, cantidad: number) {
    let precio = this.productosList.find((x) => x.id == idProd).precio;
    this.subTotalProducto += precio * cantidad;
    this.totalProducto = this.subTotalProducto + this.subTotalProducto * 0.13;
  }

  restarTiquete(idTiq: number, cantidad: number) {
    let precio = this.cartelera.tiquetes.find((x) => x.id == idTiq).precio;
    this.subTotalTiquete -= precio * cantidad;
    this.totalTiquete = this.subTotalTiquete + this.subTotalTiquete * 0.13;
  }

  restarProducto(idProd: number, cantidad: number) {
    let precio = this.productosList.find((x) => x.id == idProd).precio;
    this.subTotalProducto -= precio * cantidad;
    this.totalProducto = this.subTotalProducto + this.subTotalProducto * 0.13;
  }

  deleteTiquete(idTiquete: number) {
    let mistiquetes = [];
    if (localStorage.getItem('tiquetes')) {
      mistiquetes = JSON.parse(localStorage.getItem('tiquetes'));
    }

    if (mistiquetes != null && mistiquetes.length > 0) {
      let cantidad = mistiquetes.find((x) => x.idTiquete == idTiquete).cant;
      this.restarTiquete(idTiquete, cantidad);

      if (mistiquetes.length > 1) {
        mistiquetes = mistiquetes.filter((x) => x.idTiquete != idTiquete);
        localStorage.setItem('tiquetes', JSON.stringify(mistiquetes));
      } else {
        localStorage.removeItem('tiquetes');
      }
      this.cargarTablaTiquetes();
    }
  }

  deleteProducto(idProducto: number) {
    let misProductos = [];
    if (localStorage.getItem('productos')) {
      misProductos = JSON.parse(localStorage.getItem('productos'));
    }

    if (misProductos != null && misProductos.length > 0) {
      let cantidad = misProductos.find((x) => x.idProducto == idProducto).cantP;
      this.restarProducto(idProducto, cantidad);
      if (misProductos.length > 1) {
        misProductos = misProductos.filter((x) => x.idProducto != idProducto);
        localStorage.setItem('productos', JSON.stringify(misProductos));
      } else {
        localStorage.removeItem('productos');
      }
      this.cargarTablaProductos();
    }
  }

  cargarTablaTiquetes() {
    let misTiquetes = JSON.parse(localStorage.getItem('tiquetes'));

    if (misTiquetes != null && misTiquetes.length > 0) {
      this.tiquetesSeleccionadosList = JSON.parse(
        localStorage.getItem('tiquetes')
      );
    } else {
      this.tiquetesSeleccionadosList = [];
    }
  }

  cargarTablaProductos() {
    let miObjeto = [];
    miObjeto = JSON.parse(localStorage.getItem('productos'));
    if (miObjeto != null && miObjeto.length > 0) {
      this.productosSeleccionadosList = JSON.parse(
        localStorage.getItem('productos')
      );
    } else {
      this.productosSeleccionadosList = [];
    }
  }

  asignarDatos() {
    let misTiquetes = JSON.parse(localStorage.getItem('tiquetes'));
    let misProductos = JSON.parse(localStorage.getItem('productos'));

    if (misTiquetes != null && misTiquetes.length > 0) {
      misTiquetes.forEach((x) => {
        (this.formCreate.controls.tiquete_id as FormArray).push(
          new FormControl(parseInt(x.idTiquete))
        );
        (this.formCreate.controls.cantidad as FormArray).push(
          new FormControl(parseInt(x.cant))
        );
      });
    }

    if (misProductos != null && misProductos.length > 0) {
      misProductos.forEach((x) => {
        (this.formCreate.controls.producto_id as FormArray).push(
          new FormControl(parseInt(x.idProducto))
        );
        (this.formCreate.controls.cantidadp as FormArray).push(
          new FormControl(parseInt(x.cantP))
        );
      });
    }

    this.formCreate.controls.fechaHoraVenta.setValue(
      formatDate(Date.now(), 'yyyy-MM-dd', 'en-US', '+0530')
    );
    this.formCreate.controls.hora.setValue(
      formatDate(Date.now(), 'hh:MM:ss', 'en-US', '+0530')
    );

    this.formCreate.controls.user_id.setValue(
      this.authService.currentUserValue.user.id
    );

    this.formCreate.controls.subtotal.setValue(
      this.subTotalTiquete + this.subTotalProducto
    );

    this.formCreate.controls.total.setValue(
      this.totalTiquete + this.totalProducto
    );
  }

  submitForm() {
    this.asignarDatos();
    console.log(this.formCreate.value);
    this.gService.create('encabezados', this.formCreate.value).subscribe(
      (respuesta: any) => {
        this.notificacion.mensaje('Reservacion Exitosa', '', 'success');
        this.router.navigate(['/']);
      },
      (error) => {
        this.error = error;
        this.notificacion.msjValidacion(this.error);
      }
    );
  }

  parseValueFloat(value) {
    return parseFloat(value);
  }
}
