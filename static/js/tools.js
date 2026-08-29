(function () {
  function toNumber(value, fallback) {
    return Number(value) || fallback;
  }

  function formatTimeFromMinutes(totalMinutes) {
    var totalSeconds = Math.max(0, Math.round(totalMinutes * 60));
    var hours = Math.floor(totalSeconds / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    var seconds = totalSeconds % 60;
    var mm = String(minutes).padStart(2, "0");
    var ss = String(seconds).padStart(2, "0");
    if (hours === 0) {
      return mm + ":" + ss;
    }
    return String(hours).padStart(2, "0") + ":" + mm + ":" + ss;
  }

  function formatSigned(value) {
    return value > 0 ? "+" + value : String(value);
  }

  function formatMl(value) {
    return Number.isInteger(value) ? String(value) : value.toFixed(1);
  }

  function initFilmCalc() {
    var root = document.getElementById("filmcalc-tool");
    if (!root) return;

    var minutesInput = document.getElementById("film-time-minutes");
    var secondsInput = document.getElementById("film-time-seconds");
    var initialTempInput = document.getElementById("film-temp-initial");
    var targetTempInput = document.getElementById("film-temp-target");
    var constantInput = document.getElementById("film-constant-agitation");
    var pushPullInput = document.getElementById("film-pushpull");
    var pushPullValue = document.getElementById("film-pushpull-value");
    var resultTime = document.getElementById("film-result-time");
    var resultTempDelta = document.getElementById("film-result-tempdelta");
    var resultPushPull = document.getElementById("film-result-pushpull");
    var resultAgitation = document.getElementById("film-result-agitation");

    function recalc() {
      var initialMinutes = Math.max(0, toNumber(minutesInput.value, 0));
      var initialSeconds = Math.max(0, toNumber(secondsInput.value, 0));
      var initialTemp = toNumber(initialTempInput.value, 20);
      var targetTemp = toNumber(targetTempInput.value, 20);
      var pushPull = Math.round(toNumber(pushPullInput.value, 0));
      var constantAgitation = !!constantInput.checked;

      var baseTimeSeconds = initialMinutes * 60 + initialSeconds;
      var tempDiff = initialTemp - targetTemp;
      var tempFactor = Math.pow(1.1, tempDiff);
      var pushPullFactor = Math.pow(1.5, pushPull);
      var agitationFactor = constantAgitation ? 0.9 : 1.0;
      var finalTimeSeconds =
        baseTimeSeconds * tempFactor * pushPullFactor * agitationFactor;

      pushPullValue.textContent = formatSigned(pushPull);
      resultTime.textContent = formatTimeFromMinutes(finalTimeSeconds / 60);
      resultTempDelta.innerHTML =
        "<strong>" + (initialTemp - targetTemp).toFixed(1) + "°C</strong>";
      resultPushPull.innerHTML =
        "<strong>" + formatSigned(pushPull) + "</strong>";
      resultAgitation.innerHTML =
        "<strong>" + (constantAgitation ? "Cont" : "Std") + "</strong>";
    }

    [
      minutesInput,
      secondsInput,
      initialTempInput,
      targetTempInput,
      pushPullInput,
      constantInput,
    ].forEach(function (el) {
      el.addEventListener("input", recalc);
      el.addEventListener("change", recalc);
    });

    recalc();
  }

  function initDilution() {
    var root = document.getElementById("dilution-tool");
    if (!root) return;

    var totalVolumeInput = document.getElementById("dilution-total-volume");
    var partAInput = document.getElementById("dilution-part-a");
    var partBInput = document.getElementById("dilution-part-b");
    var resultA = document.getElementById("dilution-result-a");
    var resultB = document.getElementById("dilution-result-b");
    var params = new URLSearchParams(window.location.search);

    if (params.has("volume"))
      totalVolumeInput.value = String(toNumber(params.get("volume"), 300));
    if (params.has("a"))
      partAInput.value = String(toNumber(params.get("a"), 1));
    if (params.has("b"))
      partBInput.value = String(toNumber(params.get("b"), 9));

    function recalc() {
      var totalVolume = Math.max(0, toNumber(totalVolumeInput.value, 0));
      var partA = Math.max(0, toNumber(partAInput.value, 0));
      var partB = Math.max(0, toNumber(partBInput.value, 0));
      var totalParts = partA + partB;
      var volumeA = 0;
      var volumeB = 0;

      if (totalParts > 0) {
        var onePart = totalVolume / totalParts;
        volumeA = onePart * partA;
        volumeB = onePart * partB;
      }

      resultA.textContent = formatMl(volumeA) + "ml";
      resultB.textContent = formatMl(volumeB) + "ml";
    }

    [totalVolumeInput, partAInput, partBInput].forEach(function (el) {
      el.addEventListener("input", recalc);
      el.addEventListener("change", recalc);
    });

    recalc();
  }

  function initPrintLayout() {
    var root = document.getElementById("print-layout-tool");
    if (!root) return;

    var paperSizes = {
      A4: { width: 210, height: 297 },
      A3: { width: 297, height: 420 },
      "US Letter": { width: 215.9, height: 279.4 },
      "US Legal": { width: 215.9, height: 355.6 },
      Custom: { width: 210, height: 297 },
    };

    var targetSizeSelect = document.getElementById("pl-target-size");
    var targetCustomWrap = document.getElementById("pl-target-custom");
    var targetCustomWidth = document.getElementById("pl-target-custom-width");
    var targetCustomHeight = document.getElementById("pl-target-custom-height");
    var targetPortraitBtn = document.getElementById("pl-target-portrait");
    var targetLandscapeBtn = document.getElementById("pl-target-landscape");

    var printWidthInput = document.getElementById("pl-print-width");
    var printHeightInput = document.getElementById("pl-print-height");
    var printUnitSelect = document.getElementById("pl-print-unit");
    var printPortraitBtn = document.getElementById("pl-print-portrait");
    var printLandscapeBtn = document.getElementById("pl-print-landscape");

    var ratioWidthInput = document.getElementById("pl-ratio-width");
    var ratioHeightInput = document.getElementById("pl-ratio-height");
    var marginInput = document.getElementById("pl-margin");
    var exportBtn = document.getElementById("pl-export-pdf");

    var warningBox = document.getElementById("pl-warning-box");
    var statTarget = document.getElementById("pl-stat-target");
    var statPaper = document.getElementById("pl-stat-paper");
    var statImage = document.getElementById("pl-stat-image");
    var statMargin = document.getElementById("pl-stat-margin");
    var canvas = document.getElementById("print-layout-canvas");
    var wrapper = canvas.parentElement;

    var state = {
      targetOrientation: "portrait",
      printOrientation: "portrait",
    };

    function convertToMm(value, unit) {
      if (unit === "cm") return value * 10;
      if (unit === "in") return value * 25.4;
      return value;
    }

    function setActive(buttonA, buttonB, orientation, selected) {
      buttonA.classList.toggle("active", orientation === selected);
      buttonB.classList.toggle("active", orientation !== selected);
    }

    function calculateLayout() {
      var targetSize = targetSizeSelect.value;
      var customTarget = {
        width: Math.max(1, toNumber(targetCustomWidth.value, 210)),
        height: Math.max(1, toNumber(targetCustomHeight.value, 297)),
      };
      var target =
        targetSize === "Custom" ? customTarget : paperSizes[targetSize];
      var tW = target.width;
      var tH = target.height;

      if (state.targetOrientation === "landscape") {
        var landscapeMax = Math.max(tW, tH);
        var landscapeMin = Math.min(tW, tH);
        tW = landscapeMax;
        tH = landscapeMin;
      } else {
        var portraitMin = Math.min(tW, tH);
        var portraitMax = Math.max(tW, tH);
        tW = portraitMin;
        tH = portraitMax;
      }

      var pW = convertToMm(
        Math.max(1, toNumber(printWidthInput.value, 178)),
        printUnitSelect.value,
      );
      var pH = convertToMm(
        Math.max(1, toNumber(printHeightInput.value, 240)),
        printUnitSelect.value,
      );
      if (state.printOrientation === "landscape") {
        var pMax = Math.max(pW, pH);
        var pMin = Math.min(pW, pH);
        pW = pMax;
        pH = pMin;
      } else {
        var ppMin = Math.min(pW, pH);
        var ppMax = Math.max(pW, pH);
        pW = ppMin;
        pH = ppMax;
      }

      var margin = Math.max(0, toNumber(marginInput.value, 10));
      var printableW = Math.max(0, pW - margin * 2);
      var printableH = Math.max(0, pH - margin * 2);
      var ratioW = Math.max(0.1, toNumber(ratioWidthInput.value, 3));
      var ratioH = Math.max(0.1, toNumber(ratioHeightInput.value, 2));
      var ratio = ratioW / ratioH;
      var imgW = 0;
      var imgH = 0;

      if (printableW > 0 && printableH > 0) {
        if (printableW / printableH > ratio) {
          imgH = printableH;
          imgW = printableH * ratio;
        } else {
          imgW = printableW;
          imgH = printableW / ratio;
        }
      }

      var pX = (tW - pW) / 2;
      var pY = (tH - pH) / 2;
      var imgX = pX + (pW - imgW) / 2;
      var imgY = pY + (pH - imgH) / 2;

      var warnings = [];
      if (pW > tW || pH > tH)
        warnings.push("Photo paper is larger than output sheet.");
      if (printableW <= 0 || printableH <= 0)
        warnings.push("Margin is too large for the photo paper.");

      return {
        targetSize: targetSize,
        tW: tW,
        tH: tH,
        pW: pW,
        pH: pH,
        pX: pX,
        pY: pY,
        imgW: imgW,
        imgH: imgH,
        imgX: imgX,
        imgY: imgY,
        warnings: warnings,
      };
    }

    function draw(layout) {
      var rect = wrapper.getBoundingClientRect();
      var ctx = canvas.getContext("2d");
      var dpr = window.devicePixelRatio || 1;

      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, rect.width, rect.height);

      var padding = 40;
      var scale = Math.min(
        (rect.width - padding) / layout.tW,
        (rect.height - padding) / layout.tH,
      );
      var offsetX = (rect.width - layout.tW * scale) / 2;
      var offsetY = (rect.height - layout.tH * scale) / 2;

      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.fillRect(offsetX, offsetY, layout.tW * scale, layout.tH * scale);
      ctx.strokeStyle = "#999";
      ctx.lineWidth = 1;
      ctx.strokeRect(offsetX, offsetY, layout.tW * scale, layout.tH * scale);

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2;
      ctx.strokeRect(
        offsetX + layout.pX * scale,
        offsetY + layout.pY * scale,
        layout.pW * scale,
        layout.pH * scale,
      );

      if (layout.imgW > 0 && layout.imgH > 0) {
        ctx.setLineDash([6, 4]);
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = "#2563eb";
        ctx.strokeRect(
          offsetX + layout.imgX * scale,
          offsetY + layout.imgY * scale,
          layout.imgW * scale,
          layout.imgH * scale,
        );
        ctx.setLineDash([]);
      }

      ctx.strokeStyle = "rgba(197,91,76,0.6)";
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(offsetX, offsetY + (layout.tH * scale) / 2);
      ctx.lineTo(
        offsetX + layout.tW * scale,
        offsetY + (layout.tH * scale) / 2,
      );
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(offsetX + (layout.tW * scale) / 2, offsetY);
      ctx.lineTo(
        offsetX + (layout.tW * scale) / 2,
        offsetY + layout.tH * scale,
      );
      ctx.stroke();
    }

    function renderWarnings(layout) {
      if (layout.warnings.length === 0) {
        warningBox.innerHTML = "";
        return;
      }
      warningBox.innerHTML = layout.warnings
        .map(function (warning) {
          return '<div class="tool-warning">' + warning + "</div>";
        })
        .join("");
    }

    function renderStats(layout) {
      statTarget.textContent =
        layout.tW.toFixed(1) + "x" + layout.tH.toFixed(1) + "mm";
      statPaper.textContent =
        layout.pW.toFixed(1) + "x" + layout.pH.toFixed(1) + "mm";
      statImage.textContent =
        layout.imgW.toFixed(1) + "x" + layout.imgH.toFixed(1) + "mm";
      statMargin.textContent =
        ((layout.pW - layout.imgW) / 2).toFixed(1) + "mm";
    }

    function update() {
      targetCustomWrap.style.display =
        targetSizeSelect.value === "Custom" ? "grid" : "none";
      setActive(
        targetPortraitBtn,
        targetLandscapeBtn,
        state.targetOrientation,
        "portrait",
      );
      setActive(
        printPortraitBtn,
        printLandscapeBtn,
        state.printOrientation,
        "portrait",
      );
      var layout = calculateLayout();
      renderWarnings(layout);
      renderStats(layout);
      draw(layout);
      return layout;
    }

    targetPortraitBtn.addEventListener("click", function () {
      state.targetOrientation = "portrait";
      update();
    });
    targetLandscapeBtn.addEventListener("click", function () {
      state.targetOrientation = "landscape";
      update();
    });
    printPortraitBtn.addEventListener("click", function () {
      state.printOrientation = "portrait";
      update();
    });
    printLandscapeBtn.addEventListener("click", function () {
      state.printOrientation = "landscape";
      update();
    });

    [
      targetSizeSelect,
      targetCustomWidth,
      targetCustomHeight,
      printWidthInput,
      printHeightInput,
      printUnitSelect,
      ratioWidthInput,
      ratioHeightInput,
      marginInput,
    ].forEach(function (el) {
      el.addEventListener("input", update);
      el.addEventListener("change", update);
    });

    function loadJsPdf() {
      if (window.jspdf?.jsPDF) return Promise.resolve(window.jspdf.jsPDF);
      return new Promise(function (resolve, reject) {
        var script = document.createElement("script");
        script.src =
          "https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js";
        script.onload = function () {
          window.jspdf?.jsPDF
            ? resolve(window.jspdf.jsPDF)
            : reject(new Error("jsPDF unavailable"));
        };
        script.onerror = function () {
          reject(new Error("Failed to load jsPDF"));
        };
        document.head.appendChild(script);
      });
    }

    exportBtn.addEventListener("click", function () {
      var layout = update();
      loadJsPdf()
        .then(function (jsPDF) {
          var format = layout.targetSize;
          if (format === "US Letter") format = "letter";
          if (format === "US Legal") format = "legal";
          if (format === "A4" || format === "A3") format = format.toLowerCase();

          var doc = new jsPDF({
            orientation: state.targetOrientation,
            unit: "mm",
            format:
              layout.targetSize === "Custom" ? [layout.tW, layout.tH] : format,
          });

          doc.setDrawColor(0, 0, 0);
          doc.setLineWidth(0.2);
          doc.rect(layout.pX, layout.pY, layout.pW, layout.pH);
          doc.setDrawColor(37, 99, 235);
          doc.setLineDashPattern([2, 2], 0);
          doc.rect(layout.imgX, layout.imgY, layout.imgW, layout.imgH);
          doc.setLineDashPattern([], 0);
          doc.setDrawColor(197, 91, 76);
          doc.setLineWidth(0.1);
          doc.line(0, layout.tH / 2, layout.tW, layout.tH / 2);
          doc.line(layout.tW / 2, 0, layout.tW / 2, layout.tH);
          doc.save("darkroom-print-layout.pdf");
        })
        .catch(function (error) {
          warningBox.innerHTML =
            '<div class="tool-warning">' + error.message + "</div>";
        });
    });

    window.addEventListener("resize", update);
    update();
  }

  document.addEventListener("DOMContentLoaded", function () {
    initFilmCalc();
    initDilution();
    initPrintLayout();
  });
})();
