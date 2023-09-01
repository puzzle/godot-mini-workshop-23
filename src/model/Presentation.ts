import "css-reset-and-normalize";
import "github-markdown-css";
import "highlight.js/scss/night-owl.scss";
import "../styles/presentomatic.scss";
import { EventEmitter } from "events";
import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import * as d3 from "d3";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("json", json);

interface Slide {
  page: number;
  isTitleSlide: boolean;
  title: string;
  html: string;
}

export default class Presentation extends EventEmitter {
  private slides: Slide[];

  private currentSlide: Slide;

  private slideSelection: d3.Selection<HTMLDivElement, Slide, any, any>;

  constructor(html: string) {
    super();
    this.slides = Presentation.htmlToSlides(html);
    console.log(this.slides);
    this.initControls();
    const start = parseInt(window.location.hash.replace("#", ""), 10);
    this.showSlide(Number.isNaN(start) ? 0 : start);
    d3.select("nav")
      .on("mouseenter", () => Presentation.fadeInNav())
      .on("mouseleave", () => {
        Presentation.fadeOutNav();
      });
  }

  updateNav() {
    d3.select("nav")
      .selectAll<HTMLDivElement, any>("div")
      .data(this.slides, (d) => d.index)
      .join((enter) =>
        enter
          .append("div")
          .classed("title-slide", (d) => d.isTitleSlide)
          .text((d) => d.page + 1)
          .on("click", (ev, d) => this.showSlide(d.page))
      )
      .classed("selected", (d) => this.currentSlide === d);
    Presentation.fadeInNav();
    Presentation.fadeOutNav();
  }

  static fadeInNav() {
    d3.select("nav")
      .selectAll("div")
      .interrupt("fadeout")
      .transition()
      .style("transform", undefined)
      .style("opacity", 1);
  }

  static fadeOutNav() {
    d3.select("nav")
      .selectAll("div")
      .interrupt("fadeout")
      .transition("fadeout")
      .delay(3000)
      .style("transform", "scale(0.1)rotate(-90deg)")
      .style("opacity", 0);
  }

  showSlide(requestedIndex: number) {
    const index = Math.max(0, Math.min(requestedIndex, this.slides.length - 1));
    window.location.hash = `${index}`;
    if (this.currentSlide === this.slides[index]) return;
    this.slideSelection = d3
      .select("main")
      .selectAll<HTMLDivElement, any>("main > div");
    this.currentSlide = this.slides[index];
    this.updateNav();
    d3.select("main").classed("title-slide", this.currentSlide.isTitleSlide);
    this.slideSelection
      .data([this.currentSlide], (d) => `${d.page}`)
      .join(
        (enter) =>
          enter
            .append("div")
            .classed("title-slide", (d) => d.isTitleSlide)
            .html((d) => d.html),
        (update) => update,
        (remove) => remove.call(Presentation.fadeOutSlide)
      )
      .call(Presentation.fadeInSlide);
    this.emit("slideChanged", index);
    d3.select("title").text(this.currentSlide.title);
  }

  static fadeInSlide(slide: d3.Selection<HTMLDivElement, Slide, any, any>) {
    slide
      .selectAll<HTMLDivElement, Slide>("code")
      .nodes()
      .forEach((el) => hljs.highlightBlock(el));

    slide
      .selectAll<HTMLDivElement, Slide>("div.hljs")
      .on("click", function (ev, d) {
        navigator.clipboard.writeText(this.innerText);
      });

    return slide
      .selectAll("div > *")
      .style("opacity", 0)
      .style("transform", "rotate(-30deg)")
      .interrupt()
      .transition()
      .duration(600)
      .ease(d3.easeBackOut)
      .delay((d, i) => 300 + i * 100)
      .style("transform", undefined)
      .style("opacity", undefined);
  }

  static fadeOutSlide(slide: d3.Selection<HTMLDivElement, Slide, any, any>) {
    return slide
      .selectAll("div > *")
      .interrupt()
      .transition()
      .duration(600)
      .ease(d3.easeBackInOut)
      .delay((d, i) => i * 100)
      .style("transform", "translate(40px,-10px)")
      .style("opacity", 0)
      .end()
      .then(() => slide.remove())
      .catch(() => {});
  }

  initControls(): void {
    window.addEventListener("keydown", (ev) => {
      const currentIndex = this.slides.indexOf(this.currentSlide);
      switch (ev.code) {
        case "ArrowLeft":
          this.showSlide(currentIndex - 1);
          break;
        case "ArrowRight":
          this.showSlide(currentIndex + 1);
          break;
        default:
      }
    });
  }

  static htmlToSlides(allHtml: string): Slide[] {
    return allHtml.split("<hr>").map((html, page) => ({
      page,
      isTitleSlide: html.includes("<h1"),
      html: html
        .replace(/<pre>/g, '<div class="hljs">')
        .replace(/<\/pre>/g, "</div>"),
      title: html.match(/<h\d\s(.*?)>(.*?)<\/h\d>/)
        ? html.match(/<h\d\s(.*?)>(.*?)<\/h\d>/)[2]
        : "Presentomatic",
    }));
  }
}
