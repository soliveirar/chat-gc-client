import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Metadata } from '../shared/model/metadata';
import { RestApiService } from '../services/rest-api.service';

@Component({
  selector: 'app-rag-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [DatePipe],
  templateUrl: './rag-form.html',
  styleUrl: './rag-form.css'
})
export class RagForm {

  /*metadata: Metadata = {
    origin : '',
    category: '',
    confidenciality: '',
    author: '',
    source: '',
    reference: '',
    publicationDate: '',
    lastUpdated: ''
  };*/

  metadataForm: FormGroup;
  selectedFile?: File;

  constructor(private fb: FormBuilder,
    private api: RestApiService,
    private datePipe: DatePipe) {

    this.metadataForm = this.fb.group({
      origin: ['', Validators.required],
      category: ['', Validators.required],
      confidenciality: ['', Validators.required],
      author: ['', Validators.required],
      source: ['', Validators.required],
      reference: [''],
      publicationDate: ['', Validators.required],
      lastUpdated: ['', Validators.required]
    });
  }


  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file && file.type === 'application/pdf') {
      this.selectedFile = file;
    } else {
      this.selectedFile = undefined;
      alert('Por favor, selecciona un archivo PDF válido.');
    }
  }

  onSubmit(): void {
    if (this.metadataForm.valid && this.selectedFile) {
      const metadata: Metadata = this.metadataForm.value;
      const formData = new FormData();

      //Transfrormacion formato de fechas
      metadata.publicationDate = this.datePipe.transform(metadata.publicationDate, 'dd/MM/yyyy') || '';
      metadata.lastUpdated = this.datePipe.transform(metadata.lastUpdated, 'dd/MM/yyyy') || '';

      formData.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
      formData.append('file', this.selectedFile);

      //Envio de peticion
      console.log('Formulario enviado:', metadata, this.selectedFile.name);

      this.api.uplodadDocument(formData).subscribe(response => {
        console.log(response);
      });
    }
  }


}
