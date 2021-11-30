import { Injectable } from "@angular/core";
import {
	HttpClient,
	HttpHeaders,
	HttpErrorResponse,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import endpoint from "./config";
import { catchError } from "rxjs/internal/operators";
import { Router } from "@angular/router";
@Injectable({
	providedIn: "root",
})
export class AnimeService {
	constructor(private http: HttpClient, private router: Router) {}
	httpOptions = {
		headers: new HttpHeaders({
			Authorization: "",
		}),
	};

	private handleError(error: HttpErrorResponse): any {
		if (error.error instanceof ErrorEvent) {
			console.error("An error occurred:", error.error.message);
		} else {
			console.error(
				`Backend returned code ${error.status}, ` + `body was: ${error.error}`
			);
		}
		this.router.navigate(["500"]);
	}
	getAllAnime(
		page: number,
		perPage: number,
		sortFields: any,
		sortDirections: any,
		animeName: string,
		genres: any,
		status: number,
		format: number,
		sessionPeriod: number,
		sessionYear: number,
		nsfw: boolean
	): Observable<any> {
		let token = localStorage.getItem("oauthToken");
		this.httpOptions.headers = this.httpOptions.headers.set(
			"Authorization",
			"Bearer " + token
		);
		let url = `${endpoint}/v1/anime?`;

		if (page) url += `&page=${page}`;
		if (perPage) url += `&per_page=${perPage}`;
		if (sortFields.length) url += `&sort_fields=${sortFields.join(",")}`;
		if (sortDirections.length)
			url += `&sort_directions=${sortDirections.join(",")}`;
		if (animeName) url += `&title=${encodeURIComponent(animeName)}`;
		if (genres.length) {
			let genreList: any[] = [];
			genres.map((genre: any) => {
				genreList.push(encodeURIComponent(genre.name));
			});
			url += `&genres=${genreList.join(",")}`;
		}
		if (format != -1) url += `&format=${format}`;
		if (status != -1) url += `&status=${status}`;
		if (sessionPeriod != -1) url += `&season=${sessionPeriod}`;
		if (sessionYear) url += `&year=${sessionYear}`;
		if (nsfw != undefined) url += `&nsfw=${nsfw}`;
		console.log(url);

		return this.http.get(url, this.httpOptions).pipe(
			map((res) => {
				return res;
			})
		);
	}

	getAnime(id: number): Observable<any> {
		let token = localStorage.getItem("oauthToken");
		this.httpOptions.headers = this.httpOptions.headers.set(
			"Authorization",
			"Bearer " + token
		);
		return this.http.get(`${endpoint}/v1/anime/${id}`, this.httpOptions).pipe(
			map((res) => {
				return res;
			}),
			catchError(this.handleError)
		);
	}
	getEpisodes(id: number): Observable<any> {
		let token = localStorage.getItem("oauthToken");
		this.httpOptions.headers = this.httpOptions.headers.set(
			"Authorization",
			"Bearer " + token
		);
		console.log(`${endpoint}/v1/episode?anime_id=${id}&locale=en`);

		return this.http
			.get(`${endpoint}/v1/episode?anime_id=${id}&locale=en`, this.httpOptions)
			.pipe(
				map((res) => {
					return res;
				})
			);
	}
}
