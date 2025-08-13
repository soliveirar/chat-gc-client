import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Metadata } from '../shared/model/metadata';
import { RestApiService } from '../services/rest-api.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-rag-form',
  imports: [CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    MatProgressSpinnerModule],
  providers: [DatePipe],
  templateUrl: './rag-form.html',
  styleUrl: './rag-form.css'
})
export class RagForm {

  metadataForm: FormGroup;
  selectedFile?: File;
  message:string;
  error:boolean;
  spinner:boolean;

  constructor(private fb: FormBuilder,
    private api: RestApiService,
    private datePipe: DatePipe) {

    this.metadataForm = this.initForm();
    this.message = '';
    this.error = false;
    this.spinner = false;
  }

  initForm(): FormGroup{
      const metadataForm = this.fb.group({
      origin: ['', Validators.required],
      category: ['', Validators.required],
      confidenciality: ['', Validators.required],
      author: ['', Validators.required],
      source: ['', Validators.required],
      reference: [''],
      publicationDate: ['', Validators.required],
      lastUpdated: ['', Validators.required]
    });
    this.selectedFile=undefined;

    return metadataForm;
  }

  onFileSelected(event: Event): void {
    this.message = '';
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file && file.type === 'application/pdf') {
      this.selectedFile = file;
    } else {
      this.selectedFile = undefined;
      alert('Por favor, selecciona un archivo PDF válido.');
    }
  }

  onSubmit(): void {
    this.spinner = true;
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
        //Mensaje error o aviso
        this.message=response.message;
        if(response.state.code=="0000"){
          console.log("init form");
            //Init formulario
            this.metadataForm=this.initForm();
        }else{
          this.error=true;
        }
        this.spinner = false;
      });
    }
  }


}
