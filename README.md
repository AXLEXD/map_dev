# B

This is an infinite Pixel Canvas where anyone can draw anything. There is a persistant instance running from the server using MySQL, and the frontend React website communicates to it through a NodeJS backend, hosted on the same server.

Link to the page in action here: [Pixel Canvas](http://devo.esz.us).

**TODO**
- [x] Encapsulate all line draws into a single call that is sent to the server on the update tick
- [x] Add guidelines showing the chunk borders
- [x] Add UI to download image of a range of chunks 
- [x] Add color picker
- [ ] Add stroke radius options
- [ ] Add fill tool
- [ ] Add option to enter a location and teleport the canvas there

