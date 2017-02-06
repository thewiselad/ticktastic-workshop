# About

This is a simple project we'll be working through on a workshop, and then iterating changes into through ongoing assignments. It will be a very basic support ticketing system.

## Commit One - Fundamentals of HTML

Going from bare files to actually seeing something in the browser.

* What does HTML need.
  * Doctype
  * head
    * title
    * meta viewport and charset tags<sup>[1](#f1)</sup>
  * body
* Why is this important? (The browser does work without it, but you suffer from a lot of 'undefined behaviour' quirks.)

## Commit Two - Lightspeed introduction to nodejs

Workshop covers a few topics here whilst getting the worlds simplest server up and running:

 * Why is a webserver important?
 * Why nodejs
 * What is npm
 * Basic anatomy of a shell command (binary, arguments, switches)
 * The basics of ports, DNS and request routing (using hosts file, port 80, port 3000)
 * Can students access a site on my laptop? (They can on my home wifi, may depend on the hotel router policies.)
 * Why running a local server is the bad news.

We run these commands:

    npm install --save express minimist;
    node server.js;
    node server.js -p4000;
    sudo node server.js -p80;

## Commit Three - HTML markup

We look at how to plan your markup tags and structure and what to consider as you do so.

 * Start with a pen.
 * Planning markup
   * Consider screenreaders.
   * Consider progressive enhancement (though not in this app!)
   * Consider economic discrepencies
   * Consider semantics
   * Consider SEO
 * Making it happen.
   * Consistency in markup / code layout (developer ergonomics)
   * Tabs vs spaces, why you're wrong. And why it doesn't matter. But also does. As does everything else.
   * Input types and what they improve / break (tel / email etc)
   * What is a placeholder and why everyone is an idiot.


## Commit 4 - Styling the markup with CSS

We now look at prettifying up the HTML structure using the wizadry of CSS.

 * Planning your styling
   * Consider color blindness / partial sight
   * Consider "Trust in design" and the Aesthetic-Usability Effect. Design = important.
   * Counter to this, consider performance. Fast = important.
   * Balance these. I dare you.
   * Other common affordances - abbreviation / explicitness. Consider audience.
 * Making it happen - implementing a design
   * CSS formatting, source control and Cmd/Ctrl-F.
   * Browsers - Ugh. Use a reset. (Eric Meyer / HTML5 BP) Even better - use HTML5 BP or similar.
   * Why id's are the devil and element-based styles are worse. (Unless they're not.)
   * Grids - they're pretty good. (But we won't use one)
    * padding wrappers vs box-sizing: border-box
    * The necessary evil of negative margins.
   * BEM / OOCSS
   * Page title - em sizing vs px
   * Form styling
     * box model
     * Block vs inline
   * Form title
     * Absolute / relative position
     * nudging stuff about in the inspector. It's not cheating, but it feels like it is.
   * List stylez
    * The DOM tree - and why I've avoided it until now. (Arms-race specificity. Code drift on large projects)


## Commit 5 - Making this dynamic with Javascript

  * Goal: capture form requests, store locally.
  * Where to look for help
    * Stack overflow
    * MDN
    * Me.
  * Welcome back to npm - let's use jquery (The ONE concession to the MS syllabus!)
  * discuss the bits copied from HTML5 BP - inc SRI on jquery CDN. (Why CDN at all?) (https://www.srihash.org/)
  * (alert something and link in JS)
  * Why not async?
  * Scoping and global variables.
  * jQuery vs DOMMethods - CSS selectors / bind events.
  * anon functions vs named functions. (debugging / readability)
  * HTML5 validation and browser fallbacks (we're not doing them).
  * Variable hoisting
  * FormData and why we're not using it.
  * Subtle differences, jquery / ES6 (each / forEach key, value transposition)


## Footnotes

<sup name="f1" id="f1">1</sup> Not technically required by the html spec, as the others are, but very important in the same way.
