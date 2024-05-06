import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { ChatAComponent } from './components/chat-a/chat-a.component';
import { ChatBComponent } from './components/chat-b/chat-b.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'chat-a',
    component: ChatAComponent,
  },
  {
    path: 'chat-b',
    component: ChatBComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
