import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
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
		private _sanizer: DomSanitizer,
		private _snackBar: MatSnackBar
	) {}
	comment: string = "";
	currentRate: any;
	comments: any = '';
	anime: any;
	episodes: any;
	isLoading = true;
	ngOnInit(): void {
		this.getAnime(this.data.id);
		this.getEpisodes(this.data.id);
		this.comments = localStorage.getItem(this.data.id.toString()) ? localStorage.getItem(this.data.id.toString()) : '';
	}

	getAnime(id: number) {
		this.animeService.getAnime(id).subscribe((res: any) => {
			console.log(res);
			this.anime = res.data;
			this.isLoading = false;
		});
	}
	getEpisodes(id: number) {
		this.animeService.getEpisodes(id).subscribe((res: any) => {
			console.log("Episode", res);
			this.episodes = res.data;
		});
	}
	
	addComment() {
		if (this.comment.length > 0) {
			localStorage.setItem(this.data.id.toString(), this.comment);
			this._snackBar.open("Comment added successfuly", "close", {
				duration: 3000,
			});
		} else {
			this._snackBar.open("Comment cannot be empty", "close", {
				duration: 3000,
			});
		}
		this.comments = localStorage.getItem(this.data.id.toString()) ? localStorage.getItem(this.data.id.toString()) : '';

	}
}
