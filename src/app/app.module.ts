import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {UserService} from "./services/user/user.service";
import { MainComponent } from './pages/main/main.component';
import {ArticleService} from "./services/article/article.service";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import { ArticleFeedComponent } from './components/articles/article-feed/article-feed.component';
import { ArticleListItemComponent } from './components/articles/article-list-item/article-list-item.component';
import {MatListModule} from "@angular/material/list";
import { ArticleDetailsComponent } from './pages/article-details/article-details.component';
import { CommentItemComponent } from './components/comment/comment-item/comment-item.component';
import { CommentFormComponent } from './components/comment/comment-form/comment-form.component';
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { AuthComponent } from './pages/auth/auth.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthInterceptor} from "./interceptor/authconfig.interceptor";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import { ArticleCreationComponent } from './pages/article-creation/article-creation.component';
import { ArticleFormComponent } from './components/articles/article-form/article-form.component';
import {MatPaginatorModule} from "@angular/material/paginator";

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ArticleFeedComponent,
    ArticleListItemComponent,
    ArticleDetailsComponent,
    CommentItemComponent,
    CommentFormComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    ArticleCreationComponent,
    ArticleFormComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatListModule,
        MatCardModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        InfiniteScrollModule,
        MatPaginatorModule
    ],
  providers: [
    UserService,
    ArticleService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
