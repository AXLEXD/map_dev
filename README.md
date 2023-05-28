# Pixel Canvas

<p>
This is an infinite Pixel Canvas where anyone can draw anything. There is a persistant instance running from the server using MySQL, and the frontend React website communicates to it through a NodeJS backend, hosted on the same server.

Link to the page in action here: [Pixel Canvas](https://pixel-canvas.github.io/).
</p>
<img style="position:absolute;" src="https://github.com/bogger12/map_dev/blob/07ed87d8f5d11b17ab78ac964e44693eab344cb8/example.png"></img>

---
**TODO**
- [x] Encapsulate all line draws into a single call that is sent to the server on the update tick
- [x] Add guidelines showing the chunk borders
- [x] Add UI to download image of a range of chunks 
- [x] Add color picker
- [ ] Add stroke radius options
- [ ] Add fill tool
- [ ] Add option to enter a location and teleport the canvas there

