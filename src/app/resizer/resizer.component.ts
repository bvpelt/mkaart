import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-resizer",
  templateUrl: "./resizer.component.html",
  styleUrls: ["./resizer.component.css"],
})
export class ResizerComponent implements OnInit {
  screenWidth: number;
  windowWidth: number;
  windowHeight: number;
  minLeft: 40; // px

  left: any;
  leftWidth: number;
  right: any;
  rightWidth: number;

  constructor() {}

  ngOnInit(): void {
    this.screenWidth = screen.width;
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    console.log(
      "screen width: " +
        this.screenWidth +
        " window widthxheight " +
        this.windowWidth +
        " x " +
        this.windowHeight
    );

    this.left = document.querySelector(".splitleft");
    this.leftWidth = parseFloat(
      getComputedStyle(this.left, null)
        .getPropertyValue("width")
        .replace("px", "")
    );
    this.right = document.querySelector(".splitright");
    this.rightWidth = parseFloat(
      getComputedStyle(this.right, null)
        .getPropertyValue("width")
        .replace("px", "")
    );
    console.log(
      "oninit - leftWidth: " +
        this.leftWidth +
        " rightWidth: " +
        this.rightWidth
    );
    this.myResize(".resizer");
  }

  getElement(div) {
    return document.querySelector(div);
  }

  private myResize(div) {
    const element = document.querySelector(div);
    let cssclas = ".splitleft";
    const left = this.getElement(cssclas);
    cssclas = ".splitright";
    const right = this.getElement(cssclas);

    let original_width = 0;
    let original_x = 0;
    let original_mouse_x = 0;
    let newLeftWidth = 0;
    let newRightWidth = 0;

    let leftWidth = parseFloat(
      getComputedStyle(this.left, null)
        .getPropertyValue("width")
        .replace("px", "")
    );

    let rightWidth = parseFloat(
      getComputedStyle(this.right, null)
        .getPropertyValue("width")
        .replace("px", "")
    );

    original_width = parseFloat(
      getComputedStyle(element, null)
        .getPropertyValue("width")
        .replace("px", "")
    );
    console.log("original width: " + original_width);

    element.addEventListener("mousedown", function (e: MouseEvent) {
      console.log("Start mousehandler mousedown");
      e.preventDefault();
      original_width = parseFloat(
        getComputedStyle(element, null)
          .getPropertyValue("width")
          .replace("px", "")
      );

      original_x = element.getBoundingClientRect().left;
      original_mouse_x = e.pageX;

      console.log(
        "mousedown - original width: " +
          original_width +
          " original_x: " +
          original_x +
          " original_mouse_x: " +
          original_mouse_x
      );
      window.addEventListener("mousemove", resize);
      window.addEventListener("mouseup", stopResize);
    });

    function resize(e) {
      console.log("Start mousehandler resize");
      const width = original_width + (e.pageX - original_mouse_x);
      console.log(
        "resize - width: " +
          width +
          " original width: " +
          original_width +
          " e.pageX: " +
          e.pageX +
          " original_mouse_x: " +
          original_mouse_x
      );

      newLeftWidth = leftWidth - (original_mouse_x - e.pageX);
      newRightWidth = rightWidth + (original_mouse_x - e.pageX);

      console.log(
        "resize - newLeftWidth: " +
          newLeftWidth +
          " newRightWidth: " +
          newRightWidth
      );

      if (newLeftWidth > this.minLeft) {
        left.style.width = newLeftWidth + "px";
        right.style.width = newRightWidth + "px";
      }
    }

    function stopResize() {
      console.log("Stop mousehandler resize");
      window.removeEventListener("mousemove", resize);
    }
  }
}
