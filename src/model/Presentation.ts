import "css-reset-and-normalize";
import "github-markdown-css";
import "highlight.js/scss/night-owl.scss";
import "../styles/presentomatic.scss";
import { EventEmitter } from "events";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
hljs.registerLanguage("javascript", javascript);
import json from "highlight.js/lib/languages/json";
hljs.registerLanguage("json", json);
import asciidoc from "highlight.js/lib/languages/asciidoc";
hljs.registerLanguage("asciidoc", asciidoc);
import bash from "highlight.js/lib/languages/bash";
hljs.registerLanguage("bash", bash);
import css from "highlight.js/lib/languages/css";
hljs.registerLanguage("css", css);
import dart from "highlight.js/lib/languages/dart";
hljs.registerLanguage("dart", dart);
import java from "highlight.js/lib/languages/java";
hljs.registerLanguage("java", java);
import python from "highlight.js/lib/languages/python";
hljs.registerLanguage("python", python);
import ruby from "highlight.js/lib/languages/ruby";
hljs.registerLanguage("ruby", ruby);
import rust from "highlight.js/lib/languages/rust";
hljs.registerLanguage("rust", rust);

import * as d3 from "d3";
import { marked } from "marked";

// @ts-ignore GD SCript support
hljs.registerLanguage("gdscript", function () { "use strict"; var e = e || {}; function r(e) { return { aliases: ["godot", "gdscript"], keywords: { keyword: "and in not or self void as assert breakpoint class class_name extends is func setget signal tool yield const enum export onready static var break continue if elif else for pass return match while remote sync master puppet remotesync mastersync puppetsync", built_in: "Color8 ColorN abs acos asin atan atan2 bytes2var cartesian2polar ceil char clamp convert cos cosh db2linear decimals dectime deg2rad dict2inst ease exp floor fmod fposmod funcref get_stack hash inst2dict instance_from_id inverse_lerp is_equal_approx is_inf is_instance_valid is_nan is_zero_approx len lerp lerp_angle linear2db load log max min move_toward nearest_po2 ord parse_json polar2cartesian posmod pow preload print_stack push_error push_warning rad2deg rand_range rand_seed randf randi randomize range_lerp round seed sign sin sinh smoothstep sqrt step_decimals stepify str str2var tan tanh to_json type_exists typeof validate_json var2bytes var2str weakref wrapf wrapi bool int float String NodePath Vector2 Rect2 Transform2D Vector3 Rect3 Plane Quat Basis Transform Color RID Object NodePath Dictionary Array PoolByteArray PoolIntArray PoolRealArray PoolStringArray PoolVector2Array PoolVector3Array PoolColorArray", literal: "true false null" }, contains: [e.NUMBER_MODE, e.HASH_COMMENT_MODE, { className: "comment", begin: /"""/, end: /"""/ }, e.QUOTE_STRING_MODE, { variants: [{ className: "function", beginKeywords: "func" }, { className: "class", beginKeywords: "class" }], end: /:/, contains: [e.UNDERSCORE_TITLE_MODE] }] } } return e.exports = function (e) { e.registerLanguage("gdscript", r) }, e.exports.definer = r, e.exports.definer || e.exports }());

interface Slide {
  page: number;
  isTitleSlide: boolean;
  title: string;
  html: string;
}

interface View {
  page: number;
  file: string;
}

export default class Presentation extends EventEmitter {
  private slides: Slide[] = [];

  private currentSlide: Slide | undefined;

  private slideSelection: d3.Selection<HTMLDivElement, Slide, any, any> | undefined;

  private scale = d3.scaleLinear()
    .range([0, 1000]);

  constructor(private view: View) {
    super();
    this.init();
  }

