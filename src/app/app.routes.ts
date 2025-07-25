import { Routes } from '@angular/router';
import { Home } from './home/home';
import { RagForm } from './rag-form/rag-form';

export const routes: Routes = [{
    path: '',
    component: Home,
  },
  {
    path: 'upload',
    component: RagForm,
  }
];
