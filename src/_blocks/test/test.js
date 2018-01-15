var circle = new ProgressBar.Circle("#test__timer", {
  strokeWidth: 4,
  trailWidth: 1,
  color: "#111",
  duration: 10000,

  text: {
    autoStyleContainer: false,
    className: "test__timer-text"
  },

  from: {
    color: "rgb(0, 153, 0)",
    width: 1
  },

  to: {
    color: "rgb(255, 51, 0)",
    width: 4
  },

  step: function(state, circle) {
    circle.path.setAttribute('stroke', state.color);
    circle.path.setAttribute('stroke-width', state.width);

    var value = Math.round(circle.value() * 100);

    if (value === 0) {
      circle.setText("");
    } else {
      circle.setText(Math.floor(value/10));
    }

  }
});

circle.animate(1.0);  // Number from 0.0 to 1.0