  async init() {
    const f = await fetch(this.view.file);
    const md = await f.text();
    const html = marked.parse(md);

    this.slides = Presentation.htmlToSlides(html);
    this.initControls();
    this.showSlide(this.view.page);
    d3.select("nav")
      .on("mouseenter", () => Presentation.fadeInNav())
      .on("mouseleave", () => {
        Presentation.fadeOutNav();
      });
    d3.select("#indicator")
      .attr("d", d3.symbol(d3.symbolTriangle, 60)())
    d3.select("#interactor")
      .on("mousemove", (ev) => {
        const page = ~~this.scale.invert(d3.pointer(ev)[0]);
        const slide = this.slides[page];
        d3.select('nav text')
          .html(slide.title);
        d3.select("nav")
          .selectAll("svg")
          .interrupt("fadeout")
      })
      .on("mouseleave", () => {
        d3.select('nav text')
          .html('');
      })
      .on("click", (ev) => {
        const page = ~~this.scale.invert(d3.pointer(ev)[0]);
        this.showSlide(page);
      });
  }

  updateNav() {
    this.scale.domain([0, this.slides.length]);
    d3.select("#mainslides")
      .selectAll<SVGCircleElement, Slide>("circle")
      .data(this.slides.filter(s => s.isTitleSlide), (d) => `${d.page}_${d.title}`)
      .join("circle")
      .attr("cx", slide => this.scale(slide.page))
      .attr("r", 10);

    d3.select('#indicator')
      .transition()
      .ease(d3.easeBackInOut)
      .duration(1000)
      .attr('transform', `translate(${this.scale(this.currentSlide?.page || 0)},-20)rotate(60)`)

    Presentation.fadeInNav();
    Presentation.fadeOutNav();
  }

  static fadeInNav() {
    d3.select("nav")
      .selectAll("svg")
      .interrupt("fadeout")
      .transition()
      .style("transform", null)
      .style("opacity", 1);
  }

  static fadeOutNav() {
    d3.select("nav")
      .selectAll("svg")
      .interrupt("fadeout")
      .transition("fadeout")
      .delay(3000)
      .style("transform", "scale(0.1,1)")
      .style("opacity", 0);
  }

  showSlide(requestedIndex: number) {
    const index = Math.max(0, Math.min(requestedIndex, this.slides.length - 1));
    this.view.page = requestedIndex;
    location.hash = Presentation.toHash(this.view);
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
      .on("click", (ev) => navigator.clipboard.writeText(ev.target.innerText));

    return slide
      .selectAll("div > *")
      .style("opacity", 0)
      .style("transform", "rotate(-30deg)")
      .interrupt()
      .transition()
      .duration(600)
      .ease(d3.easeBackOut)
      .delay((_, i) => 300 + i * 100)
      .style("transform", null)
      .style("opacity", null);
  }

  static fadeOutSlide(slide: d3.Selection<HTMLDivElement, Slide, any, any>) {
    return slide
      .selectAll("div > *")
      .interrupt()
      .transition()
      .duration(600)
      .ease(d3.easeBackInOut)
      .delay((_, i) => i * 100)
      .style("transform", "translate(40px,-10px)")
      .style("opacity", 0)
      .end()
      .then(() => slide.remove())
      .catch(() => { });
  }

  initControls(): void {
    window.addEventListener("keydown", (ev) => {
      switch (ev.code) {
        case "ArrowLeft":
          if (this.view.page > 0) {
            this.showSlide(this.view.page - 1);
          }
          break;
        case "ArrowRight":
          if (this.view.page < this.slides.length - 1) {
            this.showSlide(this.view.page + 1);
          }
          break;
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
      title: html.match(/<h\d\s*(.*?)>(.*?)<\/h\d>/)
        // @ts-ignore
        ? `[${page + 1}] : ${html.match(/<h\d\s*(.*?)>(.*?)<\/h\d>/)[2]}`
        : `[${page + 1}]`,
    }));
  }

  static toHash(view: View): string {
    // @ts-ignore
    return new URLSearchParams(view).toString();
  }

  static parseHash(): View {
    const p = new URLSearchParams(location.hash.replace('#', ''));
    return {
      file: p.get('file') || 'INDEX.md',
      page: +(p.get('page') || 0)
    };
  }
}
