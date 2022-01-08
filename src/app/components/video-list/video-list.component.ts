import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from "@angular/platform-browser";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class VideoListComponent implements OnInit {
  safeUrl: SafeResourceUrl;
  results$: Observable<Array<any>>;
  videoURL = "https://www.youtube.com/embed/LFoz8ZJWmPs";
  slideConfig = {
    "slidesToShow": 8, 
    "slidesToScroll": 4,
    "arrow": true,
  };
 
  constructor( private sanitizer: DomSanitizer,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.results$ = this.http.get(
      "https://www.googleapis.com/youtube/v3/search?part=snippet&q=robocop&topicId=%2Fm%2F02vxn&key=AIzaSyBBjrR0beUW1vVg6p8YsCj6AtRF4i7UACY&part=snippet&type=video&maxResults=10"
    ).pipe(
      map(res => res.items),
      map((items: Array<any>) => {
        return items.map(item => ({
          title: item.snippet.title,
          vidoeUrl: `https://www.youtube.com/embed/${item.id.videoId}`,
        }))
      })
    );
  }

}
