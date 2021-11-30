import { Component, OnInit } from "@angular/core";
import { AnimeService } from "src/app/services/anime.service";
import { PageEvent } from "@angular/material/paginator";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { ViewAnimeComponent } from "../view-anime/view-anime.component";

export interface Genres {
	name: string;
}

@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
	selectable = true;
	removable = true;
	addOnBlur = true;
	selectedValue: string = "";
	readonly separatorKeysCodes = [ENTER, COMMA] as const;
	genres: Genres[] = [];
	allGenres: Genres[] = [];

	remove(genre: Genres): void {
		const index = this.genres.indexOf(genre);

		if (index >= 0) {
			this.genres.splice(index, 1);
		}
	}
	addGenreToFilter(genre: any) {
		let genreObj = { name: genre };
		console.log(this.genres, this.genres.includes(genreObj));

		if (!this.genres.includes(genreObj)) this.genres.push(genreObj);
	}
	constructor(
		private anime: AnimeService,
		private _snackBar: MatSnackBar,
		public dialog: MatDialog
	) {}

	animeList: any;
	isLoading = true;
	length = 100;
	pageSize = 5;
	pageIndex = 1;
	pageSizeOptions: number[] = [5, 10, 25, 100];
	sortFields :any[] = [];
	sortDirection :any[] = [];
	message = "";
	search = "";
	isSearching: boolean = false;
	selectStatus = [
		{ name: "FINISHED", value: 0 },
		{ name: "RELEASING", value: 1 },
		{ name: "NOT_YET_RELEASED", value: 2 },
		{ name: "CANCELLED", value: 3 },
	];
	selectFormat = [
		{ name: "TV", value: 0 },
		{ name: "TV_SHORT", value: 1 },
		{ name: "MOVIE", value: 2 },
		{ name: "SPECIAL", value: 3 },
		{ name: "OVA", value: 4 },
		{ name: "ONA", value: 5 },
		{ name: "MUSIC", value: 6 },
	];
	selectSession = [
		{ name: "WINTER", value: 0 },
		{ name: "SPRING", value: 1 },
		{ name: "SUMMER", value: 2 },
		{ name: "FALL", value: 3 },
		{ name: "UNKNOWN", value: 4 },
	];
	status: number = -1;
	format: number = -1;
	sessionPeriod: number = -1;
	sessionYear: number = 0;
	nsfw: boolean = true;
	handlePageEvent(event: PageEvent) {
		this.isLoading = true;
		this.length = event.length;
		this.pageSize = event.pageSize;
		this.pageIndex = event.pageIndex + 1;
		this.getAnimes();
	}

	ngOnInit(): void {
		let genreList = [
			"Action",
			"Adventure",
			"Comedy",
			"Drama",
			"Fantasy",
			"Pirates",
			"Ensemble Cast",
			"Shounen",
			"Super Power",
			"Conspiracy",
			"Male Protagonist",
			"Ships",
			"Badminton",
			"Airsoft",
			"Time Skip",
			"War",
			"Politics",
			"Lost Civilization",
			"Swordplay",
			"Henshin",
			"Real Robot",
			"Shapeshifting",
			"Animals",
			"Primarily Adult Cast",
			"Cult",
			"Super Robot",
			"Anachronism",
			"Skeleton",
			"Gender Bending",
			"Anti-Hero",
			"Espionage",
			"Ninja",
			"Cyborg",
			"Primarily Male Cast",
			"Guns",
			"Female Harem",
			"Kuudere",
			"Drugs",
			"Robots",
			"Mermaid",
			"Body Swapping",
			"Battle Royale",
			"Zombie",
			"Time Manipulation",
			"Dinosaurs",
			"Transgender",
			"Assassins",
			"Tanned Skin",
			"Adoption",
			"Asexual",
		];
		genreList.map((genre) => {
			this.allGenres.push({
				name: genre,
			});
		});
		this.getAnimes();
	}

	getAnimes(): void {
		this.anime
			.getAllAnime(
				this.pageIndex,
				this.pageSize,
				this.sortFields,
				this.sortDirection,
				this.search,
				this.genres,
				this.status,
				this.format,
				this.sessionPeriod,
				this.sessionYear,
				this.nsfw
			)
			.subscribe((res) => {
				console.log(res.data);
				this.length = res.data.count;
				this.message = res.message;
				this.animeList = res.data.documents;
				this.isLoading = false;
				this._snackBar.open(this.message, "close", {
					duration: 3000
				});
			});
	}

	openAnime(id: any) {
		const dialogRef = this.dialog.open(ViewAnimeComponent, {
			width: "80vw",
			height: "80vh",
			data: { id: id },
		});
	}
	searchFor(search: string) {
		this.isLoading = true;
		this.getAnimes();
	}

	applyFilters(){
		this.isLoading = true;
		this.getAnimes();
	}
	sortData(e: any){
		if(this.sortFields.includes(e.active)){
			let i = this.sortFields.indexOf(e.active);
			this.sortDirection[i] = e.direction == 'desc' ? -1 : 1
			if(e.direction == ''){
				if (i > -1) {
					this.sortFields.splice(i, 1);
					this.sortDirection.splice(i, 1);
				}
			}
		}else{
			this.sortFields.push(e.active);
			this.sortDirection.push(e.direction == 'desc' ? -1 : 1)
		}
		this.isLoading = true;
		this.getAnimes();
	}
}
