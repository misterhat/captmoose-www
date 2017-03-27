# captmoose-web
mimp (moose image manipulation program) & web frontend. create fun, grid-based
pictures to share with your friends.

*Check him out at [captmoose.club](http://captmoose.club)!*

## setup
*captmoose-web* has been tested with [Debian GNU/Linux](https://debian.org).
[download the ISO for free (~200 MB)](https://www.debian.org/CD/netinst/).

1. install the system dependencies: `sudo apt install sqlite3 npm`

2. install *captmoose-web* with [npm](https://npmjs.org):
`npm install captmoose-web`

3. navigate there: `cd node_modules/captmoose-web`

4. make any desired changes to the configuration:
`sensible-editor moose.json knexfile.js`

5. use `npm run build-dev` to create
[minified](https://en.wikipedia.org/wiki/Minification_%28programming%29) &
[gzip](https://en.wikipedia.org/wiki/Gzip)'d bundles.

6. begin the webserver: `npm start`

## production

1. it's necessary to re-build with `NODE_ENV=production` because it's
[utilized by browserify](https://npmjs.org/package/envify):
`NODE_ENV=production npm run build`

2. ensure [cached](https://en.wikipedia.org/wiki/Web_cache), minified files are
served: `NODE_ENV=production npm start`

*protip!* use [svgo](https://www.npmjs.com/package/svgo) to significantly reduce
the size of any frames or other new [SVG](https://svgontheweb.com/) files.
use [pngcrush](https://packages.debian.org/sid/pngcrush) for PNG files.

## api

* GET `captmoose.club/look/<moose>`: view individual moose.

 * `<moose>.json` serves a JSON object of the painting & meta-data.
 * `<moose>.png` serves a rendered painting.

* GET `captmoose.club/token.json`: grab the
[CSRF token](https://www.owasp.org/index.php/CSRF_Prevention_Cheat_Sheet#Synchronizer_.28CSRF.29_Tokens)
for saving moose. Requires the `X-Requested-With` HTTP header be set to
`XMLHttpRequest`.

## design influence

> But would you call the painter a creator and maker?
> Certainly not.
> Yet if he is not the maker, what is he in relation to the bed?
> I think, he said, that we may fairly designate him as the imitator of that
> which the others make.
>
> \- Plato's [*The Republic (360 B.C.)*](http://classics.mit.edu/Plato/republic.11.x.html)

* [deerkins](https://github.com/worldeggplant/deerkins)
* [lowercase text](https://en.wikipedia.org/wiki/All_caps#Readability)
* [many things](https://archive.fo/0nHN7)
* [oocss](https://github.com/stubbornella/oocss/wiki "object oriented css")
* [progressive enhancement](https://en.wikipedia.org/wiki/Progressive_enhancement)
* [semantic html](https://en.wikipedia.org/wiki/Semantic_HTML)
* [server-sided rendering](http://openmymind.net/2012/5/30/Client-Side-vs-Server-Side-Rendering/)
* [templeos charter](http://www.templeos.org/Wb/Doc/Charter.html)
* [the user is drunk](https://www.youtube.com/watch?v=r2CbbBLVaPk)
* [unix](https://www.youtube.com/watch?v=tc4ROCJYbm0)
* [wabi sabi](http://www.touchingstone.com/Wabi_Sabi.html)
* [yellow submarine (1968)](https://en.wikipedia.org/wiki/Yellow_Submarine_%28film%29)
([magnet](magnet:?xt=urn:btih:9dda9a9bb2ae6230475ce2d18edfc11fb9e45aa3&dn=Yellow+Submarine+%5B1968%5D+720p+BRRip+x264+%5BZeberzee%5D&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fpublic.popcorn-tracker.org%3A6969))

## structure
[KISS](https://en.wikipedia.org/wiki/KISS_principle "keep it simple, stupid!"),
use modules & keep files under ~100 lines.

* `app.js` is the webserver. This hosts all the static assets, as well as
handling the interactions with the database.
* `assets/` contains all of the static assets, including built ones. Edit
`assets/style.css` for any *captmoose-web*-specific CSS.
* `browser.js` is the endpoint which is compiled & served to the browser.
* `knexfile.js` is the
[configuration file for Knex.js](http://knexjs.org/#knexfile). Adjust your SQL
database connection details here.
* `lib/` contains the un-modular, reusable components. Modules should be
preferred over files here if possible.
 * `models/` contains browser-sided
 [choo models](https://github.com/yoshuawuyts/choo#models).
 * `routes/` contains
 [server-sided route definitions](https://www.npmjs.com/package/server-router).
 * `views/` contains reusable
 [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model
 "document object model") components created with
 [hyperscript](https://npmjs.org/package/hyperscript).
* `moose.json` is the default configuration file.
* `moose.sqlite3` is the [SQLite](https://sqlite.org/about.html) database
containing saved moose, pictures, etc.
* `package.json` contains metadata, as well as
[the build scripts](https://archive.fo/GtMOB) (see `npm run build*`).

## [stolen artwork](https://stallman.org/articles/end-war-on-sharing.html "end the war on sharing!")

[canadian fair dealing laws](http://laws-lois.justice.gc.ca/eng/acts/C-42/page-9.html#h-26).
[creative commons: supporting copyright reform](https://creativecommons.org/2013/10/16/supporting-copyright-reform/).

* `assets/`
  * [`artemis.svg`: warszawianka - Openclipart](https://openclipart.org/detail/22152/artemis)
  * [`atlas.svg`: bf5man - Openclipart](https://openclipart.org/detail/203459/atlas-god)
  * [`comic.{ttf,woff,woff2}`: Comic Neue](http://comicneue.com/)
  * [`contra.mp3`: khinsider.com](http://downloads.khinsider.com/game-soundtracks/album/contra-ost-nes-1988-/01-title.mp3) ([Contra (1988)](https://en.wikipedia.org/wiki/Contra_%28video_game%29#Nintendo_Entertainment_System))
  * [`easel.svg`: Inkie30 - Openclipart](https://openclipart.org/detail/232985/painting-canvas)
  * [`eros-pysche.svg`: johnny\_automatic - Openclipart](https://openclipart.org/detail/214034/eros-and-psyche)
  * [`error.gif`: South Park, season 1 episode 8](https://en.wikipedia.org/wiki/Starvin%27_Marvin_%28South_Park%29)
  * [`forest.svg`: dcatcherex - Openclipart](https://openclipart.org/detail/98311/forest-scene)
  * [`hunter.svg`: j4p4n - Openclipart](https://openclipart.org/detail/214386/canadian-hunter)
  * [`move-along.mp3`: Hark](http://www.hark.com/clips/wszpqzwsys-nothing-to-see) ([South Park, season 2 episode 4](https://en.wikipedia.org/wiki/Chickenlover))
  * [`palette.svg`: yahnatan - Openclipart](https://openclipart.org/detail/260232/palette)
  * [`pi.svg`: AdamStanislav - Openclipart](https://openclipart.org/detail/245978/greek-letter-pi)
  * [`sabazius.svg`: kinetoons - Openclipart](https://openclipart.org/detail/254706/the-hand-of-sabazius)
  * [`venus.svg`: andymarrero - Openclipart](https://openclipart.org/detail/241048/venus-de-milo)
  * `missing.png`: [SimpleIcons - Openclipart](https://openclipart.org/detail/213229/moose-icon) & [skotan - OpenClipart](https://openclipart.org/detail/28689/nosign)

## license
Copyright (C) 2017 Mister Hat

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see http://www.gnu.org/licenses/.
