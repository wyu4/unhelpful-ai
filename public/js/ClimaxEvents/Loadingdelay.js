class ScreenshotBlur {
    constructor(blurAmount = 10) {
      this.overlay = document.getElementById('screenshot-overlay');
      this.img = document.getElementById('screenshot-img');
      this.blurAmount = blurAmount;
    }

    takeScreenshot() {
      html2canvas(document.body, {
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight
      }).then(canvas => {
        this.img.src = canvas.toDataURL();
        this.img.style.filter = `blur(${this.blurAmount}px)`;
        this.overlay.style.display = 'block';
      }).catch(err => console.error("Screenshot failed:", err));
    }

    removeScreenshot() {
      this.overlay.style.display = 'none';
    }
  }
