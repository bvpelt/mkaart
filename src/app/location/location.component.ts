import { Component, OnInit } from "@angular/core";
import { PdoklocatieService } from "../shared/services/pdoklocatie.service";
import { SuggestResponse } from "../shared/model/suggestresponse.model";
import { LookupGemeente } from "../shared/model/lookupgemeente.model";
import { LookupWoonplaats } from "../shared/model/lookupwoonplaats.model";
import { LookupWeg } from "../shared/model/lookupweg.model";
import { LookupPostCode } from "../shared/model/lookuppostcode.model";
import { LookupAdres } from "../shared/model/lookupadres.model";

import Point from "ol/geom/Point";
import * as olCoordinate from "ol/coordinate";
import { toStringXY } from "ol/coordinate";
import { LocationExchange } from "../shared/services/locationexchange";
import { SliderResult } from "../shared/model/sliderresult";

@Component({
  selector: "app-location",
  templateUrl: "./location.component.html",
  styleUrls: ["./location.component.css"],
})
export class LocationComponent implements OnInit {
  location: string;
  currentLocation: Point;

  private static maxRows = 15;
  private static l_adreses: string[] = new Array(LocationComponent.maxRows);
  private static l_index = 0;
  l_new: string = "";
  adresses: string[] = [];
  adresses_ids: string[];
  names: string[];
  selected_adres: string;
  selected_id: string;
  rd_x: number;
  rd_y: number;

  constructor(
    private pdoklocatieService: PdoklocatieService,
    private locationExchange: LocationExchange
  ) {
    this.pdoklocatieService.setMaxRows(LocationComponent.maxRows);
    for (let i = 1; i <= LocationComponent.maxRows; i++) {
      LocationComponent.l_adreses[i] = "";
    }
  }

  ngOnInit(): void {
    this.locationExchange.currentLocation.subscribe(
      (point) => (this.currentLocation = point)
    );
  }

  public onKeydown(value: string) {
    this.l_new = value;
    this.pdoklocatieService.getSuggest(value).subscribe((suggest) => {
      let data: string[] = Object.keys(suggest.highlighting);
      let sug: string[] = Array(LocationComponent.maxRows);
      let ids: string[] = Array(LocationComponent.maxRows);
      let names: string[] = Array(LocationComponent.maxRows);
      let len = data.length;
      for (let i = 0; i < len; i++) {
        sug[i] = suggest.highlighting[data[i]].suggest;
        ids[i] = data[i];
        names[i] = suggest.response.docs[i].weergavenaam;
      }
      console.log("suggestions: " + sug);
      this.adresses = sug;
      this.adresses_ids = ids;
      this.names = names;
    });
  }

  /*
 When adres is selected,
 find information on selected adres
  */
  onSelect(adres: string, index: number): void {
    console.log(
      "selected element i: " +
        index +
        " adres: " +
        adres +
        " id: " +
        this.adresses_ids[index]
    );
    this.selected_adres = adres;
    this.selected_id = this.adresses_ids[index];
    this.pdoklocatieService.getLookup(this.selected_id).subscribe((lookup) => {
      console.log("Received: " + lookup);
      const result: SuggestResponse = lookup.response as SuggestResponse;
      if (result.numFound == 1) {
        // resultaat gevonden
        console.log("Type of result 00: " + typeof result.docs[0]);
        const doc:
          | LookupGemeente
          | LookupWoonplaats
          | LookupWeg
          | LookupPostCode
          | LookupAdres = result.docs[0] as
          | LookupGemeente
          | LookupWoonplaats
          | LookupWeg
          | LookupPostCode
          | LookupAdres;
        console.log("Type of result 01: " + doc.type);
        const rdstring = doc.centroide_rd; // doc.centroide_rd;
        console.log("Center coord: " + rdstring);

        if (rdstring != null) {
          const NUMERIC_REGEXP = /[-]{0,1}[\d]*[.]{0,1}[\d]+/g;
          const coords: string[] = rdstring.match(NUMERIC_REGEXP);
          if (coords != null) {
            console.log("coords: " + coords);
            this.rd_x = parseFloat(coords[0]);
            this.rd_y = parseFloat(coords[1]);
            console.log("x: " + this.rd_x + " y: " + this.rd_y);
            const coord: olCoordinate = [this.rd_x, this.rd_y];
            const point: Point = new Point(coord, "XY");

            this.newPoint(point);
            console.log(
              "Location - send point: " + toStringXY(point.getCoordinates(), 6)
            );
            this.adresses = [];
            this.adresses_ids = [];
            this.location = this.names[index];
          }
        }
      }
    });
  }

  newPoint(point: Point): void {
    this.locationExchange.changeLocation(point);
  }
}
