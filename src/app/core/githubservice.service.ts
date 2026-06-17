import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Githubrepo } from '../models/githuhrepo';

@Injectable({
  providedIn: 'root'
})
export class GithubserviceService {

  private username: string = "Ranjan-Prasad-rp"


  constructor(private http: HttpClient) { }


  githubRepos() {
    return this.http.get<Githubrepo[]>(`https://api.github.com/users/${this.username}/repos?sort=updated&per_page=10`)
  }


}
