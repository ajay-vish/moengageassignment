import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DomSanitizer } from "@angular/platform-browser";
import { AnimeService } from "src/app/services/anime.service";
export interface DialogData {
	id: number;
}
@Component({
	selector: "app-view-anime",
	templateUrl: "./view-anime.component.html",
	styleUrls: ["./view-anime.component.css"],
})
export class ViewAnimeComponent implements OnInit {
	constructor(
		public dialogRef: MatDialogRef<ViewAnimeComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData,
		private animeService: AnimeService,
		private _sanizer: DomSanitizer
	) {}
	anime: any;
	episodes: any;
	isLoading = true;
	ngOnInit(): void {
		this.getAnime(this.data.id);
	}

	getAnime(id: number) {
		this.animeService.getAnime(id).subscribe((res: any) => {
			console.log(res);
			this.anime = res.data;
			this.isLoading = false;
		});
	}
	getEpisodes(id: number) {
		this.animeService.getEpisodes(11).subscribe((res: any) => {
			console.log("Episode",res);
			this.episodes = res.data;
			this.isLoading = false;
		});
	}
}
